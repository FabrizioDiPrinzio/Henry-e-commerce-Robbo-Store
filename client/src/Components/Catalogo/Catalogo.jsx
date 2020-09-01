import React from 'react';
import Product_Card from '../Product Card/Product_Card.jsx';

export default function Catalogo({robots}) {
	return (
		<div>
			<ul>
				{robots.map(bot => (
					<li>
						<Product_Card
							product={bot.product}
							image={bot.image}
							price={bot.price}
							key={bot.id}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
