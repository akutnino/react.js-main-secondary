export default function ListItem(props) {
	const { itemObject, setItemsArray } = props;

	const handleDeleteItem = (id) => {
		return () =>
			setItemsArray((currentItemsArray) =>
				currentItemsArray.filter((itemObject) =>
					itemObject.id === id ? false : true
				)
			);
	};

	const handleToggleItem = (id) => {
		return () =>
			setItemsArray((currentItemsArray) =>
				currentItemsArray.map((itemObject) =>
					itemObject.id === id
						? { ...itemObject, packed: !itemObject.packed }
						: itemObject
				)
			);
	};

	return (
		<li>
			<input
				type='checkbox'
				value={itemObject.packed}
				onChange={handleToggleItem(itemObject.id)}
			/>
			<span style={itemObject.packed ? { textDecoration: 'line-through' } : {}}>
				{itemObject.quantity} {itemObject.description}
			</span>
			<button onClick={handleDeleteItem(itemObject.id)}>❌</button>
		</li>
	);
}
