import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Carrito.css';
import ProductCard from '../Product Card/ProductCard.jsx';

export default function Carrito() {
    const [product, setProduct] = useState([{
        name: 'robot1', 
        image:"https://www.cellshop.com/329023-large_default/boneco-hasbro-transformer-optimus-prime-e1897.jpg",
        price: 35,
        stock:10 
    },
{
    name: 'robot2', 
        image:"https://www.cellshop.com/329023-large_default/boneco-hasbro-transformer-optimus-prime-e1897.jpg",
        price: 40,
        stock:5 
},
{
    name: 'robot1', 
        image:"https://www.cellshop.com/329023-large_default/boneco-hasbro-transformer-optimus-prime-e1897.jpg",
        price: 305,
        stock:1 
}
]);
    

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
        </div>
    )
}