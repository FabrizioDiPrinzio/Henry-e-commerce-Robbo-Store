import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {allActions} from '../../Redux/Actions/actions.js';
import {Link} from 'react-router-dom';
import './Carrito.css';
import ProductCard from '../Product Card/ProductCard.jsx';
import FormularioDatosEnvio from './formularioDatosEnvio/FormularioDatosEnvio.jsx';

export default function Carrito() {
	const productsInCart = useSelector(state => state.cart.currentCart.products);
	const cartId = useSelector(state => state.cart.currentCart.id);
	const orderlines = useSelector(state => state.cart.currentCart.orderlines);
	const dispatch = useDispatch();
	const [formularioState, setFormulario] = useState({visibility : false})

	const total =
		orderlines &&
		orderlines.length > 0 &&
		orderlines.reduce((previous, current) => ({price: previous.price + current.price}));

	useEffect(
		() => {
			dispatch(allActions.cartActions.getUserCart());
		},
		[cartId]
	);

	return (
		<div className="containerCarrito">
		{ formularioState.visibility  && <button className="cerrarForm" onClick={() => setFormulario(formularioState.visibility=false)}>X</button>  }
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

				<button className="btnComprar" onClick={()=> setFormulario({...formularioState, visibility : formularioState.visibility ? false : true})   
				}>Comprar</button>
			
	

			<div>
				{ formularioState.visibility && <FormularioDatosEnvio />}
			</div>
		</div>
	);
}
