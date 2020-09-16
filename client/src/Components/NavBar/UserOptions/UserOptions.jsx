import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {allActions} from '../../../Redux/Actions/actions';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;

export default function UserOptions() {
	// Redux
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const logout = () => {
		axios
			.post(`${urlBack}/auth/logout`)
			.then(() => {
				dispatch(allActions.userActions.logOut());
				dispatch(allActions.cartActions.emptyCart());
			})
			.catch(error => alert('Algo salió mal: ', error.response.data));
	};

	return (
		<div className="form">
			{user.rol === 'Admin' && (
				<Link to="/admin">
					<h3>Admin control panel</h3>
				</Link>
			)}
			<Link to={`user/${user.id}`}> Mi perfil </Link>
			<br />
			<a href="#" onClick={logout}>
				Cerrar sesión
			</a>
		</div>
	);
}
