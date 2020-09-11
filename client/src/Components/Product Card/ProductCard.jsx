import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './ProductCard.css';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;


export default function ProductCard({robot}) {
	const [en, setCarrito] = useState({
		userId:  useSelector( state => state.user.userID),
		userType: useSelector( state => state.user.userType),
		carrito: 0,
		name: robot.name,
		price: robot.price,
		stock: robot.stock,
		image: robot.image,
		description: robot.description
	});


const handleClickAdd = e => {
e.preventDefault();
setCarrito({...en, carrito: en.carrito + 1})

  // axios.post(`${urlBack}/:userId/cart`, )
  //   .then(response => {
		// })
  //   .catch(error => alert(error.message)); 
    
}



const handleClickRes = e => {
e.preventDefault()
setCarrito({...en, carrito: en.carrito > 0 ? en.carrito - 1 : 0})

}


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
							onClick={handleClickRes}
						>
							<div className="iconButtom">-</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
