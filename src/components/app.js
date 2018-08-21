import { h, Component } from 'preact';
const ISOBoxer = require('codem-isoboxer');
const { prft } = require('../components/additionalBoxes');
const { schema_ext } = require('../components/additionalwebM');
const ebml = require('ebml');

import Header from './header';
// Code-splitting is automated for routes
import Home from './home';

const modes = {
	webm: 'isobmff',
	isobmff: 'm2ts',
	m2ts: 'webm'
}

const parseWebM = buf => new Promise((resolve, reject) => {
	const decoder = new ebml.Decoder(schema_ext, {});
	let lastChunkTime;
	let allData = { boxes: [] };

	// hack in case the stream never sends a 'finish' or 'end' event.
	const MAX_TIME = 1000;
	const pollTime = setInterval(() => {
		const currentTime = (new Date()).getTime();
		lastChunkTime = lastChunkTime || currentTime;
		if ((currentTime - lastChunkTime) > MAX_TIME) {
			clearInterval(pollTime);
			return resolve(allData);
		}
	}, 500);
	decoder.on('data', chunk => {
		allData.boxes.push({ dataType: chunk[0], payload: chunk[1] });
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
const parseM2TS = buf => ({ boxes: [] });

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputData: 'paste Hex values or use Browse to load from file',
			parsedData: { boxes: [] },
			mode: 'webm',
			working: false,
			errorMessage: '',
			decodeAttempts: 0
		}
	}

	componentWillMount = () => {
		// add any custom box processors
		ISOBoxer.addBoxProcessor(prft.field, prft._parser);
	}

	createParsed = inputData => {
		try {
			const inputBuffer = Uint8Array.from(atob(inputData), c => c.charCodeAt(0));
			if (this.state.mode === 'webm') return parseWebM(inputBuffer);
			let parsedData;
			if (this.state.mode === 'isobmff') {
				parsedData = ISOBoxer.parseBuffer(inputBuffer.buffer);
				if (parsedData.boxes[0].type !== 'ftyp' && parsedData.boxes[0].type !== 'moof') throw new Error('not an ISOBMFF box');
			};
			if (this.state.mode === 'm2ts') {
				parsedData = parseM2TS(inputBuffer);
				if (!parsedData.boxes[0]) throw new Error('m2ts mode not supported');
			}
			return Promise.resolve(parsedData);
		} catch (err) {
			return Promise.reject(err)
		}
	}

	updateInput = e => {
		console.log(`updating inbox box with new value: ${e.target.value}`);
		const inputData = e.target.value;
		this.setState({ inputData });
	}

	parseFile = e => {
		console.log(`parsing data in ${this.state.mode} mode:`);
		this.setState({ working: true });
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
					this.setState({ decodeAttempts, mode });
					this.parseFile(null);
				}
				console.error(err);
			})
	}

	handleFiles = e => {
		this.setState({ working: true });
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

	render() {
		return (
			<div id="app">
				<Header
					mode={this.state.mode}
				/>
				<Home
					decodeMode={this.state.mode}
					working={this.state.working}
					parseFile={this.parseFile}
					updateInput={this.updateInput}
					inputData={this.state.inputData}
					parsedData={this.state.parsedData}
					handleFiles={this.handleFiles}
					error={this.state.errorMessage}
				/>
			</div>
		);
	}
}
