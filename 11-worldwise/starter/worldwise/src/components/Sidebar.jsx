import styles from './../styles/Sidebar.module.scss';
import AppNav from './AppNav';
import Logo from './Logo';

export default function Sidebar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />

			<p>List of Cities</p>

			<footer className={styles.footer}>
				&copy; Copyright {new Date().getFullYear()} by WorldWide Inc.
			</footer>
		</div>
	);
}
