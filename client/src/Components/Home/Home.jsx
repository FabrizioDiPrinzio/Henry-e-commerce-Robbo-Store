import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';

function Home() {
	return (
		<div className="Home">
			<div className="Carousel">
				<h1>[ Carousel ]</h1>
			</div>
			<Link to="/admin">
				<h3>Admin control panel</h3>
			</Link>
		</div>
	);
}
/**/
export default Home;
