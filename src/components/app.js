import { h, Component } from 'preact';
const ISOBoxer = require('codem-isoboxer');
import { prft } from '../components/additionalBoxes';
import { schema_ext } from '../components/additionalwebM';
const ebml = require('ebml');

import Header from './header';
import Home from './home';
import Video from './video';

const modes = {
	webm: 'mp4',
	mp4: 'MP2T',
	MP2T: 'webm'
}

const niceError = {
	3: 'This video appears to be encrypted',
	4: 'Can\'t parse metadata. Is this not an initialization segment?'

}

const parseISO = buf => new Promise((resolve, reject) => {
	const VALID_START_BOX = new Set([
		'ftyp',
		'moof',
		'styp',
		'sidx'
	]);
	const parsedData = ISOBoxer.parseBuffer(buf.buffer);
	console.log(parsedData);
	if (VALID_START_BOX.has(parsedData.boxes[0].type)) return resolve(parsedData);
	return reject(new Error('not an ISOBMFF file'));
});

const parseWebM = buf => new Promise((resolve, reject) => {
	const decoder = new ebml.Decoder(schema_ext, {});
	let lastChunkTime;
	let allData = [];

	// poll in case the stream never sends a 'finish' or 'end' event.
	const MAX_TIME = 1000;
	const pollTime = setInterval(() => {
		const currentTime = (new Date()).getTime();
		lastChunkTime = lastChunkTime || currentTime;
		if (allData.length && (currentTime - lastChunkTime) > MAX_TIME) {
			clearInterval(pollTime);
			// keep master result of parsed boxes
			let resultVal = new Map();
			// keep a list of parents up the tree
			let parentList = [];
			// handy helper to recursively work the way down the resultSet tree. Use 'start' as a hash since it's unique
			const setBox = newVal => parentList.reduce((boxList, entry) => boxList.get(entry).boxes, resultVal).set(newVal.start, newVal);
			// iterate through the boxes to create a box object like ISO box
			allData.map(box => {
				if (box.dataType === 'start') {
					const newEntry = { name: box.payload.name, start: box.payload.start, boxes: new Map() };
					// root level entries
					if (parentList.length === 0) {
						resultVal.set(newEntry.start, { ...newEntry });
					} else {
						setBox(newEntry);
					};
					parentList.push(box.payload.start);
				}
				if (box.dataType === 'tag') setBox({ ...box.payload });
				if (box.dataType === 'end') parentList.pop();
			});
			// now recursively convert all maps into arrays of objects
			const convertBox = boxMap => Array.from(boxMap).reduce((result, contents) => {
				if (Object.hasOwnProperty.call(contents[1], 'boxes')) contents[1].boxes = convertBox(contents[1].boxes);
				return result.concat(contents[1]);
			}, []);
			return resolve({ boxes: convertBox(resultVal) });
		}
	}, 500);
	decoder.on('data', chunk => {
		allData.push({ dataType: chunk[0], payload: chunk[1] });
		lastChunkTime = (new Date()).getTime();
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
			mode: 'webm',
			working: false,
			errorMessage: '',
			videoError:'',
			decodeAttempts: 0,
			showHex: false,
			showVideo: false
		}
	}

	componentWillMount = () => {
		// add any custom box processors
		ISOBoxer.addBoxProcessor(prft.field, prft._parser);
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
		this.setState({ working: true, showVideo: false, videoError:'' });
		this.createParsed(this.state.inputData)
			.then(parsedData => {
				this.setState({ parsedData, working: false, decodeAttempts: 0 });
				return;
			})
			.catch(err => {
				this.setState({ errorMessage: err, working: false });
				if (this.state.decodeAttempts < Object.keys(modes).length) {
					let { decodeAttempts, mode } = this.state;
					decodeAttempts += 1;
					mode = modes[mode];
					console.log(`failed decode #${decodeAttempts}, trying ${mode} mode`);
					this.setState({ decodeAttempts, mode, working: true });
					this.parseFile();
				}
				console.error(err);
			})
	}

	handleEncrypted = e => {
		console.log('got encrypted event', e.target && e.target.error);
		e.preventDefault();
		const videoError = niceError[e.target && e.target.error && e.target.error.code] || 'unknown error';
		this.setState({ showVideo: false, videoError });
	}

	handleFiles = e => {
		this.setState({ working: true, showVideo: false, inputData: '' });
		const file = e.target.files[0];
		const reader = new FileReader();
		const self = this;
		reader.onload = r => {
			const inputData = r.target.result.split(/base64,/)[1];
			self.setState({ inputData });
			self.parseFile();
		}
		reader.readAsDataURL(file);
	}

	toggleHex = e => {
		this.setState({ showHex: !this.state.showHex });
	}

	togglePreview = e => {
		this.setState({ showVideo: !this.state.showVideo })
	}

	render() {
		return (
			<div id="app">
				<Header
					mode={this.state.mode}
					togglePreview={this.togglePreview}
					showVideo={this.state.showVideo}
				/>
				{this.state.showVideo ?
					<Video
						mimeType={this.state.mode}
						data={this.state.inputData}
						handleEncrypted={this.handleEncrypted}
					/> : <div style={{ padding: '56px 20px' }}>{this.state.videoError}</div>}
				<Home
					decodeMode={this.state.mode}
					working={this.state.working}
					parseFile={this.parseFile}
					updateInput={this.updateInput}
					inputData={this.state.inputData}
					parsedData={this.state.parsedData}
					handleFiles={this.handleFiles}
					error={this.state.errorMessage}
					showHex={this.state.showHex}
					toggleHex={this.toggleHex}
				/>
			</div>
		);
	}
}
