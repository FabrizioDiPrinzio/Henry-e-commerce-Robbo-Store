import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import './Producto.css';
import 'bootstrap/dist/css/bootstrap.css';
import Axios from 'axios';

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
		return <h1>Lo sentimos, pero ese producto no se encuentra en nuestra base de datos!</h1>;

	return (
		<div className="Container">
			<div className="">
				<h3 className="">{robot.name}</h3>
				<img src={robot.image} alt={robot.name} />
				<p className="">{robot.description}</p>
				<ul className="">
					<li className="">U$S{robot.price}</li>
					<li className="">
						{robot.stock > 0 ? `Stock: ${robot.stock} unidades` : 'Out of stock!'}
					</li>
				</ul>
			</div>
		</div>
	);
}
