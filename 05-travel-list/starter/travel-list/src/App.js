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
	return <div className='list'>LIST</div>;
}

function Stats(props) {
	return (
		<footer className='stats'>
			<em>💼 You have X items on your list, and you already packed X (X%)</em>
		</footer>
	);
}
