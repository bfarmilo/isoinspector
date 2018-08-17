import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
	<header class={style.header}>
		<h1>ISO Inspector</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Enter Data</Link>
			<Link activeClassName={style.active} href="/profile">Me</Link>
			<Link activeClassName={style.active} href="/profile/bill">Bill</Link>
		</nav>
	</header>
);

export default Header;
