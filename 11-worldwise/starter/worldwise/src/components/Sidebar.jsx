import { Outlet } from 'react-router-dom';
import styles from './../styles/Sidebar.module.scss';
import Logo from './Logo';
import AppNav from './AppNav';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

Sidebar.propTypes = {
	isLoading: PropTypes.bool
};

export default function Sidebar(props) {
	const { isLoading } = props;

	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />

			{isLoading ? <Spinner /> : <Outlet />}

			<footer className={styles.footer}>
				&copy; Copyright {new Date().getFullYear()} by WorldWide Inc.
			</footer>
		</div>
	);
}
