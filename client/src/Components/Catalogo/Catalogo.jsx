import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ProductCard from '../Product Card/ProductCard.jsx';
import axios from 'axios';
import './Catalogo.css';

const urlBack = process.env.REACT_APP_API_URL;

export default function Catalogo(props) {
	// Redux
	const products = useSelector(state => state.products.allProducts);
	const dispatch = useDispatch();

	// Hooks
	const [robots, setRobots] = useState([]);
	const query = new URLSearchParams(props.location.search).get('query');
	const category = new URLSearchParams(props.location.search).get('category');

	useEffect(
		() => {
			dispatch(productActions.getAllProducts());
		},
		[products]
	);

	useEffect(
		() => {
			// Main page, returns ALL products
			if (!category && !query) {
				setRobots(products);
			}
			if (category) {
				// Filter by category
				const filteredByCategory = robots.filter(r => r.categories.includes(category));
				setRobots(filteredByCategory);
			}
			else if (query) {
				// Search by query
				axios
					.get(`${urlBack}/search?query=${query}`)
					.then(res => setRobots(res.data))
					.catch(err => {
						setRobots(null);
						console.log(err.message);
					});
			}
		},
		[category, query]
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
