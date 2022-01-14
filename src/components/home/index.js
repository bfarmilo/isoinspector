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

        const showEntryDetails = (title, entry) => {
            const expandBox = props.selectedBox && (props.selectedBox.target === title || props.selectedBox.parentList.includes(title));
            return (
                <details open={props.expandAll || expandBox}>
                    <summary class={style.boxProp}>{title.slice(0, -1)} {entry.entryNumber}</summary>
                    {Object.keys(entry).filter(key => key !== 'entryNumber' && key !== 'title').map(key => {
                        if (Array.isArray(entry[key])) {
                            return entry[key].filter(element => element && element.entryNumber).map(element => showEntryDetails(key, element))
                        }
                        return (
                            <div><span class={style.boxProp}>{key}:</span><span class={style.boxContents}>{entry[key]}</span></div>
                        );
                    }
                    )}
                </details>);
        };

        const boxLabel = `${box.type || box.name}${(props.hasFocus === box.start && box.type) ? ` starting byte: ${box.start}` : ''}${box.type && box.end ? ` (${box.size || box.end-box.start+1} bytes)` : ''}`;

        // container boxes have a 'type'. They may contain 'boxes' or raw hex.
        if (Object.hasOwnProperty.call(box, 'type')) {
            const expandBox = props.selectedBox && (props.selectedBox.target === boxLabel || props.selectedBox.parentList.includes(boxLabel));
            return <div style={{ display: 'flex' }}>
                <div style={{ minWidth: '30em' }}>
                    <details open={props.expandAll || expandBox} onToggle={e => props.toggleBase64(e, null)} key={box.start}>
                        <summary class={style.boxName} /*onMouseEnter={e => props.handleFocus(e, box.start, true)} onMouseLeave={e => props.handleFocus(e, box.start, false)}*/>
                            {boxLabel}
                        </summary>
                        {box.boxes ? box.boxes.map(processBox) : box.display || (box.hex && box.hex.map(row => <div onClick={e => props.toggleBase64(e, box)} class={style.hexEntry}>{row}</div>))}
                    </details>
                </div>
                <div><a style={{ display: 'flex', justifySelf: 'end' }} onClick={e => props.toggleBase64(e, box)}>+</a></div>
            </div>;
        }
        // need to handle five cases here: 
        // 1. raw hex, 
        // 2. a simple object (key=name, value=display), 
        // 3. an array of Objects, 
        // 4. a deeply nested box,
        // 5. (senc) an array of Objects that contains a key that contains an Array of Objects
        // 6. a box containing an object, (eg pssh's Data field, sometimes)
        let outputRow;
        let outputLabel = <span /*onMouseEnter={e => props.handleFocus(e, box.start, true)} onMouseLeave={e => props.handleFocus(e, box.start, false)}*/>{boxLabel}:</span>;
        if (box.hex) {
            // case 1
            outputRow = <details open={props.expandAll} onToggle={e => props.toggleBase64(e, null)}><summary class={style.boxContents}>{box.display || ''}</summary>{box.hex.map(row => <div onClick={e => props.toggleBase64(e, box)} key={row} class={style.hexEntry}>{row}</div>)}</details>;
        } else if (Array.isArray(box.display) && box.display[0] && box.display[0].entryNumber) {
            // case 3
            outputRow = box.display.map(display => showEntryDetails(boxLabel, display));
            // case 5
        } else if (box.boxes) {
            // case 4
            outputLabel = '';
            outputRow = box.boxes.map(processBox);
        } else if (boxLabel=='Data' && typeof(box.display)=='object') {
            // case 6
            outputRow = <span class={style.boxContents}>{Object.keys(box.display).map(subKey => <div key={subKey} style={{margin:'0px 10px'}}><span style={{fontWeight:'bold'}}>{subKey}:</span><span style={{margin:'0px 3px'}}>{box.display[subKey]}</span></div>)}</span>;
        } else {
            // case 2
            outputRow = <span class={style.boxContents}>{box.display}</span>;
        }
        return <div key={box.start} class={box.boxes ? style.boxName : style.boxProp}>
            {outputLabel}
            {outputRow}
        </div>;
    };

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
                        <div>{props.base64 ? (props.base64 instanceof Array) ?
                            props.base64.map(row => <div class={style.hexEntry}>{row}</div>)
                            : <div class={style.hexEntry}>{props.base64}</div>
                            : ''}</div>
                    </div>
                )
            }
        </div >
    );
}

export default Home;
