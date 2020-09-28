import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {allActions} from '../../Redux/Actions/actions.js';
import ProductCard from '../Product Card/ProductCard.jsx';
import axios from 'axios';
import './Catalogo.css';

const urlBack = process.env.REACT_APP_API_URL;

export default function Catalogo(props) {
	// Redux
	let products = useSelector(state => state.products.allProducts);
	let more = useSelector(state => state.products.more);
	// React hooks
	const [cargarMasVisibiliy, setCargarMasVisibiliy] = useState(true);
	const [robots, setRobots] = useState([]);
	const [pag, setPag] = useState(1);
	const {categoria} = useParams();
	const params = new URLSearchParams(props.location.search).get('query');
	const dispatch = useDispatch();

	const handleCargarMas = event => {
		event.preventDefault();
		//let lastPage = pag;
		let nextPage = pag + 1;
		if (!categoria && !params) dispatch(allActions.productActions.getAllProducts(nextPage));
		if (categoria) {
			cargarCategoria(nextPage);
		}
		if (params) {
			cargarSearch(nextPage);
		}
		setPag(pag + 1);
	};

	const cargarCategoria = nextPage => {
		axios
			.get(`${urlBack}/products/category/${categoria}/?p=${nextPage}`)
			.then(res => {
				setRobots(['nada']);
				if (nextPage === 1) {
					setRobots(res.data.products);
				}
				else {
					setRobots(robots.concat(res.data.products));
				}
				const more = res.data.more;
				compobarSiHayMas(more);
			})
			.catch(err => {
				setRobots(null);
				compobarSiHayMas(false);
				console.log(err.response.data);
			});
	};

	const cargarSearch = nextPage => {
		axios
			.get(`${urlBack}/search?query=${params}&p=${nextPage}`)
			.then(res => {
				setRobots([]);
				if (nextPage === 1) {
					setRobots(res.data.products);
				}
				else {
					setRobots(robots.concat(res.data.products));
				}
				const more = res.data.more;
				compobarSiHayMas(more);
			})
			.catch(err => {
				setRobots([]);
				compobarSiHayMas(false);
				console.log(err.response.data);
			});
	};

	const compobarSiHayMas = more => {
		if (!more) {
			setCargarMasVisibiliy(false);
			setPag(1);
		}
		else {
			setCargarMasVisibiliy(true);
		}
	};

	const handleSubir = e => {
		e.preventDefault();
		window.scrollTo(0, 0);
	};

	useEffect(
		() => {
			setPag(1);
			if (!categoria && !params) dispatch(allActions.productActions.getAllProducts(1));
			return () => {
				dispatch(allActions.productActions.cleanProduct());
			};
		},
		[categoria, params]
	);

	useEffect(
		() => {
			compobarSiHayMas(more);
		},
		[more]
	);

	useEffect(
		() => {
			// Main page, returns ALL products - or not All ...
			if (!categoria && !params) setRobots(products);
			if (more) setCargarMasVisibiliy(true);
		},
		[products, params, categoria]
	);

	useEffect(
		() => {
			setPag(1);
			if (categoria) {
				// Filter by category
				cargarCategoria(1);
			}
			else if (params) {
				// Search by query
				cargarSearch(1);
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
				{robots.length === 0 &&
				params && (
					<li>
						<h5>No encontramos nada :´(</h5>
					</li>
				)}
				<div>
					{!!robots.length &&
					cargarMasVisibiliy && (
						<button className="cargarMas" onClick={handleCargarMas}>
							{' '}
							Cargar más productos{' '}
						</button>
					)}
					{robots.length > 3 && (
						<button onClick={handleSubir} className="subir">
							Subir
						</button>
					)}
				</div>
				{!cargarMasVisibiliy && (
					<li>
						<span>Eso es todo por ahora...</span>
					</li>
				)}
				<li> Mostrando {robots.length} items </li>
			</ul>
		</div>
	);
}
