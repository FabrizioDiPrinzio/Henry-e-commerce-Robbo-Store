import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './ProductCard.css';
import {useSelector, useDispatch} from 'react-redux';
import {allActions} from '../../Redux/Actions/actions';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;

export default function ProductCard({robot}) {
	// Redux
	const userId = useSelector(state => state.user.id);
	const userType = useSelector(state => state.user.userType);
	const orderlines = useSelector(state => state.cart.orderlines);
	const dispatch = useDispatch();

	const currentRobot = orderlines.find(item => item.productId === robot.id);

	// React hooks
	const [loading, setLoading] = useState(false);
	// const [clickable, setClickable] = useState(false);

	const [carrito, setCarrito] = useState({
		quantity: currentRobot ? currentRobot.quantity : 0,
		productId: robot.id,
		name: robot.name,
		price: robot.price,
		stock: robot.stock,
		image: robot.image
	});

	useEffect(
		() => {
			setCarrito({...carrito, quantity: currentRobot ? currentRobot.quantity : 0});
		},
		[orderlines]
	);

	// ------------------- Funcionalidad ----------------

	const handleClickAdd = e => {
		e.preventDefault();
		e.persist();
		e.target.style.opacity = '0.1';
		setLoading(true);
		const changes = {
			productId: carrito.productId,
			quantity: carrito.quantity + 1,
			price: (carrito.quantity + 1) * carrito.price
		};
		if (robot.stock > carrito.quantity) {
			axios
				.put(`${urlBack}/user/${userId}/cart`, changes)
				.then(() => {
					setLoading(false);
					e.target.style.opacity = '1';
					alert('Agregado');
					dispatch(allActions.cartActions.getUserCart(userId));
				})
				.catch(error => {
					setLoading(false);
					console.log(error);
					console.log(e.target);
					e.target.style.opacity = '1';
				});
		}
		else alert('Sin stock!');
	};

	const handleClickRest = e => {
		e.preventDefault();
		e.persist();
		e.target.style.opacity = '0.1';
		const changes = {
			productId: carrito.productId,
			quantity: carrito.quantity - 1,
			price: (carrito.quantity - 1) * carrito.price
		};
		if (carrito.quantity > 0 && loading === false) {
			e.target.style.opacity = '0.1';
			setLoading(true);
			axios
				.put(`${urlBack}/user/${userId}/cart`, changes)
				.then(response => {
					e.target.style.opacity = '1';
					setLoading(false);
					alert('Quitado');
					dispatch(allActions.cartActions.getUserCart(userId));
				})
				.catch(error => {
					alert(error.message);
					setLoading(false);
					e.target.style.opacity = '1';
				});
		}
	};

	return (
		<div className="cardContainer">
			<div className="imageContainer">
				<img className="image" src={carrito.image} alt={carrito.name} />
			</div>
			<div className="infoContainer">
				<Link to={`/producto/${robot.id}`}>
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
