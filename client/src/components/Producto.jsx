import React from 'react';
import './Producto.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

export default function Producto({titulo, descripcion, precio, cantidad}){

    return(
        <div className="Container">
            <div className=""></div>
            <h1 className="">Robbors</h1>
            <button>Login</button>
            <button>Cart</button>
            <h3>{titulo}</h3>
            <p>{descripcion}</p>
            <ul>
                <li>{precio}</li>
                <li>{cantidad}</li>
            </ul>
        </div>
    )
}