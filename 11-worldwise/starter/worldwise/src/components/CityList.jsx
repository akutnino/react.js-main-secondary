import styles from './../styles/CityList.module.scss';
import PropTypes from 'prop-types';
import CityItem from './CityItem';

CityList.propTypes = {
	citiesArray: PropTypes.array
};

export default function CityList(props) {
	const { citiesArray } = props;

	return (
		<ul className={styles.cityList}>
			{citiesArray.map((city) => (
				<CityItem
					city={city}
					key={city.id}
				/>
			))}
		</ul>
	);
}
