import styles from './../styles/CityList.module.scss';
import PropTypes from 'prop-types';

import CityItem from './CityItem';
import Message from './Message';

CityList.propTypes = {
	citiesArray: PropTypes.array
};

export default function CityList(props) {
	const { citiesArray } = props;
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
