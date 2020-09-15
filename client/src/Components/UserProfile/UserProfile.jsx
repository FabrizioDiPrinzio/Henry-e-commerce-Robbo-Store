import React from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import './UserProfile.css';

export default function UserProfile() {
	const user = useSelector(state => state.user);
	const {id} = useParams();

	if (user.id !== Number(id)) {
		return (
			<div className="profile">
				<h1>¡Estás viendo el perfil de otra persona!</h1>
				<h1>Ver sus reseñas</h1>
			</div>
		);
	}

	return (
		<div className="profile">
			<h1> Ver mi historial de compras </h1>
			<h1> Ver mis reseñas </h1>
			<p>¿Alguna otra opción?</p>
		</div>
	);
}
