import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import './Producto.css';
import 'bootstrap/dist/css/bootstrap.css';
import Review from './Review/Review.jsx';
import Axios from 'axios';
// =========== FIN DE IMPORTS ============

const urlBack = process.env.REACT_APP_API_URL;

export default function Producto() {
	const [robot, setRobot] = useState({});
	const {id} = useParams();

	useEffect(
		() => {
			Axios.get(`${urlBack}/products/${id}`).then(res => setRobot(res.data));
		},
		[id]
	);

	if (!robot)
		return (
			<h1 className="not-found">
				Lo sentimos, pero ese producto no se encuentra en nuestra base de datos!
			</h1>
		);

	return (
		<div className="productContainer">
			<div className="productCont2">
				<h3 className="productTitle">{robot.name}</h3>
				<div>
					<img className="productImg" src={robot.image} alt={robot.name} />
				</div>
				<div className="infoCard">
					<p className="infoCardDesc">{robot.description}</p>
					<ul className="infoCardData">
						<li className="">U$S{robot.price}</li>
						<li className="">
							{robot.stock > 0 ? `Stock: ${robot.stock} unidades` : 'Out of stock!'}
						</li>
					</ul>
				</div>
			</div>
			<Review robotId={robot.id}/>
		</div>
	);
}
