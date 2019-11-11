import { h } from 'preact';
import style from './style';

const Header = (props) => {
	const names = {
		webm: 'webM',
		mp4: 'ISOBMFF',
		ts: 'MPEG-2 Transport Stream'
	}
	return (
		<header class={style.header}>
			<h1>Media Inspector</h1>
			<nav>
				<input type="file" style={{ opacity: 0 }} id="getFile" onChange={props.handleFiles} />
				<label for="getFile"><a>Select Local File</a></label>
				<a onClick={props.toggleHex}>{props.showHex ? 'Hide Hex Input' : 'Paste Hex Values'}</a>
				<a onClick={props.togglePreview}>{props.showVideo ? 'Hide Preview' : 'Show Preview'}</a>
				<a onClick={props.expandAll}>{props.expanded ? 'Collapse Tree View' : 'Expand Tree View'}</a>
			</nav>
		</header>
	)
};

export default Header;
