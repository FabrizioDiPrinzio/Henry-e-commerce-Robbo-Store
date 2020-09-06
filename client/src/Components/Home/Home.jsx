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

			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet ex eu sapien
				faucibus molestie. In pulvinar dictum libero eu lacinia. Aenean aliquam sem sed
				tellus dignissim venenatis. Vivamus et aliquet enim. Nam consectetur et lacus quis
				malesuada. Phasellus sit amet lorem suscipit sem convallis malesuada. Ut eget justo
				eleifend nisi facilisis imperdiet. Morbi scelerisque tristique ipsum eget tincidunt.
				Nam ultricies eu velit et imperdiet. Etiam ullamcorper odio risus, eu malesuada ex
				bibendum pretium.
			</p>
		</div>
	);
}
/**/
export default Home;
