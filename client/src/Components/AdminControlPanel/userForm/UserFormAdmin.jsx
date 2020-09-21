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
			<h2> Panel de Control de Usuarios </h2>
			<div className="userTableTitleContainer">
				<div className="userTableTitle">
					<h4>Nombre</h4>
					<h4>Email</h4>
					<h4>Rol</h4>
					<h4>Action</h4>
				</div>
			</div>
			<div className="userListContainer">
				<ul className="userList">
					{userList &&
						userList.map(user => (
							<li className="listItem" key={user.id}>
								<UserFormLine userInfo={user} />
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}
