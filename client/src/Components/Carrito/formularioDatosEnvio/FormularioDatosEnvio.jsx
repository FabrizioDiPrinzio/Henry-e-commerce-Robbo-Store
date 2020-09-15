import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {allActions} from '../../../Redux/Actions/actions.js';
import 'bootstrap/dist/css/bootstrap.css';
import './FormularioDatosEnvio.css';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;

export default function FormularioDatosEnvio() {
	const currentCart = useSelector(state => state.cart.currentCart);
	const userId = useSelector(state => state.user.id);
	const dispatch = useDispatch();

	const [inputValues, setInputValues] = useState({
		recipient_name: '',
		recipient_lastname: '',
		country: '',
		city: '',
		address: '',
		postal_code: 0,
		phone_number: 0,
		shipping_type: ''
	});

	useEffect(
		() => {
			setInputValues({
				recipient_name: '',
				recipient_lastname: '',
				country: '',
				city: '',
				address: '',
				postal_code: '',
				phone_number: '',
				shipping_type: ''
			});
		},
		[currentCart.id]
	);

	const handleInputChange = event => {
		setInputValues({...inputValues, [event.target.name]: event.target.value});
	};

	const handleSend = event => {
		event.preventDefault();

		const createdOrder = {...inputValues, status: 'creada'};

		axios
			.put(`${urlBack}/orders/${currentCart.id}`, createdOrder)
			.then(() => {
				alert('Se realizaron los cambios');
			})
			.then(() => dispatch(allActions.cartActions.postUserCart(userId)))
			.catch(err => alert(err.response.data));
	};

	return (
		<div className="productFormAdmin overAll">
			<div className="productTableTitleContainer">
				<div className="productTableTitle">
					<form className="FormEnvio">
						<h3>Formulario de Envio</h3>

						<div className="lineaformularioenvio">
							<span htmlFor="Nombre" className="">
								Nombre:
							</span>
							<input
								className="product"
								type="text"
								name="recipient_name"
								value={inputValues.recipient_name}
								placeholder="Nombre"
								onChange={handleInputChange}
							/>
						</div>

						<div className="lineaformularioenvio">
							<span htmlFor="Apellido" className="">
								Apellido:
							</span>
							<input
								className="product"
								type="text"
								name="recipient_lastname"
								value={inputValues.recipient_lastname}
								placeholder="Apellido"
								onChange={handleInputChange}
							/>
						</div>

						<div className="lineaformularioenvio">
							<span htmlFor="Pais" className="">
								Pais:
							</span>
							<input
								className="product"
								type="text"
								name="country"
								value={inputValues.country}
								placeholder="Pais"
								onChange={handleInputChange}
							/>
						</div>

						<div className="lineaformularioenvio">
							<span htmlFor="Ciudad" className="">
								Ciudad:
							</span>
							<input
								className="product"
								type="text"
								name="city"
								value={inputValues.city}
								placeholder="Ciudad"
								onChange={handleInputChange}
							/>
						</div>

						<div className="lineaformularioenvio">
							<span htmlFor="Direccion" className="">
								Dirección:
							</span>
							<input
								className="product"
								type="text"
								name="address"
								value={inputValues.address}
								placeholder="Dirección"
								onChange={handleInputChange}
							/>
						</div>

						<div className="lineaformularioenvio">
							<span htmlFor="CodigoPostal" className="">
								Código Postal:
							</span>
							<input
								className="product"
								type="text"
								name="postal_code"
								value={inputValues.postal_code}
								placeholder="Código Postal"
								onChange={handleInputChange}
							/>
						</div>

						<div className="lineaformularioenvio">
							<span htmlFor="Telefono" className="">
								Telefono:
							</span>
							<input
								className="product"
								type="text"
								name="phone_number"
								value={inputValues.phone_number}
								placeholder="Telefono"
								onChange={handleInputChange}
							/>
						</div>

						<div className="lineaformularioenvio">
							<span htmlFor="TipodeEnvio" className="">
								Tipo de Envio:
							</span>
							<input
								className="product"
								type="text"
								name="shipping_type"
								placeholder="Tipo de Envio"
								value={inputValues.shipping_type}
								onChange={handleInputChange}
							/>
						</div>

						<div className="formActionContainer">
							<button type="submit" className="SendBtn" value="Edit" onClick={handleSend}>
								Aceptar
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
