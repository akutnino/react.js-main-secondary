const initialItems = [
	{
		id: 1,
		description: 'Passports',
		quantity: 2,
		packed: false
	},
	{
		id: 2,
		description: 'Socks',
		quantity: 12,
		packed: false
	},
	{
		id: 3,
		description: 'Phone',
		quantity: 1,
		packed: true
	}
];

export default function App(props) {
	return (
		<div className='app'>
			<Logo />
			<Form />
			<PackingList />
			<Stats />
		</div>
	);
}

function Logo(props) {
	return <h1>🌴 Far Away 💼</h1>;
}

function Form(props) {
	return (
		<div className='add-form'>
			<h3>What do you need for your 😍 trip?</h3>
		</div>
	);
}

function PackingList(props) {
	return (
		<div className='list'>
			<ul>
				{initialItems.map((itemObject) => (
					<ListItem
						itemObject={itemObject}
						key={itemObject.id}
					/>
				))}
			</ul>
		</div>
	);
}

function ListItem(props) {
	const { itemObject } = props;

	return (
		<li>
			<span style={itemObject.packed ? { textDecoration: 'line-through' } : {}}>
				{itemObject.quantity} {itemObject.description}
			</span>
			<button>❌</button>
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