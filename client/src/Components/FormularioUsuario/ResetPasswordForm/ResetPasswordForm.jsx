import React, {useState} from 'react';
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
	const [inputValues, setInputValues] = useState({
		email: null,
		password: null,
		confirmPassword: null
	});

	// ------- Functionality

	const revealPassword = () => setHidePassword(!hidePassword);
	const revealConfirmedPassword = () => setHideConfirmedPassword(!hideConfirmedPassword);

	const handleInputChange = event => {
		setInputValues({...inputValues, [event.target.name]: event.target.value});
	};

	const handleSend = async event => {
		event.preventDefault();

		if (inputValues.password !== inputValues.confirmPassword) {
			return alert('Las contraseñas no coinciden');
		}
	};

	return (
		<form className="form" onSubmit={handleSend}>
			<br />
			<h3 className="titulo">Cambiar contraseña</h3>
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
				{hidePassword && <i onClick={revealPassword}>{openEye}</i>}
				{!hidePassword && <i onClick={revealPassword}>{closedEye}</i>}
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
				{hideConfirmedPassword && <i onClick={revealConfirmedPassword}>{openEye}</i>}
				{!hideConfirmedPassword && <i onClick={revealConfirmedPassword}>{closedEye}</i>}
			</div>
			<br />

			<button type="submit" className="addBtn" value="Enviar" onClick={handleSend}>
				Cambiar contraseña
			</button>
			<br />
		</form>
	);
}
