import React from 'react';
import './App.css';
import Catalogo from './Components/Catalogo/Catalogo.jsx';
import NavBar from './Components/NavBar/NavBar.jsx';
import Home from './Components/Home/Home.jsx';
import Producto from './Components/Producto/Producto.jsx';
import FormularioProducto from './Components/FormularioProducto/ProductForm.jsx';
import FormularioCategoria from './Components/FormularioCategoria/FormularioCategoria.jsx';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
	return (
		<div>
			<Router>
				<Route path="/" render={() => <NavBar onSearch={Robot => alert(Robot)} />} />
				<Route exact path="/" component={Home} />
				<Route exact path="/" component={Catalogo} />
				<Route exact path="/categories/:categoria" component={Catalogo} />
				<Route exact path="/product_form" component={FormularioProducto} />
				<Route exact path="/category_form" component={FormularioCategoria} />
				<Route exact path="/producto/:id" component={Producto} />
			</Router>
		</div>
	);
}

export default App;
