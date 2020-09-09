import React, {useState, useEffect, useRef, useCallback} from 'react';
import {allActions} from '../../Redux/Actions/actions';
import {useSelector, useDispatch} from 'react-redux';
import './UserForm.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
//------ Fin de imports -----

const urlBack = process.env.REACT_APP_API_URL;

export default function FormularioCategoria() {
  // const users = useSelector(state => state);
  // const dispatch = useDispatch();
  
	const [inputValues, setInputValues] = useState({name: null, rol: null, email: null, password: null});

	useEffect(
		() => {
      // dispatch();
		},
		[]
	);
  const handleInputChange = event => {
    setInputValues({...inputValues, [event.target.name]: event.target.value});
  }

	// Creates a new category
	const handleAdd = event => {
		event.preventDefault();
	};

	const handleDelete = event => {
		event.preventDefault();
	};

	const handleEdit = event => {
		event.preventDefault();  
	};

	return (
    <div className="formContainer">
      <form className="form" onSubmit={handleAdd}>
				<h3 className="titulo">Registrarse</h3>
				<br />

				<label htmlFor="nombre">Nombre de Usuario:</label>
				<input
					className="form-control"
					type="text"
					name="name"
					value={inputValues.name}
					placeholder="Nombre de Usuario"
					onChange={handleInputChange}
				/>
				<br />

				<label htmlFor="Email" className="">
					Email:
				</label>
				<input
          className="form-control"
          type="text"
					name="email"
					value={inputValues.email}
					placeholder="Email"
					onChange={handleInputChange}
				/>
        <br />

        <label htmlFor="nombre">Contraseña:</label>
				<input
					className="form-control"
					type="password"
					name="password"
					value={inputValues.password}
					onChange={handleInputChange}
				/>
        <br />
				
				<button type="submit" className="addBtn" value="Enviar" onClick={handleAdd}>
					Registrarse
				</button>

				<div>
					<br />
					<h4>Editar / Eliminar Usuarios</h4>
					<div className={'botonOpcion'}>

						<select id="select">
							<option selected value="0">
								Usuarios...
							</option>
              {/* 
              {listaUsuarios.map(usuario => {
								return <option value={usuario.id}>{usuario.name}</option>;
              })} 
              */}
						</select>

						<button type="submit" className="editBtn" value="Editar" onClick={handleEdit}>
							Editar
						</button>

						<button type="submit" className="deleteBtn" value="Eliminar" onClick={handleDelete} >
							Eliminar
						</button>

					</div>
				</div>
      </form>
    </div>
	);
}
