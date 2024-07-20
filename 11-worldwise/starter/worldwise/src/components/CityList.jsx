import { CitiesContext } from '../context/CitiesContext';
import styles from './../styles/CityList.module.scss';
import PropTypes from 'prop-types';

import CityItem from './CityItem';
import Message from './Message';
import { useContext } from 'react';

CityList.propTypes = {
	citiesArray: PropTypes.array
};

export default function CityList() {
	const { citiesArray } = useContext(CitiesContext);
	const isArrayEmpty = citiesArray.length === 0;
	const emptyArrayMessage = 'Add Your First City by Clicking On A City On The Map';

	return (
		<>
			{isArrayEmpty ? (
				<Message message={emptyArrayMessage} />
			) : (
				<ul className={styles.cityList}>
					{citiesArray.map((city) => (
						<CityItem
							city={city}
							key={city.id}
						/>
					))}
				</ul>
			)}
		</>
	);
}
