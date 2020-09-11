import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './ProductCard.css';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;

export default function ProductCard({robot}) {
	const [en, setCarrito] = useState({
		userId:  1,//useSelector( state => state.user.userID),
		userType: 1, //useSelector( state => state.user.userType),
		carrito: 0,
		productId: robot.id,
		name: robot.name,
		price: robot.price,
		stock: robot.stock,
		image: robot.image
	});


 const handleClickAdd = e => {
	e.preventDefault();
	e.target.style.opacity =  '0.1';
 	axios.post(`${urlBack}/${en.userId}/cart`,  {productId: en.id, quantity: en.carrito + 1, price: en.price})
	    .then(response => {
	  		setCarrito({...en, carrito: en.carrito + 1});
	  		e.target.style.opacity =  '1';
		}).catch(error => alert(error.message))
		.catch(	e.target.style.opacity =  '1') ; 
}



 const handleClickRest = e => {
	e.preventDefault()
	if (en.carrito > 0){
		e.target.style.opacity =  '0.1';
	  	axios.post(`${urlBack}/${en.userId}/cart`,  {productId: en.id, quantity: en.carrito - 1, price: en.price})
		    .then(response => {
				setCarrito({...en, carrito: en.carrito - 1});
				e.target.style.opacity =  '1';
			}).catch(error => alert(error.message))
			.catch(	e.target.style.opacity =  '1') ;  
		}
}


	return (
		<div className="cardContainer">
			<div className="imageContainer">
				<img className="image" src={en.image} alt={en.name} />
			</div>
			<div className="infoContainer">
				<Link to={`/producto/${en.id}`}>
					<div className="title">
						<h3>{en.name}</h3>
					</div>
				</Link>
				<div className="body">
					<div className="price">
						<b> Precio : </b> U$S {en.price}
					</div>
					<div className="stock">
						<b> Stock : </b>
						{en.stock <= 0 ? 'Out of stock!' : en.stock}
					</div>
				</div>
			</div>
			<div className="control">
				<div className="carrito">
					En carrito: <br />
					<input type="text" className="cant" value={en.carrito} readOnly />
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
