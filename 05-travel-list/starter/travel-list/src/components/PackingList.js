import { useState } from 'react';
import ListItem from './ListItem';

export default function PackingList(props) {
	const { itemsArray, setItemsArray } = props;
	const [sortBy, setSortBy] = useState('input');

	const handleSort = (event) => {
		setSortBy(event.target.value);
	};

	const sortedItemsArray = (sortValue) => {
		if (sortValue === 'input')
			return itemsArray.toSorted((a, b) =>
				Number(a.id) > Number(b.id) ? 1 : -1
			);

		if (sortValue === 'description')
			return itemsArray.toSorted((a, b) =>
				a.description.length > b.description.length ? 1 : -1
			);

		if (sortValue === 'packed')
			return itemsArray.toSorted((a, b) =>
				Number(a.packed) > Number(b.packed) ? -1 : 1
			);
	};

	const handleClearList = () => {
		if (window.confirm('Clear the List?')) setItemsArray([]);
	};

	return (
		<div className='list'>
			<ul>
				{sortedItemsArray(sortBy).map((itemObject) => (
					<ListItem
						itemObject={itemObject}
						setItemsArray={setItemsArray}
						key={itemObject.id}
					/>
				))}
			</ul>

			<div className='actions'>
				<select
					onChange={handleSort}
					value={sortBy}
				>
					<option value='input'>Sort by input order</option>
					<option value='description'>Sort by description</option>
					<option value='packed'>Sort by packed status</option>
				</select>
				<button onClick={handleClearList}>Clear List</button>
			</div>
		</div>
	);
}
