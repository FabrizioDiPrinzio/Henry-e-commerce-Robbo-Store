import React from 'react';
import s from './Product_Card.module.css';

export default function ProductCard({product, image, price}) {
	return (
		<div className={s.productCard}>
			<div className={s.title}>{product}</div>
			<div className={s.topBar}>
				<div className={s.info}>i</div>
				<img src={image} alt={product} />
			</div>
			<div className={s.price}>
				<div>Precio: U$S{price}</div>
				<div className={s.buttons}>
					<button>-</button>
					<button>+</button>
				</div>
			</div>
		</div>
	);
}
