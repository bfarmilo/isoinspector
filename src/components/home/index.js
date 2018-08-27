import { h } from 'preact';
import style from './style';
const ISOBoxer = require('codem-isoboxer');
import { getWebMData } from '../../components/additionalwebM.js';
import { convertToHex } from '../../components/tools.js';
import { psshLookup, getISOData } from '../../components/additionalBoxes.js';


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

	const getISOJSX = box => {

		// entryNumber is added by the box processor when the box contains an array of objects. It is not in the stream.
		// we process 'boxes' recursively.
		// no need to parse 'size' or 'type'.
		const SKIP_KEYS = [
			'boxes',
			'size',
			'type',
			'entryNumber'
		];

		const contents = Object.keys(box).filter(key => !/^_/i.test(key) && !SKIP_KEYS.includes(key));

		// iterate through the valid keys and generate processed output
		const boxEntry = isoBox => contents.map(key => {
			const result = getISOData(isoBox.type, key, isoBox[key]);
			return (
				<div key={`${isoBox._offset}_${key}`} class={style.boxProp}>
					<span>{key}: </span>
					{Array.isArray(result) ? result.map(getISOJSX) : <span key={`${key}_${result}`} class={style.boxContents} raw={convertToHex(isoBox._raw)}>{result}</span>}
				</div>
			)
		});

		// if the box contains a 'boxes' prop (but doesn't have an entryNumber, which we added) recurse
		// otherwise output the boxEntry according to the above.
		return (
			<details key={box._offset}>
				{box.entryNumber ? <summary class={style.boxProp}>{box.type || box.entryNumber}</summary> : <summary class={style.boxName}>{box.type} ({box.size} bytes)</summary>}
				{Object.hasOwnProperty.call(box, 'boxes') && !Object.hasOwnProperty.call(box, 'entryNumber') ? box.boxes.map(getISOJSX) : boxEntry(box)}
			</details>
		)
	}

	return (
		<div class={style.home}>
			<div class={style.inputArea}>
				<div>
					<label for="getFile"><div class={style.parseButton} style={{ textAlign: 'center', paddingTop: '0.2em' }}>Select Local File</div></label>
					<input type="file" style={{ opacity: 0 }} id="getFile" onChange={props.handleFiles} />
				</div>
				<div style={{marginTop:'1.5em'}}>or</div>
				<div><button class={style.parseButton} onClick={props.toggleHex}>Paste Hex Values</button></div>
				<div></div>
				<div style={{ gridColumn: '1/5' }}>{props.showHex ? (<div><textarea class={style.inputBox} onChange={props.updateInput} value={props.inputData} />
					<button class={style.parseButton} onClick={props.parseFile}>Go</button></div>) : ''}</div>
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
								: props.parsedData.boxes.map(getISOJSX)
							: <div>No valid boxes detected</div>
					}
				</div>
			</div>
		</div>
	);
}

export default Home;
