import React, {useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {allActions} from '../../../Redux/Actions/actions';
import 'bootstrap/dist/css/bootstrap.css';
import '../UserForm.css';
import axios from 'axios';
//------ Fin de imports -----

const urlBack = process.env.REACT_APP_API_URL;

export default function RegisterForm() {
	// Redux
	const dispatch = useDispatch();

	// React Hooks
	const [hidePassword, setHidePassword] = useState(true);
	const [inputValues, setInputValues] = useState({
		email: null,
		password: null
	});

	const formulario = useRef(0);

	// ------------ Functionality ---------

	const revealPassword = () => setHidePassword(!hidePassword);

	const handleInputChange = event => {
		setInputValues({...inputValues, [event.target.name]: event.target.value});
	};

	const handleAdd = event => {
		event.preventDefault();

		axios
			.post(`${urlBack}/auth/login`, inputValues)
			.then(res => {
				alert(`Bienvenido, ${res.data.name}`);
				dispatch(allActions.userActions.login(res.data));
			})
			.catch(error => alert(error.response.data));

		console.log(inputValues);
	};

	return (
		<form className="form" onSubmit={handleAdd} ref={formulario}>
			<h3 className="titulo">Iniciar sesión</h3>
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
			<div className="password-wrapper">
				<input
					className="form-control"
					type={hidePassword ? 'password' : 'text'}
					name="password"
					placeholder="Contraseña"
					value={inputValues.password}
					onChange={handleInputChange}
				/>
				{hidePassword && (
					<i onClick={revealPassword}>
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 16 16"
							class="bi bi-eye"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"
							/>
							<path
								fill-rule="evenodd"
								d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
							/>
						</svg>
					</i>
				)}
				{!hidePassword && (
					<i onClick={revealPassword}>
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 16 16"
							class="bi bi-eye-slash"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
							<path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
							<path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709z" />
							<path
								fill-rule="evenodd"
								d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z"
							/>
						</svg>
					</i>
				)}
			</div>

			<button type="submit" className="addBtn" value="Enviar" onClick={handleAdd}>
				Iniciar sesión
			</button>
			<br />
		</form>
	);
}
