import styles from './../styles/CountryList.module.scss';
import PropTypes from 'prop-types';

import CountryItem from './CountryItem';

CountryList.propTypes = {
	citiesArray: PropTypes.array
};

export default function CountryList(props) {
	const { citiesArray } = props;

	const countriesArray = citiesArray.reduce((outputArray, currentObject) => {
		const accumulator = outputArray.map((object) => Object.entries(object).flat()).flat();

		const country = Object.entries(currentObject)
			.filter((entriesArray) => entriesArray[0] === 'country')
			.map((entriesArray) => entriesArray[1]);

		if (!accumulator.includes(country[0])) outputArray.push(currentObject);
		return outputArray;
	}, []);

	return (
		<ul className={styles.countryList}>
			{countriesArray.map((country) => (
				<CountryItem
					country={country}
					key={country.id}
				/>
			))}
		</ul>
	);
}
