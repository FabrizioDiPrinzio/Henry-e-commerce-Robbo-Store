import React from 'react';
import {Link} from 'react-router-dom';

export default function NavBar() {
	return (
		<div>
			Placeholder navigation bar:
			<ul>
				<li>
					<Link to="/">Home</Link>{' '}
				</li>
				<li>
					<Link to="/about">About</Link>{' '}
				</li>
				<li>
					<Link to="/product_card">Product Card placeholder</Link>{' '}
				</li>
				<li>
					<Link to="/catalogo">Catalogo placeholder</Link>{' '}
				</li>
			</ul>
		</div>
	);
}
