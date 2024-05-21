import { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import PackingList from './PackingList';
import Stats from './Stats';

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
			<Stats itemsArray={itemsArray} />
		</div>
	);
}
