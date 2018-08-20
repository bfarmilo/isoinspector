import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = (props) => {
	const names = {
		webm: 'webM',
		isobmff: 'ISOBMFF',
		m2ts: 'MPEG-2 Transport Stream'
	}
	return (
	<header class={style.header}>
		<h1>{names[props.mode]} Inspector</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Enter Data</Link>
			<Link activeClassName={style.active} href="#" onClick={props.changeMode}>Change Decode Mode</Link>
		</nav>
	</header>
)};

export default Header;
