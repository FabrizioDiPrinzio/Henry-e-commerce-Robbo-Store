import React from 'react';
import './App.css';
import ProductCard from './Components/Product Card/ProductCard.jsx';
import Catalogo from './Components/Catalogo/Catalogo.jsx';
import NavBar from './Components/Nav Bar/NavBar.jsx';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
	return (
		<div>
			<Router>
				<Route path="/" component={NavBar} />
				<Route
					exact
					path="/product_card"
					render={() => (
						<ProductCard
							product="R.O.B el robot"
							image="https://i.pinimg.com/236x/47/5d/09/475d09c299b6b704f684f0e9f534df47.jpg"
							price="99"
						/>
					)}
				/>
				<Route exact path="/catalogo" render={() => <Catalogo robots={robots} />} />
			</Router>
		</div>
	);
}

const robots = [
	{
		product: 'R.O.B. el robot',
		image: 'https://i.pinimg.com/236x/47/5d/09/475d09c299b6b704f684f0e9f534df47.jpg',
		id: 1,
		price: 99
	},
	{
		product: 'Bender',
		image:
			'https://i2.wp.com/eneagra1-cp178.wordpresstemporal.com/wp-content/uploads/2014/02/bender.jpg?resize=229%2C300',
		id: 2,
		price: 3000
	},
	{
		product: 'Beemo',
		image:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR2dQHmYo0LEJDkxn-f4OPFYQsPocqmPzjv4g&usqp=CAU',
		id: 3,
		price: 50
	}
];

export default App;
