import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import './FormularioCategoria.css';
import 'bootstrap/dist/css/bootstrap.css';
//------ Fin de imports -----

const urlBack = process.env.REACT_APP_API_URL;

export default function FormularioCategoria() {
	const [state, setState] = useState({name: '', description: ''});
	const [categories, setCategories] = useState([]);
	const [selected, setSelected] = useState({id: null});
	const referenciaForms = useRef(null);

	useEffect(() => {
		axios.get(`${urlBack}/products/category/names`).then(res => {
			const categoryTypes = res.data.map(c => ({
				name: c.name,
				id: c.id
			}));
			setCategories(categoryTypes);
			setSelected({id: categoryTypes[0] ? categoryTypes[0].id : null});
		});
	}, []);

	const handleInputChange = event => setState({...state, [event.target.name]: event.target.value});

	const handleSelectChange = event => setSelected({id: event.target.value});

	const handleAdd = event => {
		event.preventDefault();

		axios
			.post(`${urlBack}/products/category`, state)
			.then(response => alert(response.statusText))
			.catch(error => alert('no se pudo agregar la categoria: ' + error));

		referenciaForms.current.reset();
	};

	const handleDelete = event => {
		event.preventDefault();

		axios
			.delete(`${urlBack}/products/category/${selected.id}`)
			.then(response => alert(response.statusText))
			.catch(error => alert('no se pudo eliminar la categoria: ' + error.message));
	};

	const handleEdit = event => {
		event.preventDefault();

		axios
			.put(`${urlBack}/products/category/${selected.id}`, state)
			.then(response => alert(response.statusText))
			.catch(error => alert('no se pudo editar la categoria: ' + error.message));

		referenciaForms.current.reset();
	};

	return (
		<form ref={referenciaForms} className="form" onSubmit={handleAdd}>
			<div className="container">
				<h3 className="titulo">Agregar Categorías</h3>
				<br/>
				<label htmlFor="nombre">
					Nombre:
				</label>
				<input
					className="form-control"
					type="text"
					name="name"
					placeholder="Categoria"
					onChange={handleInputChange}
				/>
				<br/>
				<label htmlFor="descripcion" className="">
					Descripción:
				</label>
				<textarea
					className="form-control"
					name="description"
					placeholder="Ingrese una descripción de la categoría"
					onChange={handleInputChange}
				/>
				<button type="submit" className="addBtn" value="Enviar" onClick={handleAdd}>
					Agregar
				</button>

				<div>
				<br/>
					<h4>Editar / Eliminar Categorías</h4>
					<div className={'botonOpcion'}>
						<select id="select" onChange={handleSelectChange}>
							<option selected value="0"> Categorías... </option>
							{categories.map(categoria => {
								return <option value={categoria.id}>{categoria.name}</option>;
							})}
						</select>
						<button type="submit" className="editBtn" value="Editar" onClick={handleEdit}>
							Editar
						</button>

						<button type="submit" className="deleteBtn" value="Eliminar" onClick={handleDelete}>
							Eliminar
						</button>
					</div>
				</div>

			</div>
		</form>
	);
}
