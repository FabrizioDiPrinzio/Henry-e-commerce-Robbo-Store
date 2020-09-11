import React, {useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import './ProductCard.css';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;

export default function ProductCard({robot}) {
	const userId = useSelector(state => state.user.userId);
	const userType = useSelector(state => state.user.userType);
  const [loading, setLoading] = useState(false)

	const [carrito, setCarrito] = useState({
		quantity: 0,
		productId: robot.id,
		name: robot.name,
		price: robot.price,
		stock: robot.stock,
		image: robot.image
	});

	const handleClickAdd = e => {
		e.preventDefault();
    e.target.style.opacity =  '0.1';
		setCarrito({...carrito, quantity: ++carrito.quantity});
    setLoading(true)

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
        setLoading(false)
        e.target.style.opacity =  '1'
				alert('Agregado');
			})
			.catch(error => {
      setLoading(false)
      console.log(error);
      e.target.style.opacity =  '1'
      });
	};

	const handleClickRest = e => {
		e.preventDefault();
		if (carrito.quantity > 0 || loading === false) {
      e.target.style.opacity =  '0.1';
			setCarrito({...carrito, quantity: --carrito.quantity});
      setLoading(true)
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
        	e.target.style.opacity =  '1';
          setLoading(false)
					alert('Quitado');
					// addEvents();
					// btnRest.style.backgroundColor = 'var(--razzmatazz)';
				})
				.catch(error => {
          alert(error.message);
          setLoading(false)
        	e.target.style.opacity =  '1'
        });
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
	)
}
