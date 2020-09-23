import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {allActions} from './Redux/Actions/actions.js';
import axios from 'axios';

import $ from 'jquery'; // Bootstrap usa jquery
import Popper from 'popper.js'; // Bootstrap usa Poppr
import 'bootstrap/dist/js/bootstrap.bundle.min'; // este es el boundle que me funcionó para importar bootstrap completo

import './App.css';
import Catalogo from './Components/Catalogo/Catalogo.jsx';
import NavBar from './Components/NavBar/NavBar.jsx';
import Home from './Components/Home/Home.jsx';
import Producto from './Components/Producto/Producto.jsx';
import FormularioProducto from './Components/FormularioProducto/ProductForm.jsx';
import FormularioCategoria from './Components/FormularioCategoria/FormularioCategoria.jsx';
import AdminControlPanel from './Components/AdminControlPanel/AdminControlPanel.jsx';
import UserProfile from './Components/UserProfile/UserProfile';
import ResetPasswordForm from './Components/FormularioUsuario/ResetPasswordForm/ResetPasswordForm';
import NotFound from './Components/NotFound/NotFound';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Carrito from './Components/Carrito/Carrito.jsx';
import Purchase_order from './Components/Purchase_order/Purchase_order.jsx';

// =========== FIN DE IMPORTS ============

// ======== Inicializando el uso de algunas propiedades de Bootstrap que usan Jquery ======= //

// inicia el uso de los popovers
$(function() {
	$('[data-toggle="popover"]').popover();
});

// inicia el uso de los tooltip
$(function() {
	$('[data-toggle="tooltip"]').tooltip();
});

// inicia los collapse
$('.collapse').collapse();

// ================================== Fin de jquery ======================================= //

const urlBack = process.env.REACT_APP_API_URL;

function App() {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		// PLACEHOLDER ONLY, creates admin. Mail: 'admin@admin.com', Password: 'admin'
		axios
			.post(`${urlBack}/createAdmin`)
			.then(response => console.log(response.data))
			.catch(error => console.log(error.response.data));

		// Permanent
		dispatch(allActions.categoryActions.getAllCategories());
		dispatch(allActions.productActions.getAllProducts(1));
	}, []);

	// Loguea al usuario con las cookies.
	useEffect(() => {
		axios
			.get(`${urlBack}/auth/me`)
			.then(user => {
				dispatch(allActions.userActions.login(user.data));
				dispatch(allActions.cartActions.getUserCart(user.data.id));
			})
			.catch(error => console.log(error)); // Se queda con el default de Guest
	}, []);

	return (
		<div>
			<Router>
				<Route path="/" component={NavBar} />
				<Route exact path="/" component={Home} />
				<Switch>
					<Route exact path="/" component={Catalogo} />
					<Route exact path="/categories/:categoria" component={Catalogo} />
					<Route exact path="/carrito" component={Carrito} />
					<Route path="/search" component={Catalogo} />
					<Route exact path="/producto/:id" component={Producto} />
					<Route exact path="/user/:id" component={UserProfile} />
					<Route exact path="/purchase_order/:purchaseOrderId" component={Purchase_order} />
					<Route exact path="/reset/:token" component={ResetPasswordForm} />
					<Route
						exact
						path="/product_form"
						component={user.rol === 'Admin' ? FormularioProducto : NotFound}
					/>
					<Route
						exact
						path="/category_form"
						component={user.rol === 'Admin' ? FormularioCategoria : NotFound}
					/>
					<Route
						exact
						path="/admin"
						component={user.rol === 'Admin' ? AdminControlPanel : NotFound}
					/>
					<NotFound />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
