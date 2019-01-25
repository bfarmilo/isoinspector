import { h } from 'preact';
import style from './style';


const Home = props => {

	const processBox = box => {
		// box.start {number} byte offset of box start
		// box.end {number} byte offset of box end
		// box.display {string} display value of the box
		// box.hex {string} hex representation of the box
		// box.name {string} name of the data entry
		// box.type {string} name of the container box
		// box.boxes {Array:box} sub-boxes
		// 

		const boxLabel = `${box.type || box.name}${(props.hasFocus === box.start && box.type) ? ` starting byte: ${box.start}` : ''}${box.type ? ` (${box.size} bytes)` : ''}`;

		// container boxes have a 'type'. They may contain 'boxes' or raw hex.
		if (Object.hasOwnProperty.call(box, 'type')) {
			return <div style={{ display: 'flex' }}>
				<div style={{ minWidth: '30em' }}>
					<details onToggle={e => props.toggleBase64(e, '')} key={box.start}>
						<summary class={style.boxName} /*onMouseEnter={e => props.handleFocus(e, box.start, true)} onMouseLeave={e => props.handleFocus(e, box.start, false)}*/>
							{boxLabel}
						</summary>
						{box.boxes ? box.boxes.map(processBox) : box.display || box.hex && box.hex.map(row => <div onClick={e => props.toggleBase64(e, box.hex)} class={style.hexEntry}>{row}</div>)}
					</details>
				</div>
				<div><a style={{ display: 'flex', justifySelf: 'end' }} onClick={e => props.toggleRaw(e, box.start)}>+</a></div>
			</div>
		}
		// need to handle four cases here: raw hex, a simple object (key=name, value=display), an array of Objects, or a deeply nested box.
		let outputRow;
		let outputLabel = <span /*onMouseEnter={e => props.handleFocus(e, box.start, true)} onMouseLeave={e => props.handleFocus(e, box.start, false)}*/>{boxLabel}:</span>;
		if (box.hex) {
			outputRow = <details onToggle={e => props.toggleBase64(e, '')}><summary class={style.boxContents}>{box.display || ''}</summary>{box.hex.map(row => <div onClick={e => props.toggleBase64(e, box.hex)} key={row} class={style.hexEntry}>{row}</div>)}</details>;
		} else if (Array.isArray(box.display) && box.display[0] && box.display[0].entryNumber) {
			outputRow = box.display.map(entry => <details><summary class={style.boxProp}>entry {entry.entryNumber}</summary>{Object.keys(entry).filter(key => key !== 'entryNumber').map(key => <div><span class={style.boxProp}>{key}:</span><span class={style.boxContents}>{entry[key]}</span></div>)}</details>)
		} else if (box.boxes) {
			outputLabel = '';
			outputRow = box.boxes.map(processBox)
		} else {
			outputRow = <span class={style.boxContents}>{box.display}</span>;
		}
		return <div key={box.start} class={box.boxes ? style.boxName : style.boxProp}>
			{outputLabel}
			{outputRow}
		</div>
	}
	/*
			mp4: box => {
				/**
				 * box.keys
				 * box.boxes
				 * box[item]
				 * box[item].hex
				 * box.type
				 * box.entryNumber ? (if box[item] is an array) 
				 * 
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
	*/
	return (
		<div class={style.home} >
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
						<div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr' }}>
							<div class={style.Result}>
								{(props.parsedData.length > 0) ?
									props.parsedData.map(processBox)
									: <div>No valid boxes detected</div>
								}
							</div>
							<div>{props.base64 ? <div class={style.hexEntry}>{props.base64}</div> : ''}</div>
						</div>
					)
			}
		</div >
	);
}

export default Home;
