import { useState } from 'react';

export default function App(props) {
	const [itemsArray, setItemsArray] = useState([]);

	return (
		<div className='app'>
			<Logo />
			<Form setItemsArray={setItemsArray} />
			<PackingList
				itemsArray={itemsArray}
				setItemsArray={setItemsArray}
			/>
			<Stats />
		</div>
	);
}

function Logo(props) {
	return <h1>🌴 Far Away 💼</h1>;
}

function Form(props) {
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

function PackingList(props) {
	const { itemsArray, setItemsArray } = props;

	return (
		<div className='list'>
			<ul>
				{itemsArray.map((itemObject) => (
					<ListItem
						itemObject={itemObject}
						setItemsArray={setItemsArray}
						key={itemObject.id}
					/>
				))}
			</ul>
		</div>
	);
}

function ListItem(props) {
	const { itemObject, setItemsArray } = props;

	const handleDeleteItem = (id) => {
		return () =>
			setItemsArray((currentItemsArray) =>
				currentItemsArray.filter((itemObject) =>
					itemObject.id === id ? false : true
				)
			);
	};

	return (
		<li>
			<span style={itemObject.packed ? { textDecoration: 'line-through' } : {}}>
				{itemObject.quantity} {itemObject.description}
			</span>
			<button onClick={handleDeleteItem(itemObject.id)}>❌</button>
		</li>
	);
}

function Stats(props) {
	return (
		<footer className='stats'>
			<em>💼 You have X items on your list, and you already packed X (X%)</em>
		</footer>
	);
}
