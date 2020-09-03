import React from 'react';
import {Link} from 'react-router-dom';
import s from './ProductCard.module.css';

export default function ProductCard({robot}) {
	return (
		<div className={s.productCard}>
			<div className={s.title}>{robot.name}</div>
			<div className={s.body}>
				<div className={s.topBar}>
					<Link to={`/producto/${robot.id}`}>
						{console.log(robot)}
						<div className={s.info}>i</div>
					</Link>
					<div className={s.container}>
						<img src={robot.image} alt={robot.name} />
					</div>
				</div>
				<div className={s.price}>
					<div>Precio: U$S{robot.price}</div>
					<div className={s.buttons}>
						<button>-</button>
						<button>+</button>
					</div>
				</div>
				<div className={s.stock}>{robot.stock <= 0 && 'Out of stock!'}</div>
			</div>
		</div>
	);
}
