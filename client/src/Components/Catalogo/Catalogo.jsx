import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import ProductCard from '../Product Card/ProductCard.jsx';
import axios from 'axios';
import './Catalogo.css';

const urlBack = process.env.REACT_APP_API_URL;

export default function Catalogo(props) {
	const products = useSelector(state => state.products.allProducts);

	// React hooks
	const [robots, setRobots] = useState([]);
	const {categoria} = useParams();
	const params = new URLSearchParams(props.location.search).get('query');

	useEffect(
		() => {
			// Main page, returns ALL products
			if (!categoria && !params) setRobots(products);
		},
		[products]
	);

	useEffect(
		() => {
			if (categoria) {
				// Filter by category
				axios
					.get(`${urlBack}/products/category/${categoria}`)
					.then(res => setRobots(res.data.products))
					.catch(err => {
						setRobots(null);
						console.log(err.response.data);
					});
			}
			else if (params) {
				// Search by query
				axios
					.get(`${urlBack}/search?query=${params}`)
					.then(res => setRobots(res.data))
					.catch(err => {
						setRobots(null);
						console.log(err.response.data);
					});
			}
		},
		[categoria, params]
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
			{!robots && params && <h1>No contamos con ningún robot de ese tipo :(</h1>}
		</div>
	);
}
