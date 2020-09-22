import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {editButton, star} from '../../multimedia/SVGs';
import './Producto.css';
import 'bootstrap/dist/css/bootstrap.css';
import Review from './Review/Review.jsx';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import Axios from 'axios';
import ProductForm from '../FormularioProducto/ProductForm';
// =========== FIN DE IMPORTS ============

const urlBack = process.env.REACT_APP_API_URL;

export default function Producto() {

	const user = useSelector(state => state.user);

	const [robot, setRobot] = useState({});
	const [pics, setPics] = useState([]);
	const [index, setIndex] = useState(0);
	const {id} = useParams();
	const [showModal, setShowModal] = useState(false);

	useEffect(
		() => {
			Axios.get(`${urlBack}/products/${id}`)
			.then(res => {
				setRobot(res.data);
				setPics(res.data.pics.map(i => i.imageUrl));
			})
			.catch(err => {
				console.log(err);
				alert(err);
			})
		},
		[id]
	);

	if (!robot)
		return (
			<h1 className="not-found">
				Lo sentimos, pero ese producto no se encuentra en nuestra base de datos!
			</h1>
		);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};


	const showStars = num => {
		var arr = [];
		for (let i = 0; i < num; i++) {
			arr.push(star);
		}
		return arr;
	};

	const stars = showStars(`${robot.averageQualification}`);





	return (
		<div className="productContainer">
			<div className="productCont2">

				<Carousel 
				className="carItems"
				activeIndex={index} 
				onSelect={handleSelect}>

					{pics.map(image => (
						<Carousel.Item className="productCarouselItem">
							<img
							className="productImg"
							src={image}
							alt={pics.indexOf(image)}
							/>
							{/*
							<Carousel.Caption className="">
								<h4></h4>
							</Carousel.Caption>
							*/}
						</Carousel.Item>
					))}

				</Carousel>


				<div className="infoCard">

					<div className='infoCardHeader'>
						<h3 className="productTitle">
							{robot.name}{' '}{' '}
							{user.rol === 'Admin' && (
							<button type="submit" className="editProdBtn" value="Editar" onClick={() => setShowModal(!showModal)}>
								{editButton}
							</button>
							)}
							<hr/>
						</h3>
						<div className='starQualification'>
							<div>{stars.map( i => i)}</div>
							| {`${robot.averageQualification} / 5`}
						</div>
						<p className="infoCardDescription">{robot.description}</p>
						<div className="infoCardData">
							<span className="">
								Price U$S: {robot.price}
							</span>
							<br />
							<span className="">
								{robot.stock > 0 ? `Stock: ${robot.stock} units left` : 'Out of stock!'}
							</span>
						</div>
					</div>

					<button className='bigBuyButton'>
						<h4>¡ Agregar al Carrito !</h4>
					</button>

					<div className='reviewContainer'>
						<Review robotId={robot.id}/>
					</div>			
		
				</div>

			</div>

			{user.rol === 'Admin' && (
				<Modal 
				show={showModal}
				onHide={() => setShowModal(!showModal)}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				>
					<div className='container'>
						<ProductForm preSelected={robot} />
					</div>
				</Modal>
			)}

		</div>
	);
};
