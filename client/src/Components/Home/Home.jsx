import React from 'react';
//import Carousel from './Carousel.js';
import './Home.css';
import {Link} from 'react-router-dom';

function Home() {
	return (
		<div className="Home">
			<div className="Carousel">
				<h1>[ Carousel ]</h1>
			</div>
			<Link to="/product_form">
				<h3>Product Form</h3>
			</Link>
			<Link to="/category_form">
				<h3>Category Form</h3>
			</Link>

		</div>
	);
}
/**/
export default Home;
