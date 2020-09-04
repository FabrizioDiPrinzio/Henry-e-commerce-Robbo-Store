import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ProductCard from '../Product Card/ProductCard.jsx';
import axios from 'axios';
import './Catalogo.css';

const urlBack = process.env.REACT_APP_API_URL;

export default function Catalogo() {
	const [robots, setRobots] = useState([]);
	const {categoria} = useParams();

	useEffect(
		() => {
			if (!categoria) axios.get(`${urlBack}/products`).then(res => setRobots(res.data));
			else {
				axios
					.get(`${urlBack}/products/category/${categoria}`)
					.then(res => setRobots(res.data.products));
			}
		},
		[categoria]
	);

	return (
		<div className="catalogo">
			<ul className="list">
				{robots &&
					robots.map(bot => (
						<li className="listItem" key={bot.id}>
							<ProductCard robot={bot} />
						</li>
					))}
			</ul>
			{!robots && <h1>No contamos con ningún robot de ese tipo :(</h1>}
		</div>
	);
}
