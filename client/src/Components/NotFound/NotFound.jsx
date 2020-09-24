import React from 'react';
import Error404 from '../../multimedia/404mascota.svg';
import './NotFound.css';

export default function NotFound() {
	return (
		<div className="not-found">
			<img src={Error404} alt="404" />
		</div>
	);
}
