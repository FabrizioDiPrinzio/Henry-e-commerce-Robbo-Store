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

	const [categories, setCategories] = useState([]);

	const handleDelete =() =>{
		// categories.splice(i,1);
	}
	
	const handleEdit =() =>{
		// categories.splice(i,1);
	}

	useEffect(() => {
		axios.get(`${urlBack}/products/category/names`).then(res => {
			const resp = res.data.map(e => {
				return e.name;
			});
			setCategories(resp);
		});
	}, []);

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
					<div>
					<br/>
						<h3>Editar y eliminar Categorías</h3>
						<br/>

						<div className={'botonOpcion'} >
				<select name="select" >
					{categories.map((categoria,i) => {
						return (
							<option value={i}> {categoria}</option> 
						);
					})}				
					</select>
					<button type="submit" className=""  value="Editar"  onClick={handleEdit}> Editar </button>

					<button type="submit" className=""  value="Eliminar" onClick={() => this.handleDelete(i)}> Eliminar </button>
					</div>
				</div>
			</div>
		<div>
				
			</div>	
			</form>  
				
	);
}