import React from 'react';
import './Home.css';
import Carousel from './Carousel/Carousel.jsx';
import {Link} from 'react-router-dom';

function Home() {
	return (
		<div className="Home">

				<Carousel />

			<Link to="/admin">
				<h3>Admin control panel</h3>
			</Link>
		</div>
	);
}
/**/
export default Home;
