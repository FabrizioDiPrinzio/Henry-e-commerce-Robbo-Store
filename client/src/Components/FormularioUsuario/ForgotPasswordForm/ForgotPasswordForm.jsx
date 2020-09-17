import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../UserForm.css';
import axios from 'axios';
//------ Fin de imports -----

const urlBack = process.env.REACT_APP_API_URL;

const success = (
	<svg
		width="1em"
		height="1em"
		viewBox="0 0 16 16"
		class="bi bi-check-circle"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fill-rule="evenodd"
			d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
		/>
		<path
			fill-rule="evenodd"
			d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
		/>
	</svg>
);

const failure = (
	<svg
		width="1em"
		height="1em"
		viewBox="0 0 16 16"
		class="bi bi-x-circle"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fill-rule="evenodd"
			d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
		/>
		<path
			fill-rule="evenodd"
			d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
		/>
	</svg>
);

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
