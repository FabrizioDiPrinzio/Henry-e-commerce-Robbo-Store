import React from 'react';
import './Carousel.css';

export default function Carousel() {

let botonDelante = document.querySelector('.btn delante')
let botonAtras = document.querySelector('.btn delante')

//Faltaria poner las imagenes como un estado interno de este componente, y al hacer click
//en delante y atrás, se cambiaría las imágenes

return (
					  	<div >
								    <div className="carousel">
										      <img clasName="img" src="https://mmtcdn.blob.core.windows.net/084395e6770c4e0ebc5612f000acae8f/mmtcdn/Products20549-640x640-592019517.jpg" />
										      <h3>Oferta Robot Alfa</h3>
										      <div className="btn delante"></div>
										      <div className="btn atras"></div>
								    </div>
					  	</div>
	)
}
