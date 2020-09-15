import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {allActions} from '../../../Redux/Actions/actions';

export default function UserOptions() {
	// Redux
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const logout = () => {
		alert('Sesión cerrada');
		dispatch(allActions.cartActions.emptyCart());
		dispatch(allActions.userActions.logOut());
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
