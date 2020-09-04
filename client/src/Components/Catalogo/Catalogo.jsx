import React, {useState, useEffect} from 'react';
import ProductCard from '../Product Card/ProductCard.jsx';
import s from './Catalogo.module.css';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;

export default function Catalogo() {
	const [robots, setRobots] = useState([]);

	useEffect(() => {
		axios.get(`${urlBack}/products`).then(res => setRobots(res.data));
	}, []);

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
