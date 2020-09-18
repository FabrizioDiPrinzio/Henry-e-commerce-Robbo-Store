import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import './Producto.css';
import 'bootstrap/dist/css/bootstrap.css';
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
			Axios.get(`${urlBack}/products/${id}`).then(res => {
				setRobot(res.data);
				setPics(res.data.pics.map(i => i.imageUrl));
			});
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
				<h3 className="productTitle">{robot.name}</h3>
					<Carousel className="carItems" activeIndex={index} onSelect={handleSelect}>
						{pics.map(image => (
							<Carousel.Item className="">
								<img
								//d-block w-100
									className="productImg h-100"
									src={image}
									alt={pics.indexOf(image)}
								/>
								<Carousel.Caption className="carCap">
									<h4></h4>
								</Carousel.Caption>
							</Carousel.Item>
						))}
					</Carousel>
				<div className="infoCard">
					<p className="infoCardDesc">{robot.description}</p>
					<div className="infoCont">
						<ul className="infoCardData">
							<li className="">$ {robot.price}</li>
							<li className="">
								{robot.stock > 0 ? `Stock: ${robot.stock} unidades` : 'Out of stock!'}
							</li>
						</ul>
						{user.rol !=='Guest' && (
							<div>
								<button type="submit" className="editProdBtn" value="Editar" onClick={() => setShowModal(!showModal)}>
										Editar
								</button>
								<Modal show={showModal} onHide={() => setShowModal(!showModal)}>
									<ProductForm />
								</Modal>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
