import React from 'react';
import UserFormLine from './userFormLine/UserFormLine.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import './userFormAdmin.css';


export default function userFormAdmin() {
  const userList = useSelector(state => state.users)
	return (
		<div className="userFormAdmin">
      <h1> Panel de Control de Usuarios </h1>
        <ul>
          <li>
          <UserFormLine user={user} />
          </li>
        </ul>
		</div>
	);
}
