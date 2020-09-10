import React, {useState, useEffect, useRef, useCallback} from 'react';
import {allActions} from '../../Redux/Actions/actions';
import {useSelector, useDispatch} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './UserForm.css';
import axios from 'axios';
//------ Fin de imports -----

const urlBack = process.env.REACT_APP_API_URL;

export default function FormularioCategoria() {
  // const users = useSelector(state => state);
  // const dispatch = useDispatch();
	const [inputValues, setInputValues] = useState({name: null, rol: null, email: null, password: null});
  const formulario = useRef(0);

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
    
    const userFix = {...inputValues, rol: 'Client', }

    axios.post(`${urlBack}/user/signup`, userFix)
    .then(response => {
      alert(response.data.name + ' es ahora un nuevo Usuario');
      setInputValues({name: null, rol: null, email: null, password: null})
      formulario.current.reset();
		})
    .catch(error => alert('no se pudo registrar correctamente: ' + error.message)); // < ---- Limpiar todo y hacer un getCategories de redux
    
	};

	return (
    <div className="formContainer">
      <form className="form" onSubmit={handleAdd} ref={formulario}>
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

      </form>
    </div>
	);
}
