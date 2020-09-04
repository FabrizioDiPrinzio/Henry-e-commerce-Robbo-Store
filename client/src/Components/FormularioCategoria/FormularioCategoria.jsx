import React, { useState, useEffect, useRef } from 'react';
import './FormularioCategoria.css';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
//------ Fin de imports -----

const urlBack = process.env.REACT_APP_API_URL;

export default function FormularioCategoria(props) {
	const [state, setState] = useState({
		"name": '',
		"description": ''
	});

	const referenciaForms = useRef(null);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		
		axios.post(`${urlBack}/products/category`, state)
		.then(response => alert(response.statusText))
		.catch(error => alert('no se pudo agregar la categoria'))

		referenciaForms.current.reset();
 	}

 	const handleImputChange = (event) => {
 		setState(
 			{
 				...state,
 				[event.target.name]: event.target.value
    		}
    	)
 	}

	return (

  		<form ref={referenciaForms} className="form" onSubmit={handleSubmit}>
			<div className="container">
					<h3 className="titulo">Agregar Categorías</h3>
					<label htmlFor="nombre" className="">
						Nombre
					</label>
        
					<input
						className="form-control"
						type="text"
						name="name"
						placeholder="Categoria"
						onChange={handleImputChange}
					/>

					<label htmlFor="descripcion" className="">
						Descripción
					</label>
        
					<textarea
						className="form-control"
						name="description"
						placeholder="Ingrese una Descripción de la Categoria"
						onChange={handleImputChange}
					></textarea>

					<br />
					<button type="submit" className="" value="Enviar" onClick={handleSubmit}>
						Enviar
					</button>
					</div>
			</form>  
  );
}