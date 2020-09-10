import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './userFormLine.css';

const urlBack = process.env.REACT_APP_API_URL;

export default function userFormAdmin(props) {
{/*props.userInfo.name*/}
const id = props.userInfo.id;
const name = props.userInfo.name;
const email = props.userInfo.email;
const password = props.userInfo.password;
const rol = props.userInfo.rol;

const handleEdit = event => {
	event.preventDefault();
}

const handleDelete = event => {
	event.preventDefault();
}

	return (
		<div className="userFormLine">
			<form className="userLine" ref={id}>
				<input type="text" id={name} name={name} value={name} readonly></input>
				<input type="text" id={email} name={email} value={email} readonly></input>
				<input type="text" id={password} name={password} value={password} readonly></input>
				<input type="text" id={rol} name={rol} value={rol} readonly></input>
				<button type="submit" className="editBtn" value="Edit" onClick={handleEdit}>
					Editar
				</button>
				<button type="submit" className="deletBtn" value="Delete" onClick={handleDelete}>
					Eliminar
				</button>
			</form>
		</div>
	);
}
