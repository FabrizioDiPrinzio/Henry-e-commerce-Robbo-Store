import React from 'react';
import ProductCard from '../Product Card/ProductCard.jsx';
import s from './Catalogo.module.css';

export default function Catalogo({robots}) {
	return (
		<div>
			<ul className={s.list}>
				{robots.map(bot => (
					<li className={s.listItem} key={bot.id}>
						<ProductCard robot={bot} />
					</li>
				))}
			</ul>
		</div>
	);
}
