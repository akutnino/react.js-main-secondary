import PropTypes from 'prop-types';
import styles from './../styles/CityItem.module.scss';

const flagcodeEmoji = (flagcode) => {
	const firstCharFlagUnicode = 127462;
	const adjustedFlagUnicode = firstCharFlagUnicode - 'A'.codePointAt();

	const stringArray = [...flagcode]
		.map((char) => String.fromCodePoint(char.codePointAt() - adjustedFlagUnicode))
		.join('')
		.toLowerCase();

	return (
		<img
			src={`https://flagcdn.com/24x18/${stringArray}.png`}
			alt='flag'
		/>
	);
};

const formatDate = (date) =>
	new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	}).format(new Date(date));

CityItem.propTypes = {
	city: PropTypes.object
};

export default function CityItem(props) {
	const { city } = props;
	const { cityName, emoji, date } = city;

	return (
		<li className={styles.cityItem}>
			<span className={styles.emoji}>{flagcodeEmoji(emoji)}</span>
			<h3 className={styles.name}>{cityName}</h3>
			<time className={styles.data}>{formatDate(date)}</time>
			<button
				className={styles.deleteBtn}
				type='button'
			>
				&times;
			</button>
		</li>
	);
}
