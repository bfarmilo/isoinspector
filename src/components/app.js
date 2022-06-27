import { h, Component } from 'preact';
import { parseBuffer, addBoxProcessor } from '../iso_boxer_mod';
import { ebmlBoxer } from './ebmlBoxer';
import { additionalBoxes, convertBox, postProcess, getBoxList } from './additionalBoxes';
import { m2tsBoxer, decodeM2TS, convertM2TS } from './m2tsBoxer';
import { BIFParser } from './bifParser';
import { convertToHex } from './tools';


import Header from './header';
import Home from './home';
import Video from './video';
// debugging
import MultiView from './multiview';

// for M2TS segments, how many to parse? 
const SEGMENT_COUNT = 512;

const styles = {
	parseButton: {
		width: '8em',
		margin: '5px',
		height: '3em',
		padding: '2px',
		color: 'whitesmoke',
		background: '#673ab7',
		boxShadow: '0 0 5px rgba(0, 0, 0, .5)',
		zIndex: '50',
		border: 'none',
		borderRadius: '3px',
		textAlign: 'center',
		alignContent: 'center'
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
	4: 'Can\'t parse metadata. Is this not an initialization segment?',
	99: `MP2T file appears to be encrypted. 
	Please select a '.key' file and a '.m3u8' file
	using 'Select Local File' above`

}

const parseISO = buf => new Promise(async (resolve, reject) => {
	const VALID_START_BOX = new Set([
		'ftyp',
		'moof',
		'styp',
		'sidx'
	]);
	// get the boxes
	try {
		const parsedData = await parseBuffer(buf.buffer)
		if (VALID_START_BOX.has(parsedData.boxes[0].type)) {
			// process the boxes
			const preProcessed = convertBox(parsedData.boxes);
			console.log('pre-processed box data:', preProcessed);
			const result = postProcess(preProcessed);
			return resolve({ boxes: result });
		}
		return reject(new Error('not an ISOBMFF file'));
	} catch (err) {
		return reject(err);
	}

});

const parseBIF = buf => new Promise((resolve, reject) => {
	try {
		const bif = new BIFParser(buf.buffer);
		const index = bif.bifIndex;
		const multiplier = bif.framewiseSeparation / 1000;
		const { boxes, videoData } = index.reduce((result, entry) => {
			// boxes should be {type, start, size, boxes}
			const { width, height, format } = bif.getImageMetaAtSecond(entry.timestamp * multiplier);
			result.boxes.push({
				start: entry.offset,
				type: `${format} image`,
				end: entry.offset + entry.length,
				display: `image ${entry.timestamp}`,
				hex: null,
				boxes: [
					{ name: 'width', display: width },
					{ name: 'height', display: height },
					{ name: 'timestamp', display: entry.timestamp }
				]
			});
			// videoData should be {timestamp, src}
			result.videoData.push({ timestamp: entry.timestamp * multiplier, src: bif.getImageDataAtSecond(entry.timestamp * multiplier) });
			return result;
		}, { boxes: [], videoData: [] });
		return resolve({ boxes, videoData });
	} catch (error) {
		return reject(error);
	}

});

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playlist: null,
			keyFile: null,
			fileName: 'raw base64 data',
			inputData: '',
			videoData: '',
			parsedData: { boxes: [] },
			mode: 'MP2T',
			working: false,
			errorMessage: '',
			videoError: '',
			decodeAttempts: 0,
			showHex: false,
			showVideo: false,
			hasFocus: -1,
			base64: '',
			expanded: false,
			boxList: new Map(),
			selectedBox: { target: '', parentList: [] },
			searchTerm: '',
			viewMode: false
		}
	}

	componentWillMount = () => {
		// add any custom box processors
		additionalBoxes.map(box => {
			if (Object.hasOwnProperty.call(box, '_parser')) addBoxProcessor(box.field, box._parser)
		});
	}

	createParsed = inputData => {
		const inputBuffer = Buffer.from(inputData, 'base64');
		//console.log('hex dump',new TextDecoder('utf-8').decode(inputBuffer));
		if (this.state.mode === 'webm') {
			const parsedEBML = ebmlBoxer(inputBuffer.buffer);
			return parsedEBML;
		}
		if (this.state.mode === 'mp4') {
			const parsedISO = parseISO(inputBuffer);
			return parsedISO;
		}
		if (this.state.mode === 'bif') {
			return parseBIF(inputBuffer).then(({ boxes, videoData }) => {
				this.setState({ videoData });
				return { boxes };
			});
		}
		if (this.state.mode === 'MP2T') {
			// check first byte for the start code
			if (inputBuffer[0] !== 0x47) {
				let decryptedData;
				// it's not a start code, and we're in MP2T mode, so try decrypting
				if (this.state.playlist && this.state.keyFile) {
					return decodeM2TS(this.state.playlist, this.state.keyFile, inputData, SEGMENT_COUNT)
						.then(result => {
							decryptedData = result;
							// store the converted output in inputData
							this.setState({ videoData: decryptedData });
							// now process the boxes
							return m2tsBoxer(decryptedData, SEGMENT_COUNT);
						})
						.catch(err => console.error(err));
				} else {
					this.setState({ videoError: niceError[99], working: false });
					return;
				};
			}
			// start code is valid, so just parse
			this.setState({ videoData: inputBuffer });
			return m2tsBoxer(inputBuffer, SEGMENT_COUNT);
		};
	}

	updateInput = e => {
		console.log(`updating inbox box with new value: ${e.target.value}`);
		const inputData = e.target.value;
		this.setState({ inputData });
	}

	parseFile = async inputData => {
		console.log(`parsing data in ${this.state.mode} mode:`);
		this.setState({ working: true, showVideo: false, videoError: '' });
		try {
			const { boxes } = await this.createParsed(inputData);
			const listOfBoxes = new Map();
			//extract a list of box names for the dropdown
			//return Map([target, [parentList]]}
			getBoxList(boxes, listOfBoxes).then(boxList => this.setState({ boxList, inputData, parsedData: boxes, working: false, decodeAttempts: 0 }));
			return;
		} catch (err) {
			console.error(err);
			this.setState({ errorMessage: err.message || err, working: false });
			/* if (this.state.decodeAttempts < Object.keys(modes).length) {
				let { decodeAttempts, mode } = this.state;
				decodeAttempts += 1;
				mode = modes[mode];
				console.log(`failed decode #${decodeAttempts}, trying ${mode} mode`);
				this.setState({ decodeAttempts, mode, working: true });
				this.parseFile(this.state.inputData);
			} */
		}
	}

	handleEncrypted = e => {
		console.log('got encrypted event', e.target && e.target.error);
		e.preventDefault();
		const videoError = niceError[e.target && e.target.error && e.target.error.code] || 'unknown error';
		this.setState({ showVideo: false, videoError });
	}

	handleFiles = (e, fileType) => {
		const fileName = e.target.files[0];
		this.setState({ working: true, showVideo: false, inputData: '' });
		console.log(fileName);
		let mode = 'MP2T'; //default
		if (fileName.type) {
			if (fileName.type.includes('webm')) mode = 'webm';
			if (fileName.type.includes('mp4')) mode = 'mp4';
			if (fileName.type.includes('bif')) mode = 'bif';
		} else {
			if (/m4?$/.test(fileName.name)) mode = 'mp4';
			if (/bif$/.test(fileName.name)) mode = 'bif';
			if (/webm$/.test(fileName.name)) mode = 'webm';
		}
		// set the mode and clear out some key state variables
		this.setState({
			fileName: 'raw base64 data',
			inputData: '',
			videoData: '',
			parsedData: { boxes: [] },
			working: false,
			errorMessage: '',
			videoError: '',
			decodeAttempts: 0,
			showHex: false,
			showVideo: false,
			hasFocus: -1,
			base64: '',
			expanded: false,
			boxList: new Map(),
			selectedBox: { target: '', parentList: [] },
			searchTerm: '',
			viewMode: false,
			mode
		});
		const reader = new FileReader();
		const self = this;
		reader.onload = r => {
			switch (fileType) {
				case 'playlist':
					const playlist = atob(r.target.result.split(/base64,/)[1]);
					self.setState({ playlist, working: false, fileName: `Loaded Playlist ${fileName.name}` });
					break;
				case 'key':
					const keyFile = r.target.result.split(/base64,/)[1];
					self.setState({ keyFile, working: false, fileName: `Loaded key file ${fileName.name}` });
					break;
				default:
					const inputData = r.target.result.split(/base64,/)[1];
					self.setState({ inputData, fileName: fileName.name });
					self.parseFile(inputData);
			}
		}
		reader.readAsDataURL(fileName);
	}

	toggleHex = e => {
		const showHex = !this.state.showHex;
		this.setState({ showHex });
	}

	togglePreview = e => {
		this.setState({ working: true });
		const showVideo = !this.state.showVideo;
		let videoData;
		if (this.state.mode === 'MP2T' && showVideo) {
			// rather than using HLS.js or anything, just convert it to Mp4 so we can use the browser's built-in player
			const inputBuffer = this.state.videoData;
			convertM2TS(inputBuffer)
				.then(convertedFile => {
					// it's a buffer, so make it into base64 for rendering
					videoData = Buffer.from(convertedFile, 'base64') //btoa(Array.from(convertedFile).map(byte => String.fromCharCode(byte)).join(''));
					return;
				})
				.catch(err => console.error(err));
		} else if (this.state.mode === 'bif') {
			// nothing to do, videoData is already good
			videoData = this.state.videoData;
		} else {
			videoData = this.state.inputData;
		}
		this.setState({ working: false, showVideo, videoData });
	}

	handleFocus = (e, focusRow, showOffset) => {
		console.log(`got mouse${showOffset ? 'Enter' : 'Leave'} event for row ${focusRow}`);
		this.setState({ hasFocus: showOffset ? focusRow : -1 })
	}

	handleSearch = (e) => {
		const searchTerm = e.target.value;
		console.log(`searching box list for ${searchTerm}`);
		const keyList = Array.from(this.state.boxList.keys()).filter(({ box, start }) => box === searchTerm);
		console.log(keyList);
		if (keyList.length) {
			const parentList = keyList.reduce((result, key) => this.state.boxList.get(key).parent.concat(result), []);
			this.setState({ searchTerm, selectedBox: { target: searchTerm, parentList } });
		}
		if (searchTerm == '') {
			this.setState({ searchTerm, selectedBox: { target: '', parentList: [] } });
		}
	}

	expandAll = e => {
		console.log(`got command to ${this.state.expanded ? 'collapse' : 'expand'} the tree`);
		const expanded = !this.state.expanded;
		this.setState({ working: true, expanded });
		setTimeout(() => this.setState({ working: false }), 100);
	}

	toggleBase64 = (e, boxData) => {
		let mp4Hex, base64;

		if (!this.state.base64) {
			if (this.state.mode === 'mp4' && boxData) {
				// need to extract the hex by size and start byte
				const buf = Buffer.from(this.state.inputData, 'base64').slice(boxData.start, boxData.start + boxData.size);
				mp4Hex = convertToHex(buf, true);
			}
			if (this.state.mode === 'MP2T' && boxData) {
				mp4Hex = boxData.hex;
			}
			const hexData = mp4Hex; //boxData && (boxData.hex || mp4Hex);
			// hidden => hex
			base64 = hexData;
		} else {
			base64 = '';
		}
		this.setState({ base64 })
	}

	changeViewMode = e => {
		const viewMode = !this.state.viewMode;
		this.setState({ viewMode });
	}

	changeFileMode = (e, mode) => {
		this.setState({ mode });
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
					viewMode={this.state.viewMode}
					changeViewMode={this.changeViewMode}
				/>
				{this.state.showHex ? (
					<div style={styles.inputArea}>
						<div style={{ gridRow: '1/3' }}>
							<textarea style={{ height: '90%', width: '95%', margin: '10px' }} onChange={e => this.updateInput(e)} value={this.state.inputData} />
						</div>
						<div style={{ margin: '18px 0 0 7px' }}>
							{['mp4', 'webm', 'MP2T'].map(type => (<div>
								<input id={type} type="radio" name={type} value={type} checked={this.state.mode === type} onChange={e => this.changeFileMode(e, type)} />
								<label htmlFor={type}><span><span></span></span>{type}</label>
							</div>))}
						</div>
						<div style={{ gridRow: '2/3' }}>
							<button style={styles.parseButton} onClick={e => this.parseFile(this.state.inputData)}>Go</button>
						</div>
					</div>) : <div />
				}
				<div>
					{this.state.showVideo ?
						<Video
							mimeType={this.state.mode === 'MP2T' ? 'mp4' : this.state.mode}
							data={this.state.videoData}
							handleEncrypted={this.handleEncrypted}
						/> : <div style={{ padding: this.state.showHex ? '10px 10px' : '56px 10px' }}>{this.state.videoError}</div>}
					<div class={'treeControl'}>
						<div style={styles.parseButton} onClick={this.expandAll}>{this.state.expanded ? 'Collapse Tree View' : 'Expand Tree View'}</div>
						<div style={styles.parseButton}><input list="tags" class={'tagSearch'} placeholder="search for tag" size="8" onChange={this.handleSearch} value={this.state.searchTerm}>
							<datalist style={styles.parseButton} id="tags">
								{Array.from(this.state.boxList.keys()).map(boxName => {
									if (boxName.box) return <option value={boxName.box}>{boxName.box}</option>
									return <option />
								})}
							</datalist>
						</input></div>
					</div>
					{this.state.viewMode ?
						<MultiView
							postProcessed={this.state.parsedData}
							boxList={this.state.boxList}
							fileName={this.state.fileName}
						/> :
						<Home
							fileName={this.state.fileName}
							decodeMode={this.state.mode}
							working={this.state.working}
							parsedData={this.state.parsedData}
							handleFocus={this.handleFocus}
							error={this.state.errorMessage}
							hasFocus={this.state.hasFocus}
							base64={this.state.base64}
							toggleBase64={this.toggleBase64}
							expandAll={this.state.expanded}
							selectedBox={this.state.selectedBox}
						/>}
				</div>
			</div >
		);
	}
}
