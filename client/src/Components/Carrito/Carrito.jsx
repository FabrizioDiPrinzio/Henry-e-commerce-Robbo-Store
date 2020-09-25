import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import ProductCard from '../Product Card/ProductCard.jsx';
import FormularioDatosEnvio from './formularioDatosEnvio/FormularioDatosEnvio.jsx';
import UserForm from '../FormularioUsuario/UserForm';
import Modal from 'react-bootstrap/Modal';
import './Carrito.css';
// Fin de imports

export default function Carrito() {
	// Redux
	const user = useSelector(state => state.user);
	const productsInCart = useSelector(state => state.cart.currentCart.products);
	const orderlines = useSelector(state => state.cart.currentCart.orderlines);

	// React Hooks
	const [formularioState, setFormulario] = useState({visibility: false});
	const [showModal, setShowModal] = useState(false);

	// ------------- Funcionalidad -----------

	const hideModals = () => setShowModal(!showModal);

	const total =
		orderlines &&
		orderlines.length > 0 &&
		orderlines.reduce((previous, current) => ({price: previous.price + current.price}));

	const handleSend = () => {
		if (user.rol === 'Guest') return setShowModal(true);
		else
			setFormulario({...formularioState, visibility: formularioState.visibility ? false : true});
	};

	return (
		<div className="containerCarrito">
			{formularioState.visibility && (
				<button
					className="cerrarForm"
					onClick={() => setFormulario((formularioState.visibility = false))}
				>
					<span>X</span>
				</button>
			)}
			<ul className="list">
				{productsInCart &&
					productsInCart.map(bot => (
						<li className="listItem" key={bot.id}>
							<ProductCard robot={bot} />
						</li>
					))}
			</ul>

			<div className="datostotales">
				<h3>Envio:</h3>
				<h2>Total: U$S {total ? total.price : 0}</h2>
			</div>

			<button className="btnComprar" onClick={handleSend}>
				Comprar
			</button>

			<Modal show={showModal} onHide={hideModals}>
				<UserForm />
			</Modal>

			<div>{formularioState.visibility && <FormularioDatosEnvio />}</div>
		</div>
	);
}
