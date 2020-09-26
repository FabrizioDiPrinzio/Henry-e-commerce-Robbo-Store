import React, {useState, useEffect} from 'react';
import UserFormLine from './userFormLine/UserFormLine.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './userFormAdmin.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
// ------ Fin de imports -----------

const urlBack = process.env.REACT_APP_API_URL;

export default function UserFormAdmin() {
	// React Hooks
	const [userList, setUserList] = useState([]);
	const [reloadData, setReloadData] = useState(false)

	const superReload = () => {
		console.log('super Reload ha sido invocada')
		setReloadData(!reloadData)
	};

	// ----------------- Functionality -------------
	useEffect(() => {
		axios.get(`${urlBack}/user`).then(response => {
			setUserList(response.data);
		});
	}, [reloadData]);

	return (
		<div className="userFormAdmin">
			<Link className="goBackBtn" to="/admin/">
				<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.427 3.021h-7.427v-3.021l-6 5.39 6 5.61v-3h7.427c3.071 0 5.561 2.356 5.561 5.427 0 3.071-2.489 5.573-5.561 5.573h-7.427v5h7.427c5.84 0 10.573-4.734 10.573-10.573s-4.733-10.406-10.573-10.406z"/></svg>
			</Link>
			<h3>Usuarios</h3>
			<div className="userTableTitleContainer">
				<div className="userTableTitle">
					<div className="tableTitle"><h5>Nombre</h5></div>
					<div className="tableTitle"><h5>Email</h5></div>
					<div className="tableTitle"><h5>Rol</h5></div>
					<div className="tableTitle"><h5>Editar/Eliminar</h5></div>
				</div>
			</div>
			<div className="userListContainer">
				<div className="userList">
					{userList &&
						userList.map(user => (
							<div className="listItem" key={user.id}>
								<UserFormLine userInfo={user} superReload={superReload}/>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
