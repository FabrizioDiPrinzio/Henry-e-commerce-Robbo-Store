import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Carousel.css';
import 'bootstrap/dist/css/bootstrap.css';
import Axios from 'axios';
import CarouselBootstrap from 'react-bootstrap/Carousel';

const urlBack = process.env.REACT_APP_API_URL;

export default function Carousel() {
/*	let botonDelante = document.querySelector('.btn delante');
	let botonAtras = document.querySelector('.btn delante');
    */
    const [index, setIndex] = useState(0); 
	const [bestOnes, setBestOnes] = useState([{image: "#" },{image: "#" }]);


	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};


	useEffect(
		() => {
			Axios.get(`${urlBack}/products/bestOnes`)
			.then(res => {
				setBestOnes(res.data)
			})
			.catch(err => {
				console.log(err);
				alert(err);
			})
		},
		[]
	);


	return (
		<div>
		<h3 className="tituloCarousel">Nuestro top 5</h3>
		<CarouselBootstrap 
				className="carousel"
				activeIndex={index}
				onSelect={handleSelect}>
					{
					bestOnes.map(best =>{
						return (
							<CarouselBootstrap.Item>
								<div className="cardCarrousel">
									<img 
										src={best && best.image}
										alt={best.name} 
									/>
									<Link to={`/producto/${best.id}`} >
										<div className="bestOneData"> 
											<i  className='bestOneLink'>{best.name}</i>
											<p className='descriptionCarrousel'>Precio: U$S{best.price}</p>
											<p className='descriptionCarrousel'>{best.description}</p>
										</div>
									</Link>
								</div>
							</CarouselBootstrap.Item>
							)
						})
					}
				</CarouselBootstrap>
		</div>
	);
}
