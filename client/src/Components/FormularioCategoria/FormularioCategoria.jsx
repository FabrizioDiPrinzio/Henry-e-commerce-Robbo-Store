import React from 'react';
import './FormularioCategoria.css';
import {Link} from 'react-outer-dom';
import 'bootstrap/dist/css/bootstrap.css';
//------ Fin de imports -----

export default function FormularioCategoria() {
	return (
		<div className="container">
			<form className="form">
				<h3 className="titulo">Agregar - Categorías</h3>
				<label htmlFor="nombre" className="">
					Nombre
				</label>
				<input
					className="form-control"
					type="text"
					name="nombre"
					placeholder="Categoria"
					onChange=""
				/>
				<br />
				<Link to={'/categorias/agregar-categoria'}>
					<button type="submit" className="" value="Enviar" onClick="">
						Enviar
					</button>
				</Link>
				<Link to={'/categorias/cancelar-categoria'}>
					<button type="button" className="" value="Cancelar" onClick="">
						Cancelar
					</button>
				</Link>
			</form>
		</div>
	);
}
