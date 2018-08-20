import { h, Component } from 'preact';
import { Router } from 'preact-router';
const ISOBoxer = require('codem-isoboxer');
const { prft } = require('../components/additionalBoxes');
const { schema_ext } = require('../components/additionalwebM');
const ebml = require('ebml');

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


import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
// import Profile from '../routes/profile';



export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputData: 'paste Hex values or use Browse to load from file',
			parsedData: { boxes: [] },
			mode: 'webm',
			working: false,
			errorMessage: ''
		}
	}

	componentWillMount = () => {
		// add any custom box processors
		ISOBoxer.addBoxProcessor(prft.field, prft._parser);
	}

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	createParsed = inputData => {
		try {
			const inputBuffer = Uint8Array.from(atob(inputData), c => c.charCodeAt(0));
			return this.state.mode === 'webm' ? parseWebM(inputBuffer) : Promise.resolve(ISOBoxer.parseBuffer(inputBuffer.buffer));
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
				this.setState({ parsedData, working: false });
				return;
			})
			.catch(err => {
				this.setState({ errorMessage: err, working: false });
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
			this.createParsed(inputData)
				.then(parsedData => {
					//console.log(parsedData);
					self.setState({ inputData, parsedData, working: false });
				})
				.catch(err => {
					self.setState({ errorMessage: err, working: false });
					console.error(err);
				})
		}
		reader.readAsDataURL(file);
	}

	changeMode = e => {
		console.log(`switching from ${this.state.mode} to ${modes[this.state.mode]}`);
		this.setState({ mode: modes[this.state.mode] });
	}

	render() {
		return (
			<div id="app">
				<Header
					changeMode={this.changeMode}
					mode={this.state.mode}
				/>
<<<<<<< HEAD
				<Router onChange={this.handleRoute} basename={process.env.PUBLIC_URL}>
=======
				<Router onChange={this.handleRoute}>
>>>>>>> e0488ba2d665a42b66edf131aa0aa6503e7db33c
					<Home
						path="/"
						decodeMode={this.state.mode}
						working={this.state.working}
						parseFile={this.parseFile}
						updateInput={this.updateInput}
						inputData={this.state.inputData}
						parsedData={this.state.parsedData}
						handleFiles={this.handleFiles}
						error={this.state.errorMessage}
					/>
				</Router>
			</div>
		);
	}
}
