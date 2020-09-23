import React from 'react';
import UserFormAdmin from './userForm/UserFormAdmin.jsx';
import PurchaseOrderForm from './PurchaseOrderForm/PurchaseOrderForm';
import 'bootstrap/dist/css/bootstrap.css';
import './adminControlPanel.css';
import {Link} from 'react-router-dom';
// =========== FIN DE IMPORTS ============

export default function controlPanel() {
	return (
		<div className="controlPanel">
			<div className="centerColumn">
				<Link to="/product_form">
					<h3>Formulario de Productos</h3>
				</Link>
				<Link to="/category_form">
					<h3>Formulario de Categorías</h3>
				</Link>
				<h1>Panel de Control</h1>
				<UserFormAdmin />
				<h2>Ordenes de Compra</h2>
				<PurchaseOrderForm />
			</div>
		</div>
	);
}
