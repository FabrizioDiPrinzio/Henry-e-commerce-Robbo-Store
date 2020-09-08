import React, {useState, useEffect, useRef, useCallback} from 'react';
import {allActions} from '../../Redux/Actions/actions';
import {useSelector, useDispatch} from 'react-redux';
import './FormularioCategoria.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
//------ Fin de imports -----

const urlBack = process.env.REACT_APP_API_URL;

export default function FormularioCategoria() {
	const categories = useSelector(state => state.categories.allCategories);
  
	const [InputValues, setInputValues] = useState({name: '', description: ''});
 	const [selected, setSelected] = useState({id: null, name: null});
 	const [update, setUpdate] = useState(false);
	const lista = useRef(0);


  
	console.log(categories); // trae del store de redux el array con categorias.
	const dispatch = useDispatch();

	// Updates the category list whenever there's a change
	useEffect(
		() => {
			dispatch(allActions.categoryActions.getAllCategories());
		},
		[update]
	);

	// When a category is selected, it fills all the forms with the data of said category
	useEffect(
		() => {
			// axios.get(`${urlBack}/products/category/${selected.name}`).then(res => {
			// 	setInputValues({
			// 		name: res.data ? res.data.name : '',
			// 		description: res.data ? res.data.description : ''
			// 	});
      // });

      /*======================================================*/

      // console.log(categories)

      const cat = categories.find(c => c.id === parseInt(selected.id))
      console.log('selected when selected')
      console.log(selected)
      setInputValues({
        name: cat ? cat.name : '',
        description: cat ? cat.description : ''
      })

		},
		[selected]
	);

	// Updates the state when something is written in the forms
	const handleInputChange = event => setInputValues({...InputValues, [event.target.name]: event.target.value});

	// Sets which category is currently being selected
	const handleSelectChange = event => {
    setSelected({
			id: event.target.value,
			name: event.target.options[event.target.selectedIndex].text
		});
	};

	// Creates a new category
	const handleAdd = event => {
		event.preventDefault();

		axios
			.post(`${urlBack}/products/category`, InputValues)
			.then(response => {
				alert(response.statusText);
				setUpdate(!update);
				setSelected({id: null, name: null});
				lista.current.value = 0;
			})
			.catch(error => alert('no se pudo agregar la categoria: ' + error.message));
	};

	// Deletes the selected category
	const handleDelete = event => {
		event.preventDefault();

		axios
			.delete(`${urlBack}/products/category/${selected.id}`)
			.then(response => {
				alert(response.statusText);
				setUpdate(!update);
				setSelected({id: null, name: null});
				lista.current.value = 0;
			})
			.catch(error => alert('no se pudo eliminar la categoria: ' + error.message));
	};

	// Edits the selected category
	const handleEdit = event => {
		event.preventDefault();

		console.log('Input Values when edited')
		console.log(InputValues)

		dispatch(allActions.categoryActions.putCategory(parseInt(selected.id), InputValues));
		setUpdate(!update);
		setSelected({id: null, name: null});
		lista.current.value = 0;
		dispatch(allActions.categoryActions.getAllCategories());

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
					value={InputValues.name}
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
					value={InputValues.description}
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
              {/* categories en el primer render está vacío porque el useEffect es el que hace el dispatch del get*/}
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
