import { h, Component } from 'preact';
import style from './style.css';
/** @jsx h */

const TagTree = props => {
    //create indents based on children
    const renderKids = boxKey => {
        try {
            // need to get the actual key object since {a:1, b:2} !== {a:2, b:2}
            const tag = Array.from(props.tags.keys()).filter(({ box, start }) => box === boxKey.box && start === boxKey.start)[0];
            const entry = props.tags.get(tag);
            return (
                <li
                    style={{ fontWeight: props.selected === tag ? "bold" : "normal" }}
                    onClick={e => props.handleClick(e, tag)}
                    key={tag.start}
                >
                    {tag.box}
                    {!!entry.children && entry.children.length > 0
                        ? entry.children.map(renderKids)
                        : ''}
                </li>
            );
        } catch (e) {
            console.error('error processing tag', tag, e)
        }
    };

    const rootTags = Array.from(props.tags).reduce((result, [key, entry]) => {
        if (entry.parent.length === 0) result.push(key);
        return result;
    }, []);

    return (
        <div
            style={{
                background: props.background,
                display: "grid",
                gridArea: "tree"
            }}
        >
            <li onClick={e => props.handleClick(e, "")} class={style.filename}>
                {props.fileName}{rootTags.map(renderKids)}
            </li>
        </div>
    );
};

const Data = props => {

    const dataToShow = box => {
        if (box.display && Array.isArray(box.display)) {
            if (box.display.length === 0) return <div style={{ margin: 'inherit' }}>[]</div>;
            return <div style={{ margin: 'inherit' }} onClick={e => props.arraySelected(e, box, props.tagName)}>Click for Details</div>
        }
        return <div style={{ margin: 'inherit' }}>{box.display}</div>;
    }

    return (
        <div
            style={{
                background: props.background,
                display: 'flex',
                flexDirection: 'column',
                gridArea: "data",
                overflowY: 'scroll'
            }}
        >{props.tagData && props.tagData.map(value => (
            <div style={{
                display: 'flex',
                margin: '2px 2px 2px 10px'
            }}>
                <div style={{ margin: 'inherit', fontWeight: 'bold' }}>{value.name}:</div>
                {dataToShow(value)}
            </div>)
        )}
        </div>
    )
};

const SubArray = props => (
    <div style={{
        overflowY: 'scroll'
    }}>
        {props.entryName ? <h2>{props.entryName}</h2> : <div />}
        <div
            style={{
                background: props.background,
                display: "flex",
                gridArea: "array",
                flexDirection: 'column'
            }}
        >{props.subArray.map(entry => (
            <div style={{ display: 'flex', background: entry.entryNumber % 2 ? 'lightgray' : 'darkgray' }}>
                <div style={{ display: 'flex', alignSelf: 'center' }}>{entry.entryNumber}</div>
                <div>{Object.keys(entry).filter(entry => entry !== 'entryNumber').map(key => (
                    <div style={{ display: 'flex', margin: '2px 2px 2px 10px' }}>
                        <div style={{ margin: 'inherit' }}>{key}:</div>
                        <div style={{ margin: 'inherit' }}>{entry[key]}</div>
                    </div>))
                }</div>
            </div>
        ))}
        </div>
    </div>
);

const Hex = props => (
    <div
        style={{ background: props.background, display: "grid", gridArea: "hex" }}
    />
);

class MultiView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: this.props.fileName,
            selectedTag: "",
            selectedBox: [],
            arrayData: [],
            detailBox: '',
            boxList: this.props.boxList,
            preProcessed: this.props.preProcessed,
            postProcessed: this.props.postProcessed
        }
    }


    handleClick = (event, boxName) => {
        event.stopPropagation();
        console.log(boxName, this.state.boxList.get(boxName).values);
        this.setState({
            detailBox: '',
            arrayData: [],
            selectedTag: boxName.box,
            selectedBox: this.state.boxList.get(boxName).values
        });
    };

    arraySelected = (event, boxName, arrayTag) => {
        console.log(`${boxName.name}->${arrayTag} selected, contains array entries`);
        const arrayData = boxName.display;
        this.setState({ arrayData, detailBox: boxName.name });
    }

    render() {
        return (
            <div
                style={{
                    display: "grid",
                    gridTemplateAreas: `'tree data array'
                                        'tree hex hex'
                                        'tree hex hex'`,
                    gridTemplateRows: "25em 25em",
                    gridTemplateColumns: "1fr 3fr 3fr"
                }}
            >
                <TagTree
                    background="lightgrey"
                    tags={this.state.boxList}
                    handleClick={this.handleClick}
                    fileName={this.state.fileName}
                    selected={this.state.selectedTag}
                />
                <Data
                    background="white"
                    tagData={this.state.selectedBox}
                    tagName={this.state.selectedTag}
                    arraySelected={this.arraySelected}
                />
                <SubArray
                    background="white"
                    subArray={this.state.arrayData}
                    entryName={this.state.detailBox}
                />
                <Hex background="green" />
            </div>
        );
    }
}

export default MultiView;
