import React from 'react';
import {Link} from 'react-router-dom';
//import Carousel from './Carousel.js';
import ProductForm from '../FormularioProducto/ProductForm.js';
import './Home.css';

function Home() {
	return (
		<div className="Home">
			<body>
				<div className="Carousel">
					<h1>Carousel</h1>
				</div>
				<div className="Product-card">
					<Link to="/product_card">
						<h1>Product Card container</h1>
					</Link>
				</div>
				{/*<ProductForm/>*/}
			</body>
		</div>
	);
}
/**/
export default Home;
