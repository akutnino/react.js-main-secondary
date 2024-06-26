import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const pizzaData = [
	{
		name: 'Focaccia',
		ingredients: 'Bread with italian olive oil and rosemary',
		price: 6,
		photoName: 'pizzas/focaccia.jpg',
		soldOut: false
	},
	{
		name: 'Pizza Margherita',
		ingredients: 'Tomato and mozarella',
		price: 10,
		photoName: 'pizzas/margherita.jpg',
		soldOut: false
	},
	{
		name: 'Pizza Spinaci',
		ingredients: 'Tomato, mozarella, spinach, and ricotta cheese',
		price: 12,
		photoName: 'pizzas/spinaci.jpg',
		soldOut: false
	},
	{
		name: 'Pizza Funghi',
		ingredients: 'Tomato, mozarella, mushrooms, and onion',
		price: 12,
		photoName: 'pizzas/funghi.jpg',
		soldOut: false
	},
	{
		name: 'Pizza Salamino',
		ingredients: 'Tomato, mozarella, and pepperoni',
		price: 15,
		photoName: 'pizzas/salamino.jpg',
		soldOut: true
	},
	{
		name: 'Pizza Prosciutto',
		ingredients: 'Tomato, mozarella, ham, aragula, and burrata cheese',
		price: 18,
		photoName: 'pizzas/prosciutto.jpg',
		soldOut: false
	}
];

function App(props) {
	return (
		<div className='container'>
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}

function Header(props) {
	return (
		<header className='header'>
			<h1>Fast React Pizza Co.</h1>
		</header>
	);
}

function Menu(props) {
	const pizzas = pizzaData;
	const isPizzasInStock = pizzas.length > 0;

	return (
		<main className='menu'>
			<h2>Our Menu</h2>

			{isPizzasInStock ? (
				<React.Fragment>
					<p>
						Authentic Italian cuisine. 6 creative dishes to choose from. All
						from our stone oven, all organic, all delicious.
					</p>

					<ul className='pizzas'>
						{pizzas.map((pizzaObject, index) => (
							<Pizza
								pizzaObject={pizzaObject}
								key={index}
							/>
						))}
					</ul>
				</React.Fragment>
			) : (
				<p>We're still working on our menu. Please come back later.</p>
			)}
		</main>
	);
}

function Pizza(props) {
	const { pizzaObject } = props;

	return (
		<li className={`pizza ${pizzaObject.soldOut ? 'sold-out' : ''}`}>
			<img
				src={pizzaObject.photoName}
				alt={pizzaObject.name}
			/>
			<div>
				<h3>{pizzaObject.name}</h3>
				<p>{pizzaObject.ingredients}</p>
				<span>{pizzaObject.soldOut ? 'SOLD OUT' : pizzaObject.price}</span>
			</div>
		</li>
	);
}

function Footer(props) {
	const hour = new Date().getHours();
	const openHour = 12;
	const closeHour = 22;
	const isOpen = hour >= openHour && hour <= closeHour;
	console.log(isOpen);

	return (
		<footer className='footer'>
			{isOpen ? (
				<Order closeHour={closeHour} />
			) : (
				<p>
					We'd be happy to welcome you between {openHour}:00 to {closeHour}:00.
				</p>
			)}
		</footer>
	);
}

function Order(props) {
	const { closeHour } = props;

	return (
		<div className='order'>
			<p>We're open until {closeHour}:00. Come visit us or order online.</p>
			<button className='btn'>Order</button>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
