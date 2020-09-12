import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {allActions} from './Redux/Actions/actions.js';
import axios from 'axios';
import './App.css';
import Catalogo from './Components/Catalogo/Catalogo.jsx';
import NavBar from './Components/NavBar/NavBar.jsx';
import Home from './Components/Home/Home.jsx';
import Producto from './Components/Producto/Producto.jsx';
import FormularioProducto from './Components/FormularioProducto/ProductForm.jsx';
import FormularioCategoria from './Components/FormularioCategoria/FormularioCategoria.jsx';
import UserForm from './Components/FormularioUsuario/UserForm.jsx';
import AdminControlPanel from './Components/AdminControlPanel/AdminControlPanel.jsx';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Carrito from './Components/Carrito/Carrito.jsx';
// =========== FIN DE IMPORTS ============

const urlBack = process.env.REACT_APP_API_URL;

function App() {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		// TEMPORARY!! Create a new user on startup to make testing things less tedious
		axios
			.post(`${urlBack}/user/signup`, {
				name: 'Dummy User',
				rol: 'Client',
				email: 'dummy@account.com',
				password: 'DummyPassword123'
			})
			.then(() => {
				console.log('Usuario creado');
			})
			.catch(error => console.log(error.message));

		// Permanent
		dispatch(allActions.categoryActions.getAllCategories());
		dispatch(allActions.productActions.getAllProducts());
	}, []);

	useEffect(
		() => {
			dispatch(allActions.cartActions.getUserCart(user.id));
		},
		[user]
	);

	return (
		<div>
			<Router>
				<Route path="/" component={NavBar} />
				<Route exact path="/" component={Home} />
				<Route exact path="/" component={Catalogo} />
				<Route exact path="/categories/:categoria" component={Catalogo} />
				<Route exact path="/carrito" component={Carrito} />
				<Route path="/search" component={Catalogo} />
				<Route exact path="/product_form" component={FormularioProducto} />
				<Route exact path="/category_form" component={FormularioCategoria} />
				<Route exact path="/producto/:id" component={Producto} />
				<Route exact path="/signup" component={UserForm} />
				<Route exact path="/admin" component={AdminControlPanel} />
			</Router>
		</div>
	);
}

export default App;
