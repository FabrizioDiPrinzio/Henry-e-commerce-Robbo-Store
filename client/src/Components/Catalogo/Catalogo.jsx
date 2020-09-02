import React from 'react';
import ProductCard from '../Product Card/ProductCard.jsx';
import s from './Catalogo.module.css';

export default function Catalogo({robots}) {
	return (
		<div>
			<ul className={s.list}>
				{robots.map(bot => (
					<li className={s.listItem} key={bot.id}>
						<ProductCard
							product={bot.product}
							image={bot.image}
							price={bot.price}
							stock={bot.stock}
							id={bot.id}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
