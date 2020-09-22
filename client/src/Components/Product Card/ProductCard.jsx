import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {allActions} from '../../Redux/Actions/actions';
import axios from 'axios';
import {exclamationMark} from '../../multimedia/SVGs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './ProductCard.css';
// =========== FIN DE IMPORTS ============

const urlBack = process.env.REACT_APP_API_URL;

export default function ProductCard({robot}) {
	// Redux
	const user = useSelector(state => state.user);
	const currentCart = useSelector(state => state.cart.currentCart);
	const dispatch = useDispatch();

	const {orderlines} = currentCart;

	// React hooks
	const currentRobot = orderlines && orderlines.find(item => item.productId === robot.id);

	const [carrito, setCarrito] = useState({quantity: currentRobot ? currentRobot.quantity : 0});
	const [loading, setLoading] = useState(false);
	const [showTooltips, setShowTooltips] = useState(false);

	useEffect(
		() => {
			setCarrito({...carrito, quantity: currentRobot ? currentRobot.quantity : 0});
		},
		[currentCart]
	);

	// ------------------- Funcionalidad ----------------

	const handleClickAdd = e => {
		e.preventDefault();

		if (robot.stock <= carrito.quantity || loading === true) return;

		const productValues = {
			productId: robot.id,
			quantity: carrito.quantity + 1,
			price: (carrito.quantity + 1) * robot.price
		};

		setLoading(true);

		if (user.rol === 'Guest') {
			dispatch(
				allActions.cartActions.editGuestCart(
					productValues,
					orderlines,
					robot,
					productValues.quantity === 1 ? 'AddToProducts' : 'No changes'
				)
			);
			setLoading(false);
		}
		else {
			axios
				.put(`${urlBack}/user/${user.id}/cart`, productValues)
				.then(() => {
					setLoading(false);
					dispatch(allActions.cartActions.getUserCart(user.id));
				})
				.catch(error => {
					setLoading(false);
					alert(error.response.data);
				});
		}
	};

	const handleClickRemove = e => {
		e.preventDefault();

		const changes = {
			productId: robot.id,
			quantity: carrito.quantity - 1,
			price: (carrito.quantity - 1) * robot.price
		};

		if (carrito.quantity > 0 && loading === false) {
			setLoading(true);

			if (user.rol === 'Guest') {
				dispatch(
					allActions.cartActions.editGuestCart(
						changes,
						orderlines,
						robot,
						changes.quantity === 0 ? 'RemoveFromProducts' : 'No changes'
					)
				);
				setLoading(false);
			}
			else {
				axios
					.put(`${urlBack}/user/${user.id}/cart`, changes)
					.then(() => {
						setLoading(false);
						dispatch(allActions.cartActions.getUserCart(user.id));
					})
					.catch(error => {
						alert(error.response.data);
						setLoading(false);
					});
			}
		}
	};

	return (
		<div className="cardContainer">
			<div className="imageContainer">
				<img className="image" src={robot.image} alt={robot.name} />
			</div>
			<div className="infoContainer">
				<Link to={`/producto/${robot.id}`}>
					<div className="title">
						<h3>{robot.name}</h3>
					</div>
				</Link>
				<div className="body">
					<div className="price">
						<b> Precio : </b> U$S {robot.price}
					</div>
					<div className="stock">
						<b> Stock : </b>
						{robot.stock <= 0 ? 'Out of stock!' : robot.stock}
					</div>
				</div>
			</div>
			<div className="control">
				<div className="carrito">
					En carrito: <br />
					<input type="text" className="cant" value={carrito.quantity} readOnly />
				</div>
				<div className="botones">
					<OverlayTrigger
						show={robot.stock <= carrito.quantity && showTooltips}
						overlay={
							<Tooltip id="disabledAdd">{exclamationMark} No queda más stock!</Tooltip>
						}
					>
						<div className="butonContainer">
							<div
								className={`boton add ${robot.stock <= carrito.quantity || loading
									? 'disabledAdd'
									: ''}`}
								onClick={handleClickAdd}
							>
								<div
									className="iconButtom"
									onMouseEnter={() => {
										if (robot.stock <= carrito.quantity) setShowTooltips(true);
									}}
									onMouseLeave={() => setShowTooltips(false)}
								>
									+
								</div>
							</div>
						</div>
					</OverlayTrigger>
					<OverlayTrigger
						show={carrito.quantity === 0 && showTooltips}
						overlay={
							<Tooltip id="disabledAdd">
								{exclamationMark} No tienes ninguno en el carrito!
							</Tooltip>
						}
					>
						<div className="butonContainer">
							<div className="boton rest" onClick={handleClickRemove}>
								<div
									className={`iconButtom ${carrito.quantity === 0
										? 'disabledRemove'
										: ''}`}
									onMouseEnter={() => {
										if (carrito.quantity === 0) setShowTooltips(true);
									}}
									onMouseLeave={() => setShowTooltips(false)}
								>
									-
								</div>
							</div>
						</div>
					</OverlayTrigger>
				</div>
			</div>
		</div>
	);
}
