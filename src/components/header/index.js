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
			<h1>{names[props.mode]} Inspector</h1>
			<nav>
				<a onClick={props.toggleHex}>{props.showHex ? 'Load Local File' : 'Paste Hex Values'}</a>
				<a onClick={props.togglePreview}>{props.showVideo ? 'Hide Preview' : 'Show Preview'}</a>
			</nav>
		</header>
	)
};

export default Header;
