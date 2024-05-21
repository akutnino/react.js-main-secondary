import { useState } from 'react';

export default function Form(props) {
	const { setItemsArray } = props;
	const [itemQuantity, setItemQuantity] = useState(1);
	const [itemDescription, setItemDescription] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		if (itemDescription === '') return;

		const newItemObject = {
			id: Date.now(),
			description: itemDescription,
			quantity: itemQuantity,
			packed: false
		};

		setItemsArray((currentItemsArray) => [...currentItemsArray, newItemObject]);
		setItemQuantity(1);
		setItemDescription('');
	};

	const handleSelectedOption = (event) => {
		setItemQuantity(Number(event.target.value));
	};

	const handleDescriptionInput = (event) => {
		setItemDescription(event.target.value);
	};

	return (
		<form
			className='add-form'
			onSubmit={handleSubmit}
		>
			<h3>What do you need for your 😍 trip?</h3>
			<select
				onChange={handleSelectedOption}
				value={itemQuantity}
			>
				{Array.from(Array(10), (val, index) => index + 1).map((value) => (
					<option
						value={value}
						key={value}
					>
						{value}
					</option>
				))}
			</select>
			<input
				type='text'
				placeholder='Item...'
				onChange={handleDescriptionInput}
				value={itemDescription}
			/>
			<button>Add</button>
		</form>
	);
}
