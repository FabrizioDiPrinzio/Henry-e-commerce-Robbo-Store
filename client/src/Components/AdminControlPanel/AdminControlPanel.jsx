import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './adminControlPanel.css';
import {PCIcon, formIcon, usersIcon, purseIcon} from '../../multimedia/SVGs';
import {Link} from 'react-router-dom';
// =========== FIN DE IMPORTS ============

export default function controlPanel() {
	return (
		<div className="controlPanel">
			<h1 className="CPTitle">Panel de Control</h1>
			<div className="centerColumn">
				<Link className="CPButtons CPText white-link" to="/product_form">
					{PCIcon}
					<h3>Agregar/editar productos</h3>
				</Link>
				<Link className="CPButtons CPText white-link" to="/category_form">
					{formIcon}
					<h3>Agregar/editar categorías</h3>
				</Link>
				<Link className="CPButtons CPText white-link" to="/admin/users/">
					{usersIcon}
					<h3>Usuarios</h3>
				</Link>
				<Link className="CPButtons CPText white-link" to="/admin/purchase_orders/">
					{purseIcon}
					<h3>Órdenes de compra</h3>
				</Link>
			</div>
		</div>
	);
}
