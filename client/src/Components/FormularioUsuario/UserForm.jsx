import React, {useState} from 'react';
// import {allActions} from '../../Redux/Actions/actions';
// import {useSelector, useDispatch} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './UserForm.css';
import RegisterForm from './RegisterForm/RegisterForm';
import LoginForm from './LoginForm/LoginForm';
//------ Fin de imports -----

export default function FormularioCategoria() {
	const [hasAccount, setHasAccount] = useState(false);

	const switchForms = () => setHasAccount(!hasAccount);

	return (
		<div className="formContainer">
			{!hasAccount && <RegisterForm />}
			<br />
			{!hasAccount && (
				<p>
					¿Ya tienes una cuenta? {' '}
					<a href="#" onClick={switchForms}>
						Inicia sesión.
					</a>
				</p>
			)}

			{hasAccount && <LoginForm />}
			<br />
			{hasAccount && (
				<p>
					¿No tienes una cuenta?{' '}
					<a href="#" onClick={switchForms}>
						Crea una.
					</a>
				</p>
			)}
		</div>
	);
}
