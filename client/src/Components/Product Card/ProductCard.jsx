import React from 'react';
import {Link} from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({robot}) {
	return (
		<div className="productCard">
			<div className="title">{robot.name}</div>
			<div className="body">
				<div className="topBar">
					<Link to={`/producto/${robot.id}`}>
						<div className="info">i</div>
					</Link>
					<div className="container">
						<img src={robot.image} alt={robot.name} />
					</div>
				</div>
				<div className="price">
					<div>Precio: U$S{robot.price}</div>
					<div className="buttons">
						<button>-</button>
						<button>+</button>
					</div>
				</div>
				<div className="stock">{robot.stock <= 0 && 'Out of stock!'}</div>
			</div>
		</div>
	);
}
