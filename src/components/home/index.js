import { h } from 'preact';
import style from './style';
const ISOBoxer = require('codem-isoboxer');
import { getWebMData } from '../../components/additionalwebM.js';
import { convertToHex } from '../../components/tools.js';
import { psshLookup } from '../../components/additionalBoxes.js';


const Home = props => {



	const getWebMJSX = box => {

		if (Object.hasOwnProperty.call(box, 'boxes')) {
			return <details key={box.start}><summary class={style.boxName}>{box.name}</summary>{box.boxes.map(getWebMJSX)}</details>
		}
		return <div key={box.start} class={style.boxProp}><span>{box.name}: </span><span class={style.boxContents} raw={convertToHex(box.data)}>{getWebMData(box)}</span></div>
	};


	/** takes the box contents and recursively maps them to JSX
	 * @param {ISOBox} box -> The ISOBox
	 */

	const getBoxData = box => {
		/* refactor required. See getWebMJSX for dealing with nested boxes
		fixed fields are size, type
		all ISO fields are keys not prefixed by _
		see getWebMData for clean way of dealing with different datatypes
		*/ 
		const boxContents = Object.keys(box)
			.filter(key => !/^_/i.test(key) && key !== 'boxes' && key !== 'size')
			.map(key => {
				if (key === 'type') return <div class={style.boxName}>{box.type}({box.size} bytes)</div>;
				if (Array.isArray(box[key])) {
					// if the array entry isn't an object, return a comma separated list
					if (typeof (box[key][0]) !== 'object') {
						let formattedData;
						switch (key) {
							case 'SystemID':
								formattedData = `0x ${convertToHex(box[key])} (${psshLookup[convertToHex(box[key])]})`;
								break;
							case 'Data':
								formattedData = box[key].map(b => String.fromCharCode(b));
								break;
							default: box[key].join(', ');
						}
						return <div><span class={style.boxProp}>{key}:</span><span class={style.arrayEntry}>{formattedData}</span></div>;
					}
					// if it's a plain object, return a stringified version
					if (!Object.hasOwnProperty.call(box[key][0], '_cursor')) return <div><span class={style.boxProp}>{key}: </span><div class={style.boxContents}>{box[key].map(val => <div class={style.arrayEntry}>{JSON.stringify(val, null, 1)}</div>)}</div></div>;
					// it's a box type object, so need to filter out keys with /^_/
					const innerKeys = Object.keys(box[key][0]).filter(newKey => !/^_/i.test(newKey));
					return <div><span class={style.boxProp}>{key}: </span><div class={style.boxContents}>{box[key].map(entry => {
						return innerKeys.map(innerKey => <div><span class={style.arrayEntry}>{innerKey}: </span><span>{(entry[innerKey] instanceof Uint8Array) ? convertToHex(entry[innerKey]) : entry[innerKey]}</span></div>)
					})}</div></div>;
				}
				if (key === 'data') return <div><span class={style.boxProp}>{key}: </span><span>{ISOBoxer.Utils.dataViewToString(box[key])}</span></div>;
				return <div><span class={style.boxProp}>{key}: </span><span class={style.boxContents}>{box[key]}</span></div>;
			});

		if (Object.hasOwnProperty.call(box, 'boxes')) {
			return (<div key={box._offset}><div class={style.boxContainer}>{boxContents}</div><div class={style.subBox}>{box.boxes.map(getBoxData)}</div></div>)
		}
		return (<div key={box._offset}><div class={style.boxContainer}>{boxContents}</div></div>)
	}

	return (
		<div class={style.home}>
			<div class={style.inputArea}>
				<textarea class={style.inputBox} onChange={props.updateInput} value={props.inputData} />
				<input type="file" onChange={props.handleFiles} />
				<button class={style.parseButton} onClick={props.parseFile}>Go</button>
			</div>
			<div>
				<h2> {props.decodeMode} File Contents </h2>
				<div class={style.Result}>
					{props.working ? (
						<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50' }}>
							<svg version='1.1' x='0px' y='0px' width='40px' height='50px' viewBox='0 0 24 30'>
								{[0, 1, 2].map(x => (
									<rect key={x} x={x * 7} y='0' width='4' height='20' fill='#673Ab7'>
										<animate attributeName='opacity' attributeType='XML'
											values='1; .2; 1'
											begin={`${x * 0.2}s`} dur='0.6s' repeatCount='indefinite' />
									</rect>
								))}
							</svg>
						</div>
					) : (props.parsedData.boxes.length > 0) ?
							props.decodeMode === 'webm' ?
								props.parsedData.boxes.map(getWebMJSX)
								: props.parsedData.boxes.map(getBoxData)
							: <div>No valid boxes detected</div>
					}
				</div>
			</div>
		</div>
	);
}

export default Home;
