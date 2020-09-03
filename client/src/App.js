import React from 'react';
import './App.css';
import Catalogo from './Components/Catalogo/Catalogo.jsx';
import NavBar from './Components/NavBar/NavBar.jsx';
import Home from './Components/Home/Home.jsx';
import Producto from './Components/Producto/Producto.jsx';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
	return (
		<div>
			<Router>
				<Route path="/" render={() => <NavBar onSearch={Robot => alert(Robot)} />} />
				<Route exact path="/" component={Home} />
				<Route exact path="/" component={Catalogo} />
				<Route exact path="/producto/:id" component={Producto} />
			</Router>
		</div>
	);
}

export default App;
