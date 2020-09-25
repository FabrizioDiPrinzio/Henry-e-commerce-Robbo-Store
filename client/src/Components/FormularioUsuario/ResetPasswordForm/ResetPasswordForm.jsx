import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
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
	const [resetPassword, setResetPassword] = useState('');
	const [inputValues, setInputValues] = useState({
		email: null,
		password: null,
		confirmPassword: null
	});
	const {token} = useParams();

	// ------- Functionality

	const revealPassword = () => setHidePassword(!hidePassword);
	const revealConfirmedPassword = () => setHideConfirmedPassword(!hideConfirmedPassword);

	const onEnterKey = e => {
		if (e.key === 'Enter') handleSend(e);
	};

	const handleInputChange = event => {
		if (error) setError('');
		if (resetPassword) setResetPassword('');
		setInputValues({...inputValues, [event.target.name]: event.target.value});
	};

	const handleSend = event => {
		event.preventDefault();

		const {email, password, confirmPassword} = inputValues;

		// Guard clauses
		if (!email || !password || !confirmPassword)
			return setError('Debes completar todos los campos');
		if (password !== confirmPassword) return setError('Las contraseñas no coinciden');

		axios
			.patch(`${urlBack}/auth/reset`, {...inputValues, token})
			.then(() => setResetPassword('La contraseña se actualizó con éxito'))
			.catch(() => setError('No se pudo actualizar la contraseña'));
	};

	return (
		<div>
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
						onKeyPress={onEnterKey}
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

				<button type="submit" className="addBtn" value="Enviar" onClick={handleSend}>
					Cambiar contraseña
				</button>
				<br />
				<br />

				{error && (
					<div className="error">
						{failure} {error} <br />
					</div>
				)}
				{resetPassword && (
					<div className="success">
						{success} {resetPassword} <br />
					</div>
				)}
			</form>
			<br />
		</div>
	);
}
