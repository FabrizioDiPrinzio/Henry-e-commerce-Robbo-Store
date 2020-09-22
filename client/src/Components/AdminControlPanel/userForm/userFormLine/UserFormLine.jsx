import React, {useState, useEffect} from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import 'bootstrap/dist/css/bootstrap.css';
import './userFormLine.css';
import axios from 'axios';
import {deleteButton, editButton, success} from '../../../../multimedia/SVGs';

const urlBack = process.env.REACT_APP_API_URL;

export default function UserFormAdmin(props) {
	//React Hooks
	const {id, name, email, rol} = props.userInfo;
	const [stateEdit, setStateEdit] = useState({edit: 'editClose'});
	const [tooltip, setTooltip] = useState('');

	const [inputValues, setInputValues] = useState({
		id,
		name,
		email,
		rol,
		password: ''
	});

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
			.then(() => {
				setTooltip('Se realizaron los cambios');
				setTimeout(() => setTooltip(''), 3000);
			})
			.catch(err => alert(err.response.data));
	};

	const handleDelete = event => {
		event.preventDefault();

		axios
			.delete(`${urlBack}/user/${id}`)
			.then(() => {
				setTooltip('Se eliminó el usuario');
				setTimeout(() => setTooltip(''), 3000);
			})
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
				<div className="inputTag" id={rol}>
					{rol}
				</div>
				<div className="userActionContainer">
					<button type="submit" className="editBtn" value="Edit" onClick={clickHandle}>
						{editButton}
					</button>

					<OverlayTrigger
						show={tooltip === 'Se eliminó el usuario'}
						overlay={
							<Tooltip>
								{success} {tooltip}
							</Tooltip>
						}
					>
						<button type="submit" className="deleteBtn" value="Delete" onClick={handleDelete}>
							{deleteButton}
						</button>
					</OverlayTrigger>

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
				<select className="inputTag" defaultValue={rol} onChange={handleSelectChange}>
					<option value="Usuario">Usuario</option>
					<option value="Admin">Admin</option>
				</select>
				<div calssName="userActionContainer">
					<OverlayTrigger
						show={tooltip === 'Se realizaron los cambios'}
						overlay={
							<Tooltip>
								{success} {tooltip}
							</Tooltip>
						}
					>
						<button type="submit" className="editBtn" value="Edit" onClick={handleEdit}>
							Aceptar
						</button>
					</OverlayTrigger>
				</div>
			</form>
		</div>
	);
}
