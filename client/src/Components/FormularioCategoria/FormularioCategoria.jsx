import React, {useState, useRef} from 'react';
import {allActions} from '../../Redux/Actions/actions';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {success, failure} from '../../multimedia/SVGs';
import './FormularioCategoria.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
//------ Fin de imports -----

const urlBack = process.env.REACT_APP_API_URL;

export default function FormularioCategoria() {
	//=====================   redux state    ==================== //

	const categories = useSelector(state => state.categories.allCategories);
	const dispatch = useDispatch();

	//=====================   react-component state    ==================== //

	const [inputValues, setInputValues] = useState({id: 0, name: '', description: ''});
	const [selectedCategoryId, setSelectedCategoryId] = useState(0);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const lista = useRef(0);

	// ==================== auxiliary function ==================== //

	const resetFields = () => {
		setSelectedCategoryId(0);
		lista.current.value = 0;
		setInputValues({id: 0, name: '', description: ''});

		dispatch(allActions.categoryActions.getAllCategories());
	};

	// ================== component event handlers ================ //

	const handleInputChange = event => {
		if (successMessage) setSuccessMessage('');
		if (errorMessage) setErrorMessage('');
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
			.then(() => {
				setSuccessMessage('Categoría agregada');
				resetFields();
			})
			.catch(error => setErrorMessage('No se pudo crear la categoria: ' + error.response.data));
	};

	// Deletes the selected category
	const handleDelete = event => {
		event.preventDefault();

		axios
			.delete(`${urlBack}/products/category/${selectedCategoryId}`)
			.then(() => {
				setSuccessMessage('Categoría eliminada');
				resetFields();
			})
			.catch(error =>
				setErrorMessage('No se pudo eliminar la categoria: ' + error.response.data)
			);
	};

	// Edits the selected category
	const handleEdit = event => {
		event.preventDefault();

		axios
			.put(`${urlBack}/products/category/${selectedCategoryId}`, inputValues)
			.then(() => {
				setSuccessMessage('Categoría editada');
				resetFields();
			})
			.catch(error => setErrorMessage('No se pudo editar la categoria: ' + error.response.data));
	};

	return (
		<form className="form" onSubmit={handleAdd}>
				<div classname="catTitleCont">
					<Link className="goBackBtn" to="/admin/">
						<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.427 3.021h-7.427v-3.021l-6 5.39 6 5.61v-3h7.427c3.071 0 5.561 2.356 5.561 5.427 0 3.071-2.489 5.573-5.561 5.573h-7.427v5h7.427c5.84 0 10.573-4.734 10.573-10.573s-4.733-10.406-10.573-10.406z"/></svg>
					</Link>
					<h3 className="Userstitle">Agregar Categorías</h3>
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
				<button type="submit" className="addCatBtn" value="Enviar" onClick={handleAdd}>
					Agregar
				</button>

				<div>
					<br />
					<h4>Editar / Eliminar Categorías</h4>
					<div className="botonOpcion">
						<select ref={lista} id="select" onChange={handleSelectChange}>
							<option selected value="0">
								Categorías...
							</option>

							{categories.map(categoria => {
								return <option value={categoria.id}>{categoria.name}</option>;
							})}
						</select>
						<button
							type="submit"
							className="editCatBtn"
							value="Editar"
							onClick={handleEdit}>
							Editar
						</button>

						<button
							type="submit"
							className="deleteCatBtn"
							value="Eliminar"
							onClick={handleDelete}
						>
							Eliminar
						</button>
						{errorMessage && (
							<div className="error">
								{failure} {errorMessage} <br />
							</div>
						)}
						{successMessage && (
							<div className="success">
								{success} {successMessage} <br />
							</div>
						)}
						<br/>
						
					</div>
				</div>
			</div>
		</form>
	);
}
