import React from 'react';
import {Link} from 'react-router-dom';
import s from './NavBar.module.css';

export default function NavBar() {
	return (
		<ul className={s.menu}>
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
	);
}
