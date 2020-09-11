import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './ProductCard.css';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;
const btnAdd = document.querySelector('.add')
const btnRest = document.querySelector('.rest')




export default function ProductCard({robot}) {
	const [en, setCarrito] = useState({
		userId:  useSelector( state => state.user.userID),
		userType: useSelector( state => state.user.userType),
		carrito: 0,
		productId: robot.productId,
		name: robot.name,
		price: robot.price,
		stock: robot.stock,
		image: robot.image,
		description: robot.description
	});
}

const addEvents = () => {
	btnAdd.addEventListener('click',e => handleClickAdd)
	btnRest.addEventListener('click',e => handleClickRest)
}  

const removeEvents = () => {
	btnAdd.removeEventListener('click',e => handleClickAdd)
	btnAdd.removeEventListener('click',e => handleClickRest)
}  


addEvents()

const handleClickAdd = e => {
e.preventDefault();
btnAdd.style.backgroundColor = 'gray';
	removeEvents()
  axios.post(`${urlBack}/${en.userId}/cart`,  {productId: en.productId, quantity: en.carrito + 1, price: en.price})
    .then(response => {
  		setCarrito({...en, carrito: en.carrito + 1});
  		addEvents()
  		btnAdd.style.backgroundColor = 'lightgreen'
	}).catch(error => alert(error.message)); 
}



const handleClickRest = e => {
e.preventDefault()
btnRest.style.backgroundColor = 'gray';
removeEvents()
if (en.carrito > 0){
  	axios.post(`${urlBack}/${en.userId}/cart`,  {productId: en.productId, quantity: en.carrito - 1, price: en.price})
	    .then(response => {
				setCarrito({...en, carrito: en.carrito - 1});
				addEvents()
				btnRest.style.backgroundColor =  'var(--razzmatazz)';
		}).catch(error => alert(error.message)); 
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
						<div
							className="boton add"
							onClick={handleClickAdd}
						>
							<div className="iconButtom">+</div>
						</div>
					</div>
					<div className="butonContainer">
						<div
							className="boton rest"
							onClick={handleClickRest}
						>
							<div className="iconButtom">-</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
