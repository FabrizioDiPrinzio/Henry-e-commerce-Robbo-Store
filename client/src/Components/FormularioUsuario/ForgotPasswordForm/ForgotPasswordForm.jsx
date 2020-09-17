import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {success, failure} from '../../../multimedia/SVGs';
import 'bootstrap/dist/css/bootstrap.css';
import '../UserForm.css';
import axios from 'axios';
//------ Fin de imports -----

const urlBack = process.env.REACT_APP_API_URL;

export default function ForgotPasswordForm() {
	// React Hooks
	const [inputValues, setInputValues] = useState({email: null});
	const [token, setToken] = useState('');
	const [error, setError] = useState('');

	// ------------ Functionality ---------

	const handleInputChange = event => {
		setInputValues({...inputValues, [event.target.name]: event.target.value});
	};

	const handleSend = event => {
		event.preventDefault();

		setToken('');
		setError('');

		axios
			.post(`${urlBack}/auth/forgot`, inputValues)
			.then(response => setToken(response.data))
			.catch(error => setError(error.response.data));
	};

	return (
		<div>
			<form className="form" onSubmit={handleSend}>
				<h3 className="titulo">Resetear contraseña</h3>
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
				/>
				<br />

				<button type="submit" className="addBtn" value="Enviar" onClick={handleSend}>
					Resetear contraseña
				</button>
				<br />
			</form>

			{token && (
				<div className="success">
					{success} Te hemos enviado un email con las instrucciones a seguir.
					<br />
					<p>(Haz de cuenta que esto es un email)</p>
					<p>
						Para reestablecer tu contraseña, haz click en el siguiente enlace:{' '}
						<Link to={`/reset/${token}`}>{`localhost:3000/reset/${token}`}</Link>
					</p>
				</div>
			)}

			{error && (
				<p className="error">
					{failure} {error}
				</p>
			)}
		</div>
	);
}
