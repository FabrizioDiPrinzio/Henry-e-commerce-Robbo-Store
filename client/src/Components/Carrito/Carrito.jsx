import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Carrito.css';
import ProductCard from '../Product Card/ProductCard.jsx';
import FormularioEnvioUser from '../FormularioEnvio/FormularioEnvioUser.jsx';

export default function Carrito() {
    const [product, setProduct] = useState([]);
    

    return(
        <div  className="containerCarrito">
            <div className="header">
                <h1>Carrito de compras</h1>
            </div>
            <ul className="list">
				{product &&
					product.map(bot => (
						<li className="listItem" key={bot.id}>
							<ProductCard robot={bot} />
						</li>
					))}
			</ul>
            
        <div className="containerComprar">
                <h3>Envio:</h3> 
                <h1>Total:</h1>
            </div>
            
            <button className="btnComprar">Comprar</button>
            
            <FormularioEnvioUser /> 
        </div>
    )
}