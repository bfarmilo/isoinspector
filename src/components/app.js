import { h, Component } from 'preact';
import { parseBuffer, addBoxProcessor } from 'codem-isoboxer';
import { ebmlBoxer } from './ebmlBoxer';
import { additionalBoxes, convertBox, postProcess, getBoxList } from './additionalBoxes';
import { m2tsBoxer, decodeM2TS, convertM2TS } from './m2tsBoxer';


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
	const parsedData = await parseBuffer(buf.buffer);
	if (VALID_START_BOX.has(parsedData.boxes[0].type)) {
		// process the boxes
		const preProcessed = convertBox(parsedData.boxes);
		console.log('pre-processed box data:', preProcessed);
		const result = postProcess(preProcessed);
		return resolve({ boxes: result });
	}
	return reject(new Error('not an ISOBMFF file'));

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

	createParsed = async inputData => {
		const inputBuffer = Uint8Array.from(atob(inputData), c => c.charCodeAt(0));
		if (this.state.mode === 'webm') return ebmlBoxer(inputBuffer.buffer);
		if (this.state.mode === 'mp4') return parseISO(inputBuffer);
		if (this.state.mode === 'MP2T') {
			// check first byte for the start code
			if (inputBuffer[0] !== 0x47) {
				let decryptedData;
				// it's not a start code, and we're in MP2T mode, so try decrypting
				if (this.state.playlist && this.state.keyFile) {
					decryptedData = await decodeM2TS(this.state.playlist, this.state.keyFile, inputData, SEGMENT_COUNT);
					// store the converted output in inputData
					this.setState({ videoData: decryptedData });
					// now process the boxes
					return m2tsBoxer(decryptedData, SEGMENT_COUNT);
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

	parseFile = inputData => {
		console.log(`parsing data in ${this.state.mode} mode:`);
		this.setState({ working: true, showVideo: false, videoError: '' });
		this.createParsed(inputData)
			.then(({ boxes }) => {
				const listOfBoxes = new Map();
				//extract a list of box names for the dropdown
				//return Map([target, [parentList]]}
				getBoxList(boxes, listOfBoxes).then(boxList => this.setState({ boxList, inputData, parsedData: boxes, working: false, decodeAttempts: 0 }));
				;
				return;
			})
			.catch(err => {
				console.error(err);
				this.setState({ errorMessage: err, working: false });
				/* if (this.state.decodeAttempts < Object.keys(modes).length) {
					let { decodeAttempts, mode } = this.state;
					decodeAttempts += 1;
					mode = modes[mode];
					console.log(`failed decode #${decodeAttempts}, trying ${mode} mode`);
					this.setState({ decodeAttempts, mode, working: true });
					this.parseFile(this.state.inputData);
				} */
			})
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
		if (fileName.type.includes('webm')) {
			this.setState({ mode: 'webm' });
		} else if (fileName.type.includes('mp4')) {
			this.setState({ mode: 'mp4' });
		} else {
			this.setState({ mode: 'MP2T' });
		}
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

	togglePreview = async e => {
		this.setState({ working: true });
		const showVideo = !this.state.showVideo;
		const inputBuffer = this.state.videoData;
		let videoData;
		if (this.state.mode === 'MP2T' && showVideo) {
			const convertedFile = await convertM2TS(inputBuffer);
			// it's a buffer, so make it into base64 for rendering
			videoData = btoa(Array.from(convertedFile).map(byte => String.fromCharCode(byte)).join(''));
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
		const extractHex = buffer => {
			const getRow = start => (start + 16 < buffer.length) ?
				[buffer.slice(start, start + 16).map(bit => bit.toString('16').padStart(2, '0').toUpperCase()).join(' ')].concat(getRow(start + 16)) :
				[buffer.slice(start).map(bit => bit.toString('16').padStart(2, '0').toUpperCase()).join(' ')];
			return getRow(0);
		}
		let mp4Hex, base64;

		if (this.state.mode === 'mp4' && boxData) {
			// need to extract the hex by size and start byte
			const buf = Array.from(Uint8Array.from(atob(this.state.inputData), c => c.charCodeAt(0)).slice(boxData.start, boxData.start + boxData.size));
			mp4Hex = extractHex(buf);
		}
		const hexData = boxData && (boxData.hex || mp4Hex);
		// toggle from hidden => base64 => hex
		if (!this.state.base64) {
			// hidden => base64
			base64 = hexData ? hexData.join(' ').split(' ').map(byte => String.fromCharCode(parseInt(byte, 16))).join('') : '';
		} else if (this.state.base64 instanceof Array) {// /([0-F][0-F] ){3,}/i.test(this.state.base64)) {
			// hex => hidden
			base64 = ''
		} else {
			// base64 => hex
			base64 = hexData;
		}
		this.setState({ base64 })
	}

	changeViewMode = e => {
		const viewMode = !this.state.viewMode;
		this.setState({ viewMode });
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
									if (boxName) return <option value={boxName}>{boxName}</option>
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
