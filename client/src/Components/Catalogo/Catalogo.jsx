import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {allActions} from '../../Redux/Actions/actions.js';
import ProductCard from '../Product Card/ProductCard.jsx';
import axios from 'axios';
import './Catalogo.css';

const urlBack = process.env.REACT_APP_API_URL;

export default function Catalogo(props) {
	let products = useSelector(state => state.products.allProducts);
	// React hooks
	const [robots, setRobots] = useState([]);
	const [pag, setPag] = useState(1)
	const {categoria} = useParams();
	const params = new URLSearchParams(props.location.search).get('query');
	const dispatch = useDispatch()

	const handleCargarMas = event => {
		event.preventDefault();
				let lastPage = pag;
				let nextPage = pag + 1;
				setPag(pag + 1)
				if (!categoria && !params) dispatch(allActions.productActions.getAllProducts(nextPage))
				if (categoria)  {
					axios
					.get(`${urlBack}/products/category/${categoria}/?p=${nextPage}`)
					.then(res => setRobots(robots.concat(res.data.products)))
					.catch(err => {
						setRobots(null);
						console.log(err.response.data);
					});
				}
	}

	useEffect(
		() => {
			dispatch(allActions.productActions.getAllProducts(1));
			return () => {dispatch(allActions.productActions.cleanProduct())}
		},
		[]
	);

	useEffect(
		() => {
			// Main page, returns ALL products - or not All ...
			setRobots(products);
		},
		[products]
	);

	useEffect(
		() => {
			if (categoria) {
				// Filter by category
				{dispatch(allActions.productActions.cleanProduct())}
				axios
					.get(`${urlBack}/products/category/${categoria}/?p=${pag}`)
					.then(res => setRobots(res.data.products))
					.catch(err => {
						setRobots(null);
						console.log(err.response.data);
					});
			}
			else if (params) {
				// Search by query
				{dispatch(allActions.productActions.cleanProduct())}
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
			<button className="cargarMas" onClick={handleCargarMas} > Cargar más productos </button>
			<li> Mostrando {robots.length} items </li>
			</ul>
			{!robots && params && <h1>No contamos con ningún robot de ese tipo :(</h1>}
		</div>
	);
}
