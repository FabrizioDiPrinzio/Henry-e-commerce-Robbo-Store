import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Catalogo from './Components/Catalogo.jsx';
import Producto from './Components/Producto.jsx';
import NavBar from './Components/NavBar.jsx';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={NavBar} />

        <Route
          exact
          path="/producto"
          render={() => (
            <Producto
              titulo="ROBBERS" descripcion="Robot nuevo sin usar" precio="$999" cantidad="100"
            />
          )}
        />
      </Router>
    </div>
  );
}
