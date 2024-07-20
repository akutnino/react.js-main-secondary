import { CitiesContext } from '../context/CitiesContext';
import PropTypes from 'prop-types';

import Map from '../components/Map';
import Sidebar from '../components/Sidebar';
import styles from './../styles/AppLayout.module.scss';
import { useContext } from 'react';

AppLayout.propTypes = {
	isLoading: PropTypes.bool
};

export default function AppLayout() {
	const { isLoading } = useContext(CitiesContext);

	return (
		<div className={styles.app}>
			<Sidebar isLoading={isLoading} />
			<Map />
		</div>
	);
}
