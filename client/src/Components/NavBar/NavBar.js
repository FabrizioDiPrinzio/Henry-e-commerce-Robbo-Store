import React from 'react';
import {Link} from 'react-router-dom';
import './navBar.css';

export default function NavBar(props) {
	return (
		<div>
			<nav className="NavBar">
				<a className="Title">Robbo Store</a>
				<Link to="/">
					<button className="Home">Home</button>
				</Link>
				<button className="SignUp-LogIn">SignUp/LogIn</button>
				<button className="Cart">Cart</button>
				<Link to="/product_card">
					<button className="ProductCard">Product Card</button>
				</Link>
				<Link to="/catalogo">
					<button className="Catalogo">Catalogo</button>
				</Link>
			</nav>
			<div className="SearchBar">
				<button className="Categorias">(Categorías deplegable?)</button>
				<input className="SearchBar" type="text" placeholder="Buscar..." />
				<button onClick={() => props.onSearch('Buscando robot...')}>Buscar</button>
			</div>
		</div>
	);
}
