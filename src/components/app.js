import { h, Component } from 'preact';
import { parseBuffer, addBoxProcessor } from 'codem-isoboxer';
import { ebmlBoxer } from './ebmlBoxer';
import { additionalBoxes, convertBox, postProcess } from './additionalBoxes';
import { m2tsBoxer } from './m2tsBoxer';


import Header from './header';
import Home from './home';
import Video from './video';

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
		console.log(preProcessed);
		const result = postProcess(preProcessed);
		return resolve({ boxes: result });
	}
	return reject(new Error('not an ISOBMFF file'));

});

const parseWebM = buf => ebmlBoxer(buf.buffer);

const parseM2TS = buf => m2tsBoxer(buf);

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
			fileName: 'raw base64 data',
			base64: '',
			expanded: false
		}
	}

	componentWillMount = () => {
		// add any custom box processors
		additionalBoxes.map(box => {
			if (Object.hasOwnProperty.call(box, '_parser')) addBoxProcessor(box.field, box._parser)
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
			.then(({ boxes }) => {
				console.log(boxes);
				this.setState({ parsedData: boxes, working: false, decodeAttempts: 0 });
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
		this.setState({ working: true, showVideo: false, inputData: '', fileName: fileName.name });
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

	togglePreview = e => {
		this.setState({ showVideo: !this.state.showVideo })
	}

	handleFocus = (e, focusRow, showOffset) => {
		console.log(`got mouse${showOffset ? 'Enter' : 'Leave'} event for row ${focusRow}`);
		this.setState({ hasFocus: showOffset ? focusRow : -1 })
	}

	expandAll = e => {
		console.log(`got command to ${this.state.expanded ? 'collapse' : 'expand'} the tree`);
		this.setState({ working: true, expanded: !this.state.expanded });
		setTimeout(() => this.setState({ working: false }), 2000);
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
					expandAll={this.expandAll}
					expanded={this.state.expanded}
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
						hasFocus={this.state.hasFocus}
						base64={this.state.base64}
						toggleBase64={this.toggleBase64}
						expandAll={this.state.expanded}
					/>
				</div>
			</div >
		);
	}
}
