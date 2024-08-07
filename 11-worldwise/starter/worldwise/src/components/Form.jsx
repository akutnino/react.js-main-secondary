// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from 'react';

import styles from '../styles/Form.module.scss';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

function Form() {
	const navigate = useNavigate();
	const [cityName, setCityName] = useState('');
	const [country, setCountry] = useState('');
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState('');

	const handleCityInput = (event) => {
		setCityName(event.target.value);
	};

	const handleDateInput = (event) => {
		setDate(event.target.value);
	};

	const handleNoteInput = (event) => {
		setNotes(event.target.value);
	};

	const handleAdd = () => {};

	const handleBack = (event) => {
		event.preventDefault();
		navigate(-1);
	};

	return (
		<form className={styles.form}>
			<div className={styles.row}>
				<label htmlFor='cityName'>City name</label>
				<input
					id='cityName'
					onChange={handleCityInput}
					value={cityName}
				/>
				{/* <span className={styles.flag}>{emoji}</span> */}
			</div>

			<div className={styles.row}>
				<label htmlFor='date'>When did you go to {cityName}?</label>
				<input
					id='date'
					onChange={handleDateInput}
					value={date}
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor='notes'>Notes about your trip to {cityName}</label>
				<textarea
					id='notes'
					onChange={handleNoteInput}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button
					onClick={handleAdd}
					type={'primary'}
				>
					Add
				</Button>
				<Button
					onClick={handleBack}
					type={'back'}
				>
					&larr; Back
				</Button>
			</div>
		</form>
	);
}

export default Form;
