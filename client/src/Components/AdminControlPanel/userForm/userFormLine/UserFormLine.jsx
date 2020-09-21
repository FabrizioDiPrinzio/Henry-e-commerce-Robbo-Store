import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './userFormLine.css';
import axios from 'axios';
import {deleteButton, editButton} from '../../../../multimedia/SVGs';

const urlBack = process.env.REACT_APP_API_URL;

export default function UserFormAdmin(props) {
	//React Hooks
	const {id, name, email, password, rol} = props.userInfo;

	const [inputValues, setInputValues] = useState({
		id,
		name,
		email,
		password,
		rol
	});

	const [stateEdit, setStateEdit] = useState({
		edit: 'editClose'
	});

	//const [selectedId, setSelectedId] = useState(0);

	// ----------- Funcionalidad ----------

	const handleInputChange = event => {
		setInputValues({...inputValues, [event.target.name]: event.target.value});
	};

	const clickHandle = event => {
		event.preventDefault();
		setStateEdit({
			...stateEdit,
			edit: stateEdit.edit === 'editClose' ? 'editOpen' : 'editClose'
		});
	};

	const handleSelectChange = event => {
		setInputValues({...inputValues, status: event.target.value});
	};

	const handleEdit = event => {
		event.preventDefault();

		axios
			.put(`${urlBack}/user/${id}`, inputValues)
			.then(() => alert('Se realizaron los cambios'))
			.catch(err => alert(err.response.data));
	};

	const handleDelete = event => {
		event.preventDefault();

		axios
			.delete(`${urlBack}/user/${id}`)
			.then(response => {
				alert(response.statusText);
			})
			//Algo para que se actualice
			.catch(error => alert('No se pudo eliminar el usuario: ' + error.response.data));
	};

	return (
		<div>
			<ul className="userFormLine">
				<div className="inputTag" id={name}>
					{name}
				</div>
				<div className="inputTag" id={email}>
					{email}
				</div>
				<div className="inputTag" id={password}>
					{password}
				</div>
				<div className="inputTag" id={rol}>
					{rol}
				</div>
				<div calssName="userActionContainer">
					<button type="submit" className="editBtn" value="Edit" onClick={clickHandle}>
						{editButton}
					</button>
					<button type="submit" className="UserFromLine-deleteBtn" value="Delete" onClick={handleDelete}>
						{deleteButton}
					</button>
				</div>
			</ul>
			<form className={stateEdit.edit}>
				<input
					className="inputTag"
					type="text"
					name="name"
					value={inputValues.name}
					onChange={handleInputChange}
				/>
				<input
					className="inputTag"
					type="text"
					name="email"
					value={inputValues.email}
					onChange={handleInputChange}
				/>
				<input
					className="inputTag"
					type="text"
					name="password"
					value={inputValues.password}
					onChange={handleInputChange}
				/>
				{/*<input className="inputTag" type="text" id={rol} value={inputValues.rol} onChange={handleInputChange}></input>*/}
				<select className="inputTag" defaultValue={rol} onChange={handleSelectChange}>
					<option value="Usuario">Usuario</option>
					<option value="Admin">Admin</option>
				</select>
				<div calssName="userActionContainer">
					<button type="submit" className="editBtn" value="Edit" onClick={handleEdit}>
						Aceptar
					</button>
				</div>
			</form>
		</div>
	);
}
