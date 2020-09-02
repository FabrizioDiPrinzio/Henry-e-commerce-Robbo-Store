import React from 'react';
import {Link} from 'react-router-dom';
import './Producto.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function Producto({robot}) {
	if (!robot)
		return <h1>Lo sentimos, pero ese producto no se encuentra en nuestra base de datos!</h1>;
	return (
		<div className="Container">
			<div className="">
				<h3 className="">{robot.product}</h3>
				<img src={robot.image} alt={robot.product} />
				<p className="">{robot.descripcion}</p>
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
