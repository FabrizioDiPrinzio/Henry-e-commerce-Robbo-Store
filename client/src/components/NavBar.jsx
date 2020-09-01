import React from 'react';
import './navBar.css';

export default function NavBar(props) {

  return (
    <div>
      <nav className="NavBar">
        <a className="Title">Robbo Store</a>
        <button className="SignUp-LogIn">SignUp/LogIn</button>
        <button className="Cart">Cart</button>
      </nav>
      <div className="SearchBar">
        <button className="Categorias">(Categorías deplegable?)</button>
        <input className="SearchBar" type="text" placeholder='Buscar...'/>
        <button onClick={()=> props.onSearch("Buscando robot...")}>Buscar</button>
      </div>
    </div>
  );
}
