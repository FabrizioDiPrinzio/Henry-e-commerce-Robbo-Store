import React from 'react';
import NavBar from './NavBar.jsx';
//import Carousel from './Carousel.jsx';
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <NavBar
          onSearch={(Robot) => alert(Robot)}
        />
      </header>
      <body>
        <div className="Carousel">
          <h1>Carousel</h1>
        </div>
        <div className="Product-card">
          <h1>Product Card container</h1>
        </div>
      </body>
    </div>
  );
}

export default Home;
