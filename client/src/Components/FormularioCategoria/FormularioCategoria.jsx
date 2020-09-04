import React from 'react';
import './FormularioCategoria.css';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
//------ Fin de imports -----

export default class FormularioCategoria extends React.Component {
	constructor(props) {
		super(props);
		this.state = {nombre: '', descripcion: ''};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const name = target.name;
		this.setState({
			[name]: target.value
		});
	}

	render() {
		return (
			<form className="form" onSubmit={() => this.props.onSend(this.state)}>
				<div className="container">
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
					<label htmlFor="descripcion" className="">
						Descripción
					</label>
					<textarea className="form-control" />
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
				</div>
			</form>
		);
	}
}
