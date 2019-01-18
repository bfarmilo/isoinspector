import { h } from 'preact';
import style from './style';
import { convertToHex } from '../../components/tools.js';
import { psshLookup, getISOData } from '../../components/additionalBoxes.js';


const Home = props => {

	const processBox = {
		webm: box => {
			// box.start {number} byte offset of box start
			// box.end {number} byte offset of box end
			// box.display {string} display value of the box
			// box.hex {string} hex representation of the box
			// box.name {string} name of the box
			// box.boxes {Array:box} sub-boxes
			// 
			const seekOffset = box.start
			const willShowOffset = box.hex || Object.hasOwnProperty.call(box, 'boxes');
			const boxLabel = willShowOffset ? `${box.name}${props.hasFocus === box.start && seekOffset > 0 ? ` starting byte: ${seekOffset}` : ''}` : box.name === "Cues" ? `: bytes ${box.start}-${box.end}` : box.name;

			if (Object.hasOwnProperty.call(box, 'boxes')) {
				return <div style={{ display: 'flex' }}>
					<div style={{ minWidth: '30em' }}>
						<details key={box.start}>
							<summary class={style.boxName} onMouseEnter={e => props.handleFocus(e, box.start, true)} onMouseLeave={e => props.handleFocus(e, box.start, false)}>
								{boxLabel}
							</summary>
							{box.boxes.map(processBox.webm)}
						</details>
					</div>
					<div><a style={{ display: 'flex', justifySelf: 'end' }} onClick={e => props.toggleRaw(e, box.start)}>+</a></div>
				</div>
			}
			return <div key={box.start} class={style.boxProp}>
				{willShowOffset ? <span onMouseEnter={e => props.handleFocus(e, box.start, true)} onMouseLeave={e => props.handleFocus(e, box.start, false)}>{boxLabel}:</span> :
					<span>{boxLabel}:</span>}
				{box.hex ?
					<details><summary class={style.boxContents}>{box.display || ''}</summary>{box.hex.map(row => <div key={row} class={style.hexEntry}>{row}</div>)}</details> :
					<span class={style.boxContents}>{box.display}</span>}
			</div>
		},

		mp4: box => {
			/**
			 * box.keys
			 * box.boxes
			 * box[item]
			 * box[item].hex
			 * box.type
			 * box.entryNumber ? (if box[item] is an array) 
			 * */
			console.log(box);
			// iterate through the valid keys and generate processed output
			const boxEntry = (isoBox, keyList) => keyList.map(key => {
				return (
					<div class={style.boxProp}>
						<span>{key}: </span>
						{isoBox[key].hex ?
							isoBox[key].hex.map(row => <div class={style.hexEntry}>{row}</div>) :
							Array.isArray(isoBox[key]) ?
								isoBox[key].map(processBox.mp4) :
								<span class={style.boxContents}>{isoBox[key]}</span>}
					</div>
				)
			});

			// if the box contains a 'boxes' prop (but doesn't have an entryNumber, which we added) recurse
			// otherwise output the boxEntry according to the above.
			return (
				<details>
					{box.entryNumber ? <summary class={style.boxProp}>{box.type || box.entryNumber}</summary> : <summary class={style.boxName}>{box.type} ({box.end-box.start} bytes)</summary>}
					{Object.hasOwnProperty.call(box, 'boxes') && !Object.hasOwnProperty.call(box, 'entryNumber') ?
						box.boxes.map(processBox.mp4) :
						boxEntry(box, box.keys)}
				</details>
			)
		}
	}

	return(
		<div class= { style.home } >
			<h2>{props.fileName} ({props.decodeMode})</h2>
			{
		props.working ? (
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
		) : (
			<div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr' }}>
				<div class={style.Result}>
					{(props.parsedData.boxes.length > 0) ?
						props.parsedData.boxes.map(processBox[props.decodeMode])
						: <div>No valid boxes detected</div>
					}
				</div>
				<div>{props.showRaw !== -1 ? props.rawVals.get(props.showRaw).map(row => <div key={row} class={style.hexEntry}>{row}</div>) : ''}</div>
			</div>
		)
	}
		</div >
	);
}

export default Home;
