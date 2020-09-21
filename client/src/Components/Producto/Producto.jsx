import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
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

	return (
		<div className="productContainer">
			<div className="productCont2">

				<Carousel 
				className="carItems"
				wrap={true} 
				activeIndex={index} 
				onSelect={handleSelect}>

					{pics.map(image => (
						<Carousel.Item className="productCarouselItem">
							<img
							//d-block w-100
								className="productImg"
								src={image}
								alt={pics.indexOf(image)}
							/>
							{/*
							<Carousel.Caption className="carCap">
								<h4></h4>
							</Carousel.Caption>
							*/}
						</Carousel.Item>
					))}

				</Carousel>


				<div className="infoCard">
					<h3 className="productTitle">{robot.name}</h3>
					<p className="infoCardDesc">{robot.description}</p>
					<ul className="infoCardData">
						<li className="">U$S{robot.price}</li>
						<li className="">
							{robot.stock > 0 ? `Stock: ${robot.stock} unidades` : 'Out of stock!'}
						</li>
					</ul>
					{user.rol === 'Admin' && (
						<div>
							<button type="submit" className="editProdBtn" value="Editar" onClick={() => setShowModal(!showModal)}>
									Editar
							</button>
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
						</div>
					)}

				</div>	
				<div className="Reviews">
					<Review robotId={robot.id}/>
				</div>			
			</div>			
		</div>
	);
};
