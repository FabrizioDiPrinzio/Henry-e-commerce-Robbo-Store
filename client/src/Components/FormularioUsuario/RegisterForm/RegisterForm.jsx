import React, {useState, useRef} from 'react';
import {openEye, closedEye, success, failure} from '../../../multimedia/SVGs';
import 'bootstrap/dist/css/bootstrap.css';
import '../UserForm.css';
import axios from 'axios';
//------ Fin de imports -----

const urlBack = process.env.REACT_APP_API_URL;

export default function RegisterForm() {
	// React Hooks
	const [hidePassword, setHidePassword] = useState(true);
	const [hideConfirmedPassword, setHideConfirmedPassword] = useState(true);
	const [error, setError] = useState('');
	const [registered, setRegistered] = useState('');
	const [inputValues, setInputValues] = useState({
		name: null,
		rol: 'Client',
		email: null,
		password: null,
		confirmPassword: null
	});

	const formulario = useRef(null);

	// ------- Functionality

	const revealPassword = () => setHidePassword(!hidePassword);
	const revealConfirmedPassword = () => setHideConfirmedPassword(!hideConfirmedPassword);

	const onEnterKey = e => {
		if (e.key === 'Enter') handleRegister(e);
	};

	const handleInputChange = event => {
		if (error) setError('');
		if (registered) setRegistered('');
		setInputValues({...inputValues, [event.target.name]: event.target.value});
	};

	const handleRegister = async event => {
		event.preventDefault();

		if (inputValues.password !== inputValues.confirmPassword) {
			return setError('Las contraseñas no coinciden');
		}

		try {
			const user = await axios.post(`${urlBack}/user/signup`, inputValues);

			await axios.post(`${urlBack}/user/${user.data.id}/cart`);

			setRegistered('Usuario registrado correctamente');
			setInputValues({name: null, rol: 'Client', email: null, password: null});
			formulario.current.reset();
		} catch (error) {
			setError(error.response.data);
		}
	};

	return (
		<form className="form" onSubmit={handleRegister} ref={formulario}>
			<br />
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
				onKeyPress={onEnterKey}
			/>
			<br />

			<label htmlFor="Email" className="">
				Email:
			</label>
			<input
				className="form-control"
				type="email"
				name="email"
				value={inputValues.email}
				placeholder="Email"
				onChange={handleInputChange}
				onKeyPress={onEnterKey}
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
					onKeyPress={onEnterKey}
				/>
				{hidePassword && (
					<i className="eye" onClick={revealPassword}>
						{openEye}
					</i>
				)}
				{!hidePassword && (
					<i className="eye" onClick={revealPassword}>
						{closedEye}
					</i>
				)}
			</div>
			<br />
			<label htmlFor="nombre">Confirmar contraseña:</label>
			<div className="password-wrapper">
				<input
					className="form-control"
					type={hideConfirmedPassword ? 'password' : 'text'}
					name="confirmPassword"
					placeholder="Contraseña"
					value={inputValues.confirmPassword}
					onChange={handleInputChange}
				/>
				{hideConfirmedPassword && (
					<i className="eye" onClick={revealConfirmedPassword}>
						{openEye}
					</i>
				)}
				{!hideConfirmedPassword && (
					<i className="eye" onClick={revealConfirmedPassword}>
						{closedEye}
					</i>
				)}
			</div>
			<br />

			<button type="submit" className="addBtn" value="Enviar" onClick={handleRegister}>
				Registrarse
			</button>
			<br />
			<br />
			{error && (
				<div className="error">
					{failure} {error} <br />
				</div>
			)}
			{registered && (
				<div className="success">
					{success} {registered} <br />
				</div>
			)}
		</form>
	);
}
