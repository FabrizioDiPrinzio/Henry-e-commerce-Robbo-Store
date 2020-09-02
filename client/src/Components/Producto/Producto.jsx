import React from 'react';
import './Producto.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
//------ Fin de imports -----

export default function Producto({titulo, descripcion, precio, cantidad}){

    return(
        <div className="Container">
            <div className="">
                <h1 className="">Robbors</h1>
                <Link to="/login">
                    <button className="">Login</button>
                </Link>
                <Link to="/carrito">
                  <button className="">Cart</button>
                </Link>
            </div>
            <div className="">
                <h3 className="">{titulo}</h3>
                <p className="">{descripcion}</p>
                <ul className="">
                    <li className="">{precio}</li>
                    <li className="">{cantidad}</li>
                </ul>
            </div>
        </div>
    )
}
