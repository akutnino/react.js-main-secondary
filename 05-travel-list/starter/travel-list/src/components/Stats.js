export default function Stats(props) {
	const { itemsArray } = props;
	const totalItems = itemsArray.length;
	const totalItemsPacked = itemsArray.reduce(
		(total, itemObject) => (itemObject.packed ? (total += 1) : (total += 0)),
		0
	);
	const percentage = Number((totalItemsPacked / totalItems) * 100).toFixed(0);
	const packedItemsPercentage = percentage === 'NaN' ? 0 : Number(percentage);

	return (
		<footer className='stats'>
			{totalItems === 0 && <em>Start adding things to the list!</em>}
			{totalItems !== 0 && (
				<em>
					{packedItemsPercentage === 100
						? 'You are ready to Go!'
						: `You have ${totalItems} items on your list, and you already packed 
						${totalItemsPacked} (${packedItemsPercentage}%)`}
				</em>
			)}
		</footer>
	);
}
