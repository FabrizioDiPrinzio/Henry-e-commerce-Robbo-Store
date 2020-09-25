import React, {useState, useEffect} from 'react';
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
import OAuthSuccess from './Components/OAuth/OAuthSuccess';
import Welcome from './Components/OAuth/Welcome';
import LoadingScreen from './Components/Loading/LoadingScreen';
// =========== FIN DE IMPORTS ============

const urlBack = process.env.REACT_APP_API_URL;

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

export default function App() {
	// Redux
	const user = useSelector(state => state.user);
	const orderlines = useSelector(state => state.cart.currentCart.orderlines);
	const dispatch = useDispatch();

	// React Hooks
	const [loading, setLoading] = useState(true);

	// --------------- Functionality ------------------------

	useEffect(() => {
		// PLACEHOLDER ONLY, creates admin. Mail: 'admin@admin.com', Password: 'admin'
		axios
			.post(`${urlBack}/createAdmin`)
			.then(response => console.log(response.data))
			.catch(error => console.log(error.response ? error.response.data : error));

		// Permanent
		dispatch(allActions.categoryActions.getAllCategories());
	}, []);

	// Loguea al usuario con las cookies y le añade el carrito de guest
	useEffect(
		() => {
			const addGuestCart = async () => {
				try {
					const usuario = await axios.get(`${urlBack}/auth/me`);

					for await (const order of orderlines) {
						axios
							.put(`${urlBack}/user/${usuario.data.id}/cart`, order)
							.catch(error => console.log(error));
					}

					dispatch(allActions.userActions.login(usuario.data));
					dispatch(allActions.cartActions.getUserCart(usuario.data.id));
					setLoading(false);
				} catch (error) {
					setLoading(false);
				}
			};

			addGuestCart();
		},
		[user.id]
	);

	return (
		<div>
			<Router>
				<Route path="/" render={() => <LoadingScreen loading={loading} />} />
				{!loading && (
					<div>
						<Route path="/" component={NavBar} />
						<Route exact path="/" component={Home} />
						<Switch>
							<Route exact path="/" component={Catalogo} />
							<Route exact path="/welcome" component={Welcome} />
							<Route exact path="/categories/:categoria" component={Catalogo} />
							<Route exact path="/search" component={Catalogo} />
							<Route exact path="/carrito" component={Carrito} />
							<Route exact path="/oauth/success" component={OAuthSuccess} />
							<Route exact path="/producto/:id" component={Producto} />
							<Route exact path="/user/:id" component={UserProfile} />
							<Route
								exact
								path="/purchase_order/:purchaseOrderId"
								component={Purchase_order}
							/>
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
					</div>
				)}
			</Router>
		</div>
	);
}
