import React, {useState} from 'react';
// import {allActions} from '../../Redux/Actions/actions';
// import {useSelector, useDispatch} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './UserForm.css';
import RegisterForm from './RegisterForm/RegisterForm';
import LoginForm from './LoginForm/LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm/ForgotPasswordForm';
//------ Fin de imports -----

export default function FormularioCategoria() {
	const [showForm, setShowForm] = useState('Register');

	return (
		<div className="formContainer">
			{showForm === 'Register' && (
				<div>
					<RegisterForm />
					<br />
					<p>
						¿Ya tienes una cuenta? {' '}
						<a href="#" onClick={() => setShowForm('Login')}>
							Inicia sesión.
						</a>
					</p>
				</div>
			)}

			{showForm === 'Login' && (
				<div>
					<LoginForm />
					<p>
						¿No tienes una cuenta?{' '}
						<a href="#" onClick={() => setShowForm('Register')}>
							Crea una.
						</a>
					</p>
					<p>
						<a href="#" onClick={() => setShowForm('Forgot')}>
							¿Olvidaste tu contraseña?
						</a>
					</p>
				</div>
			)}

			{showForm === 'Forgot' && <ForgotPasswordForm />}
		</div>
	);
}
