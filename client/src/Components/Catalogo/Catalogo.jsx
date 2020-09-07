import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ProductCard from '../Product Card/ProductCard.jsx';
import axios from 'axios';
import './Catalogo.css';

const urlBack = process.env.REACT_APP_API_URL;

export default function Catalogo(props) {
	const [robots, setRobots] = useState([]);
	const {categoria} = useParams();
	const search = props.location.search;
	const params = new URLSearchParams(search);

	useEffect(
		() => {
			// Main page, returns ALL products
			if (!categoria && !search) {
				axios.get(`${urlBack}/products`).then(res => setRobots(res.data));
			}
			else if (categoria) {
				// Filter by category
				axios
					.get(`${urlBack}/products/category/${categoria}`)
					.then(res => setRobots(res.data.products))
					.catch(err => {
						setRobots(null);
						console.log(err.message);
					});
			}
			else if (search) {
				// Search by query
				axios
					.get(`${urlBack}/search?query=${params.get('query')}`)
					.then(res => setRobots(res.data))
					.catch(err => {
						setRobots(null);
						console.log(err.message);
					});
			}
		},
		[categoria, search]
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
