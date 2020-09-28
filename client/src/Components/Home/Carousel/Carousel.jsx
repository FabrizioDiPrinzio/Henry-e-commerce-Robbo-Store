import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
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
								</div>
								<div className="bestOneData"> 

								</div>
							</CarouselBootstrap.Item>
							)
						})
					}
				</CarouselBootstrap>
		</div>
	);
}
