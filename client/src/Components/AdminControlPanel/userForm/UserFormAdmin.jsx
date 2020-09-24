import React, {useState, useEffect} from 'react';
import UserFormLine from './userFormLine/UserFormLine.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './userFormAdmin.css';
import axios from 'axios';
// ------ Fin de imports -----------

const urlBack = process.env.REACT_APP_API_URL;

export default function UserFormAdmin() {
	// React Hooks
	const [userList, setUserList] = useState([]);

	// ----------------- Functionality -------------
	useEffect(() => {
		axios.get(`${urlBack}/user`).then(response => {
			setUserList(response.data);
		});
	}, []);

	return (
		<div className="userFormAdmin">
			<h2>Usuarios</h2>
			<table className="userTableTitleContainer">
				<tr className="userTableTitle">
					<td><h5>Nombre</h5></td>
					<td><h5>Email</h5></td>
					<td><h5>Rol</h5></td>
					<td><h5>Editar/Eliminar</h5></td>
				</tr>
			</table>
			<div className="userListContainer">
				<table className="userList">
					{userList &&
						userList.map(user => (
							<tr className="listItem" key={user.id}>
								<UserFormLine userInfo={user} />
							</tr>
						))}
				</table>
			</div>
		</div>
	);
}
