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
				<input type="file" id="getFile" onChange={e => props.handleFiles(e, 'segment')} />
				<label for="getFile"><a>Select Media File</a></label>
				<input type="file" disabled={props.mode !== 'MP2T'} id="getPlayList" onChange={e => props.handleFiles(e, 'playlist')} />
				<label for="getPlayList"><a style={props.mode !== 'MP2T' ? { color: 'grey' } : {}}>Select Playlist File</a></label>
				<input type="file" disabled={props.mode !== 'MP2T'} id="getKey" onChange={e => props.handleFiles(e, 'key')} />
				<label for="getKey"><a style={props.mode !== 'MP2T' ? { color: 'grey' } : {}}>Select Key File</a></label>
				<a onClick={props.toggleHex}>{props.showHex ? 'Hide Hex Input' : 'Paste Hex Values'}</a>
				<a onClick={props.togglePreview}>{props.showVideo ? 'Hide Preview' : 'Show Preview'}</a>
				{/*<a onClick={props.changeViewMode}>{props.viewMode ? 'Show Tree View' : 'Show Multiview'}</a>*/}
			</nav>
		</header>
	)
};

export default Header;
