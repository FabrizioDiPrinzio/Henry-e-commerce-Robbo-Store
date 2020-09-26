import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {allActions} from '../../../Redux/Actions/actions';
import axios from 'axios';
import './UserOptions.css';

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
		<div className="userOpForm">
			{user.rol === 'Admin' && (
				<div className="CPButton">
					<div className="CPIcon">
						{/*<svg
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24">
							<path d="M6 2l1.171.203c-.355 2.245.791 2.519 2.699 2.874 1.468.273 3.13.622 3.13 3.284v.639h-1.183v-.639c0-1.556-.48-1.809-2.164-2.122-2.583-.48-4.096-1.391-3.653-4.239zm16 10h-20v8h20v-8zm2-2v12h-24v-12h24zm-14 5h-2v-2h-2v2h-2v2h2v2h2v-2h2v-2zm3 3h-2v1h2v-1zm4-2c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm3 0c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1z"/>
						</svg>*/}
						<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 18c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zm-14-3c-1.654 0-3 1.346-3 3s1.346 3 3 3h14c1.654 0 3-1.346 3-3s-1.346-3-3-3h-14zm19 3c0 2.761-2.239 5-5 5h-14c-2.761 0-5-2.239-5-5s2.239-5 5-5h14c2.761 0 5 2.239 5 5zm-17-14c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-2-1c-1.654 0-3 1.346-3 3s1.346 3 3 3h14c1.654 0 3-1.346 3-3s-1.346-3-3-3h-14zm19 3c0 2.761-2.239 5-5 5h-14c-2.761 0-5-2.239-5-5s2.239-5 5-5h14c2.761 0 5 2.239 5 5z"/></svg>
						</div>
					<Link className="CPText" to="/admin">
						Panel de Control
					</Link>
				</div>
			)}
			<Link className="myProfileBtn" to={`/user/${user.id}`}> Mi perfil </Link>
			<a className="closeSessBtn" href="#" onClick={logout}>
				Cerrar sesión
			</a>
		</div>
	);
}
