import React from 'react';
//import Carousel from './Carousel.js';
import ProductForm from '../FormularioCategoria/FormularioCategoria.jsx'
import './Home.css';

function Home() {
	return (
		<div className="Home">
			<body>
				<div className="Carousel">
					<h1>Carousel</h1>
				</div>
					<ProductForm propiedadRandom='una string' />
			</body>
		</div>
	);
}
/**/
export default Home;
