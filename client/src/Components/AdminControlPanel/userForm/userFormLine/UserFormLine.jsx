import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './userFormLine.css';


export default function userFormAdmin() {

	return (
		<div className="userFormLine">
      <span> Nombre Apellido </span>
      <span> email@email.com </span>
      <span> password </span>
      <span> Cliente </span>
      <div className='userActionContainer'>
        <button type="button" class="btn btn-primary btn-sm">Editar</button>
        <button type="button" class="btn btn-danger btn-sm">Eliminar</button>
      </div>

		</div>
	);
}
