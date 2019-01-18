import { h, Component } from 'preact';
const ISOBoxer = require('codem-isoboxer');
import { additionalBoxes, getISOData } from '../components/additionalBoxes';
import { schema_ext, getWebMData } from '../components/additionalwebM';
import { convertToHex } from '../components/tools';
const ebml = require('ebml');

import Header from './header';
import Home from './home';
import Video from './video';
import { EventEmitter } from 'events';

const styles = {
	parseButton: {
		width: '5em',
		margin: '5px',
		height: '3em',
		padding: '0',
		color: 'whitesmoke',
		fontSize: 'large',
		background: '#673ab7',
		boxShadow: '0 0 5px rgba(0, 0, 0, .5)',
		zIndex: '50',
		border: 'none'
	},
	inputArea: {
		display: 'grid',
		gridTemplateColumns: '6fr 1fr 20fr',
		gridTemplateRows: '2fr 1fr',
		marginTop: '65px'
	}
}

const modes = {
	webm: 'mp4',
	mp4: 'MP2T',
	MP2T: 'webm'
}

const niceError = {
	3: 'This video appears to be encrypted',
	4: 'Can\'t parse metadata. Is this not an initialization segment?'

}

let rawVals = new Map();

const mappedKey = (oldKey, box) => {
	switch (oldKey) {
		case '_offset': return { newKey: 'start', value: box[oldKey] };
		case 'size': return { newKey: 'end', value: box._offset + box.size };
		default: return { newKey: oldKey, value: box[oldKey] };
	}
}


// helper to recursively convert all maps into arrays of objects
const convertBox = (boxes, keyFilter = false) => {

	const HIDE_KEYS = new Set(['type', 'start', 'end', 'data', '_offset', '_data', 'size']);

	// boxes is a map -> webM mode
	if (boxes.toString().includes('Map')) return Array.from(boxes).reduce((result, [key, entry]) => {
		if (Object.hasOwnProperty.call(entry, 'boxes')) entry.boxes = convertBox(entry.boxes);
		return result.concat(entry);
	}, []);

	// it isn't a map, must be a nested array of objects
	return boxes.reduce((result, box) => {
		const keys = Object.keys(box).filter(key => !/^_/i.test(key) || key === '_offset');
		if (box._raw) rawVals.set(box._offset, new Uint8Array(box._raw.buffer, box._offset, Math.min(box.size, box._raw.buffer.byteLength - box._raw.buffer.byteOffset - 1)));
		return result.concat(
			keys.reduce((newBox, key) => {
				if (key === 'boxes' || key === 'entries') {
					newBox[key] = convertBox(box[key]);
				} else {
					const { newKey, value } = mappedKey(key, box);
					newBox[newKey] = getISOData(key, value, box.data);
					if (!HIDE_KEYS.has(newKey)) newBox.keys.push(newKey);
				}
				return newBox;
			}, { keys: [] })
		);
	}, []);
}

const parseISO = buf => new Promise(async (resolve, reject) => {
	const VALID_START_BOX = new Set([
		'ftyp',
		'moof',
		'styp',
		'sidx'
	]);
	// get the boxes
	const parsedData = await ISOBoxer.parseBuffer(buf.buffer);
	// process the boxes
	const result = convertBox(parsedData.boxes);
	if (VALID_START_BOX.has(parsedData.boxes[0].type)) return resolve({ parsedData: { boxes: result }, rawVals });
	return reject(new Error('not an ISOBMFF file'));
});

const parseWebM = buf => new Promise((resolve, reject) => {
	const decoder = new ebml.Decoder(schema_ext, {});
	let lastInterval = 0;
	let allData = [];
	let currentTime = (new Date()).getTime();
	let lastChunkTime = currentTime;

	// poll in case the stream never sends a 'finish' or 'end' event.
	const MAX_TIME = 10;
	const pollTime = setInterval(() => {
		currentTime = (new Date()).getTime();
		lastInterval = lastChunkTime - currentTime;
		if (allData.length && (lastInterval) < MAX_TIME) {
			console.log(allData);
			console.log(buf.length - allData[allData.length - 1].payload.end);
			clearInterval(pollTime);
			// keep master result of parsed boxes
			let resultVal = new Map();

			// keep a list of parents up the tree
			let parentList = [];
			// handy helper to recursively work the way down the resultSet tree. Use 'start' as a hash since it's unique
			const setBox = newVal => {
				// each 'boxes' is a Map. temp has the lowest level 'boxes'
				const temp = parentList.reduce((boxList, entry) => boxList.get(entry).boxes, resultVal)
				temp.set(newVal.start, newVal);
			};
			// iterate through the boxes to create a box object like ISO box
			allData.map(box => {
				if (box.dataType === 'start') {
					// start tag. Create an entry for this which includes a 'boxes' property
					const newEntry = {
						name: box.payload.name,
						start: box.payload.start,
						boxes: new Map()
					};
					rawVals.set(box.payload.start, convertToHex(buf.subarray(box.payload.start, box.payload.end)))
					// root level entries mean there are no parents
					if (parentList.length === 0) {
						// no parents, so add to the result map using the start as a hash
						resultVal.set(newEntry.start, { ...newEntry });
					} else {
						// if there is at least one parent, use the helper to enter it at the right level.
						setBox(newEntry);
					};
					// add to the parentlist array to keep track of where we are in the hierarchy
					parentList.push(box.payload.start);
				}
				if (box.dataType === 'tag') {
					const { display, hex } = getWebMData(box.payload);
					const payload = { ...box.payload, display, hex };
					setBox(payload);
				};
				if (box.dataType === 'end') parentList.pop();
			});
			// now use convertBox to recursively process all 'boxes' entries
			return resolve({ parsedData: { boxes: convertBox(resultVal) }, rawVals });
		}
		return reject('timeout')
	}, MAX_TIME / 2);
	decoder.on('data', chunk => {
		allData.push({ dataType: chunk[0], payload: chunk[1] });
		lastChunkTime = (new Date()).getTime();
		lastInterval = lastChunkTime - currentTime;
		currentTime = lastChunkTime;
	});
	decoder.on('finish', () => {
		console.log('got finish event');
		return resolve(allData);
	})
	decoder.on('end', () => {
		console.log('got end event');
		return resolve(allData);
	})
	decoder.on('error', err => reject(err));
	decoder.write(buf);
});

//placeholder for now
const parseM2TS = buf => new Promise((resolve, reject) => {
	return reject(new Error('m2ts mode not supported'));
});

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputData: '',
			parsedData: { boxes: [] },
			mode: 'mp4',
			working: false,
			errorMessage: '',
			videoError: '',
			decodeAttempts: 0,
			showHex: false,
			showVideo: false,
			hasFocus: -1,
			showRaw: -1,
			rawVals: new Map(),
			fileName: 'raw base64 data'
		}
	}

	componentWillMount = () => {
		// add any custom box processors
		additionalBoxes.map(box => {
			if (Object.hasOwnProperty.call(box, '_parser')) ISOBoxer.addBoxProcessor(box.field, box._parser)
		});
	}

	createParsed = inputData => {
		const inputBuffer = Uint8Array.from(atob(inputData), c => c.charCodeAt(0));
		if (this.state.mode === 'webm') return parseWebM(inputBuffer);
		if (this.state.mode === 'mp4') return parseISO(inputBuffer);
		if (this.state.mode === 'MP2T') return parseM2TS(inputBuffer);
	}

	updateInput = e => {
		console.log(`updating inbox box with new value: ${e.target.value}`);
		const inputData = e.target.value;
		this.setState({ inputData });
	}

	parseFile = e => {
		console.log(`parsing data in ${this.state.mode} mode:`);
		this.setState({ working: true, showVideo: false, videoError: '' });
		this.createParsed(this.state.inputData)
			.then(({ parsedData, rawVals }) => {
				console.log(parsedData);
				this.setState({ parsedData, rawVals, working: false, decodeAttempts: 0 });
				return;
			})
			.catch(err => {
				console.error(err);
				this.setState({ errorMessage: err, working: false });
				if (this.state.decodeAttempts < Object.keys(modes).length) {
					let { decodeAttempts, mode } = this.state;
					decodeAttempts += 1;
					mode = modes[mode];
					console.log(`failed decode #${decodeAttempts}, trying ${mode} mode`);
					this.setState({ decodeAttempts, mode, working: true });
					this.parseFile();
				}
			})
	}

	handleEncrypted = e => {
		console.log('got encrypted event', e.target && e.target.error);
		e.preventDefault();
		const videoError = niceError[e.target && e.target.error && e.target.error.code] || 'unknown error';
		this.setState({ showVideo: false, videoError });
	}

	handleFiles = e => {
		const fileName = e.target.files[0];
		this.setState({ working: true, showVideo: false, inputData: '', fileName });
		const reader = new FileReader();
		const self = this;
		reader.onload = r => {
			const inputData = r.target.result.split(/base64,/)[1];
			self.setState({ inputData });
			self.parseFile();
		}
		reader.readAsDataURL(fileName);
	}

	toggleHex = e => {
		this.setState({ showHex: !this.state.showHex });
	}

	toggleRaw = (e, boxID) => {
		this.setState({ showRaw: this.state.showRaw === boxID ? -1 : boxID });
	}

	togglePreview = e => {
		this.setState({ showVideo: !this.state.showVideo })
	}

	handleFocus = (e, focusRow, showOffset) => {
		console.log(`got mouse${showOffset ? 'Enter' : 'Leave'} event for row ${focusRow}`);
		this.setState({ hasFocus: showOffset ? focusRow : -1 })
	}

	render() {
		return (
			<div id="app">
				<Header
					mode={this.state.mode}
					togglePreview={this.togglePreview}
					showVideo={this.state.showVideo}
					showHex={this.state.showHex}
					hexCode={this.state.hexCode}
					toggleHex={this.toggleHex}
					handleFiles={this.handleFiles}
				/>
				{this.state.showHex ? (
					<div style={styles.inputArea}>
						<div style={{ gridRow: '1/3' }}>
							<textarea style={{ height: '90%', width: '95%', margin: '10px' }} onChange={e => this.updateInput(e)} value={this.state.inputData} />
						</div>
						<div style={{ gridRow: '2/3' }}>
							<button style={styles.parseButton} onClick={e => this.parseFile(e)}>Go</button>
						</div>
					</div>) : <div />
				}
				<div>
					{this.state.showVideo ?
						<Video
							mimeType={this.state.mode}
							data={this.state.inputData}
							handleEncrypted={this.handleEncrypted}
						/> : <div style={{ padding: this.state.showHex ? '10px 10px' : '56px 10px' }}>{this.state.videoError}</div>}
					<Home
						fileName={this.state.fileName}
						decodeMode={this.state.mode}
						working={this.state.working}
						parsedData={this.state.parsedData}
						handleFocus={this.handleFocus}
						error={this.state.errorMessage}
						showRaw={this.state.showRaw}
						toggleRaw={this.toggleRaw}
						hasFocus={this.state.hasFocus}
						rawVals={this.state.rawVals}
					/>
				</div>
			</div >
		);
	}
}
