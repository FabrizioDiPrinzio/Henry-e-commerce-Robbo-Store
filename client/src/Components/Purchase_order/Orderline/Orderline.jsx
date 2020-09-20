import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Orderline.css';
import {useSelector, useDispatch} from 'react-redux';
import {allActions} from '../../../Redux/Actions/actions';
import axios from 'axios';
// =========== FIN DE IMPORTS ============

const urlBack = process.env.REACT_APP_API_URL;

export default function Orderline({robot, orderProducts}) {
	// React hooks
	
	const currentRobot = orderProducts.find(item => item.id === robot.productId);

	console.log(robot, orderProducts, currentRobot)
	
	// ------------------- Funcionalidad ----------------

	return (
		<div className="orderlineContainer">
			<div className="imageContainer">
				<img className="image" src={currentRobot.image} alt={currentRobot.name} />
			</div>
			<div className="infoContainer">
				<Link to={`/producto/${currentRobot.id}`}>
					<div className="title">
						<h3>{currentRobot.name}</h3>
					</div>
				</Link>
				<div className="body">
					<div className="price">
						<b> Precio Unitario: </b> U$S {currentRobot.price}
					</div>
				</div>
			</div>
			<div className="control">
				<div className="cantidad">
					Cantidad: <br />
					{`${robot.quantity}`}
				</div>
				<div className="subtotal">
					Sub Total:<br />
					u$d {`${robot.price}`}
				</div>

			</div>
		</div>
	);

}
