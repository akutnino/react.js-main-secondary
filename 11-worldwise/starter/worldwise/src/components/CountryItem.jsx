import styles from '../styles/CountryItem.module.scss';
import PropTypes from 'prop-types';

const flagcodeEmoji = (flagcode) => {
	const firstFlagUnicodeNumber = 127462;
	const adjustedFlagUnicodeNumber = firstFlagUnicodeNumber - 'A'.codePointAt();
	const flagCode = [...flagcode]
		.map((char) => String.fromCodePoint(char.codePointAt() - adjustedFlagUnicodeNumber))
		.join('');

	return (
		<img
			src={`https://flagsapi.com/${flagCode}/flat/64.png`}
			alt='flag'
		/>
	);
};

CountryItem.propTypes = {
	country: PropTypes.object
};

function CountryItem(props) {
	const { country } = props;

	return (
		<li className={styles.countryItem}>
			<span>{flagcodeEmoji(country.emoji)}</span>
			<span>{country.country}</span>
		</li>
	);
}

export default CountryItem;
