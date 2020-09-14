import React, {useState, useEffect, useRef, useCallback} from 'react';
import {allActions} from '../../Redux/Actions/actions';
import {useSelector, useDispatch} from 'react-redux';
import './FormularioCategoria.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
//------ Fin de imports -----

const urlBack = process.env.REACT_APP_API_URL;

export default function FormularioCategoria() {

	//=====================   redux state    ==================== //
	
	const categories = useSelector(state => state.categories.allCategories);
	const dispatch = useDispatch();

	//=====================   react-component state    ==================== //

	const [inputValues, setInputValues] = useState({id: 0, name: '', description: ''});
	const [selectedCategoryId, setSelectedCategoryId] = useState(0);
	const lista = useRef(0);

	// ==================== auxiliary function ==================== //

	const axiosPetitionHandler = (response) => {

		alert(response.statusText);
		setSelectedCategoryId(0);
		lista.current.value = 0;
		setInputValues({id: 0, name: '', description: ''})
		
		dispatch(allActions.categoryActions.getAllCategories());
	};

	// ================== component event handlers ================ //
	
	const handleInputChange = event => {
		setInputValues({...inputValues, [event.target.name]: event.target.value});
	};

	const handleSelectChange = event => {
		let selectedId = parseInt(event.target.value);
		setSelectedCategoryId(selectedId);

		if (selectedId !== 0) {
			let currentCategory = categories.find(c => c.id === selectedId);
			setInputValues(currentCategory);
		}
		else {
			setInputValues({id: 0, name: '', description: ''});
		}
	};

	// Creates a new category
	const handleAdd = event => {
		event.preventDefault();

		axios
			.post(`${urlBack}/products/category`, {...inputValues, id: null})
			.then(response => axiosPetitionHandler(response))
			.catch(error => alert('No se pudo crear la categoria: ' + error.response.data));

	};

	// Deletes the selected category
	const handleDelete = event => {
		event.preventDefault();

		axios
			.delete(`${urlBack}/products/category/${selectedCategoryId}`)
			.then(response => axiosPetitionHandler(response))
			.catch(error => alert('No se pudo eliminar la categoria: ' + error.response.data));

	};

	// Edits the selected category
	const handleEdit = event => {
		event.preventDefault();

		axios
			.put(`${urlBack}/products/category/${selectedCategoryId}`, inputValues)
			.then(axiosPetitionHandler(response => axiosPetitionHandler(response)))
			.catch(error => alert('No se pudo editar la categoria: ' + error.response.data));

	};

	return (
		<form className="form" onSubmit={handleAdd}>
			<div className="container">
				<h3 className="titulo">Agregar Categorías</h3>
				<br />
				<label htmlFor="nombre">Nombre:</label>
				<input
					className="form-control"
					type="text"
					name="name"
					value={inputValues.name}
					placeholder="Categoria"
					onChange={handleInputChange}
				/>
				<br />
				<label htmlFor="descripcion" className="">
					Descripción:
				</label>
				<textarea
					className="form-control"
					name="description"
					value={inputValues.description}
					placeholder="Ingrese una descripción de la categoría"
					onChange={handleInputChange}
				/>
				<button type="submit" className="addBtn" value="Enviar" onClick={handleAdd}>
					Agregar
				</button>

				<div>
					<br />
					<h4>Editar / Eliminar Categorías</h4>
					<div className={'botonOpcion'}>
						<select ref={lista} id="select" onChange={handleSelectChange}>
							<option selected value="0">
								Categorías...
							</option>

							{categories.map(categoria => {
								return <option value={categoria.id}>{categoria.name}</option>;
							})}

						</select>
						<button type="submit" className="editBtn" value="Editar" onClick={handleEdit}>
							Editar
						</button>

						<button
							type="submit"
							className="deleteBtn"
							value="Eliminar"
							onClick={handleDelete}
						>
							Eliminar
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}
