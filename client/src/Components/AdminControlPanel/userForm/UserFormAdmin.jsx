import React, {useState, useEffect} from 'react';
import UserFormLine from './userFormLine/UserFormLine.jsx';
import {returnArrow} from '../../../multimedia/SVGs';
import 'bootstrap/dist/css/bootstrap.css';
import './userFormAdmin.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
// ------ Fin de imports -----------

const urlBack = process.env.REACT_APP_API_URL;

export default function UserFormAdmin() {
	// React Hooks
	const [userList, setUserList] = useState([]);
	const [reloadData, setReloadData] = useState(false);

	const superReload = () => {
		console.log('super Reload ha sido invocada');
		setReloadData(!reloadData);
	};

	// ----------------- Functionality -------------
	useEffect(
		() => {
			axios.get(`${urlBack}/user`).then(response => {
				setUserList(response.data);
			});
		},
		[reloadData]
	);

	return (
		<div className="userFormAdmin">
			<Link className="goBackBtn" to="/admin/">
				{returnArrow}
			</Link>
			<h3>Usuarios</h3>
			<div className="userTableTitleContainer">
				<div className="userTableTitle">
					<div className="tableTitle">
						<h5>Nombre</h5>
					</div>
					<div className="tableTitle">
						<h5>Email</h5>
					</div>
					<div className="tableTitle">
						<h5>Rol</h5>
					</div>
					<div className="tableTitle">
						<h5>Editar/Eliminar</h5>
					</div>
				</div>
			</div>
			<div className="userListContainer">
				<div className="userList">
					{userList &&
						userList.map(user => (
							<div className="listItem" key={user.id}>
								<UserFormLine userInfo={user} superReload={superReload} />
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
