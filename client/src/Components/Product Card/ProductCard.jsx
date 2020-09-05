import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './ProductCard.css';


export default function ProductCard({robot}) {
	
	const [en, setCarrito] = useState({
		carrito : 0
	});

	return (

	<div className='cardContainer'>
		<div className='imageContainer'>
			<img className='image' src={robot.image} alt={robot.name} />
		</div>
		<div  className='infoContainer' >
				<Link to={`/producto/${robot.id}`} >
				<div className='title'><h3>{robot.name}</h3></div>
				</ Link>
				<div className='body'>
					<div className='price'><b> Precio : </b> U$S {robot.price}</div>
					<div className='stock'><b> Stock : </b>{robot.stock <= 0 ? 'Out of stock!' : robot.stock}</div>
				</div>
		</div>
		<div className='control'>			
			<div className='carrito'>
				En carrito: <br/> 
				<input type="text" className='cant' value= {en.carrito}></input>
			</div>
			<div className="botones">
				<div className='butonContainer'>
					<div className='boton add' onClick={() => setCarrito({...en, carrito : en.carrito +1})} >
						<div className='iconButtom'>
							+
						</div>
					</div>
				</div>
				<div className='butonContainer'>
					<div className='boton rest' onClick={() => setCarrito({...en, carrito : en.carrito > 0 ? en.carrito -1 : 0})}>
						<div className='iconButtom'>
							-
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	);
}
