import React, {useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import './ProductCard.css';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;
// const btnAdd = document.querySelector('.add');
// const btnRest = document.querySelector('.rest');

export default function ProductCard({robot}) {
	const userId = useSelector(state => state.user.userId);
	const userType = useSelector(state => state.user.userType);

	const [carrito, setCarrito] = useState({
		quantity: 0,
		productId: robot.id,
		name: robot.name,
		price: robot.price,
		stock: robot.stock,
		image: robot.image,
		description: robot.description
	});

	// const addEvents = () => {
	// 	btnAdd.addEventListener('click', e => handleClickAdd);
	// 	btnRest.addEventListener('click', e => handleClickRest);
	// };

	// const removeEvents = () => {
	// 	btnAdd.removeEventListener('click', e => handleClickAdd);
	// 	btnAdd.removeEventListener('click', e => handleClickRest);
	// };

	// addEvents();

	const handleClickAdd = e => {
		e.preventDefault();
		// btnAdd.style.backgroundColor = 'gray';
		// removeEvents();

		setCarrito({...carrito, quantity: ++carrito.quantity});

		axios
			.put(`${urlBack}/user/${userId}/cart`, {
				orderlineChanges: [
					{
						productId: parseInt(carrito.productId),
						price: parseInt(carrito.price),
						quantity: parseInt(carrito.quantity)
					}
				]
			})
			.then(() => {
				alert('Agregado');
				// addEvents();
				// btnAdd.style.backgroundColor = 'lightgreen';
			})
			.catch(error => console.log(error));
	};

	const handleClickRest = e => {
		e.preventDefault();
		// btnRest.style.backgroundColor = 'gray';
		// removeEvents();
		if (carrito.quantity > 0) {
			setCarrito({...carrito, quantity: --carrito.quantity});

			axios
				.put(`${urlBack}/user/${userId}/cart`, {
					orderlineChanges: [
						{
							productId: parseInt(carrito.productId),
							price: parseInt(carrito.price),
							quantity: parseInt(carrito.quantity)
						}
					]
				})
				.then(response => {
					alert('Quitado');
					// addEvents();
					// btnRest.style.backgroundColor = 'var(--razzmatazz)';
				})
				.catch(error => alert(error.message));
		}
	};

	return (
		<div className="cardContainer">
			<div className="imageContainer">
				<img className="image" src={carrito.image} alt={carrito.name} />
			</div>
			<div className="infoContainer">
				<Link to={`/producto/${carrito.id}`}>
					<div className="title">
						<h3>{carrito.name}</h3>
					</div>
				</Link>
				<div className="body">
					<div className="price">
						<b> Precio : </b> U$S {carrito.price}
					</div>
					<div className="stock">
						<b> Stock : </b>
						{carrito.stock <= 0 ? 'Out of stock!' : carrito.stock}
					</div>
				</div>
			</div>
			<div className="control">
				<div className="carrito">
					En carrito: <br />
					<input type="text" className="cant" value={carrito.quantity} readOnly />
				</div>
				<div className="botones">
					<div className="butonContainer">
						<div className="boton add" onClick={handleClickAdd}>
							<div className="iconButtom">+</div>
						</div>
					</div>
					<div className="butonContainer">
						<div className="boton rest" onClick={handleClickRest}>
							<div className="iconButtom">-</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
