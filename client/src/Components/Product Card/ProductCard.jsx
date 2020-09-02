import React from 'react';
import {Link} from 'react-router-dom';
import s from './ProductCard.module.css';

export default function ProductCard(props) {
	return (
		<div className={s.productCard}>
			<div className={s.title}>{props.product}</div>
			<div className={s.body}>
				<div className={s.topBar}>
					<Link to={`/producto/${props.id}`}>
						{console.log(props)}
						<div className={s.info}>i</div>
					</Link>
					<div className={s.container}>
						<img src={props.image} alt={props.product} />
					</div>
				</div>
				<div className={s.price}>
					<div>Precio: U$S{props.price}</div>
					<div className={s.buttons}>
						<button>-</button>
						<button>+</button>
					</div>
				</div>
				<div className={s.stock}>{props.stock <= 0 && 'Out of stock!'}</div>
			</div>
		</div>
	);
}
