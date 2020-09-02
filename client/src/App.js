import React from 'react';
import './App.css';
import ProductCard from './Components/Product Card/ProductCard.jsx';
import Catalogo from './Components/Catalogo/Catalogo.jsx';
import NavBar from './Components/NavBar/NavBar.jsx';
import Home from './Components/Home/Home.jsx';
import Producto from './Components/Producto/Producto.jsx';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
	function onFilter(productId) {
		const producto = robots.filter(r => r.id === parseInt(productId));
		if (producto.length > 0) return producto[0];
		else return null;
	}

	return (
		<div>
			<Router>
				<Route path="/" render={() => <NavBar onSearch={Robot => alert(Robot)} />} />
				<Route exact path="/" component={Home} />
				<Route exact path="/product_card" render={() => <ProductCard robot={robots[0]} />} />
				<Route exact path="/catalogo" render={() => <Catalogo robots={robots} />} />
				<Route exact path="/productotest" render={() => <Producto robot={robots[0]} />} />
				<Route
					exact
					path="/producto/:id"
					render={({match}) => <Producto robot={onFilter(match.params.id)} />}
				/>
			</Router>
		</div>
	);
}

const robots = [
	{
		product: 'R.O.B. el robot',
		image: 'https://i.pinimg.com/236x/47/5d/09/475d09c299b6b704f684f0e9f534df47.jpg',
		descripcion: 'Un fiel robot que te ayudará a jugar a la Family!',
		id: 1,
		price: 99,
		stock: 10
	},
	{
		product: 'Bender',
		image:
			'https://i2.wp.com/eneagra1-cp178.wordpresstemporal.com/wp-content/uploads/2014/02/bender.jpg?resize=229%2C300',
		descripcion: 'Un robot alcohólico diseñado para doblar vigas',
		id: 2,
		price: 3000,
		stock: 0
	},
	{
		product: 'Beemo',
		image:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR2dQHmYo0LEJDkxn-f4OPFYQsPocqmPzjv4g&usqp=CAU',
		descripcion: 'Una consola de videojuegos viviente!',
		id: 3,
		price: 50,
		stock: 3
	}
];

export default App;
