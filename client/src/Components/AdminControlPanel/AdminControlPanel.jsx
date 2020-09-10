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
					<h3>Product Form</h3>
				</Link>
				<Link to="/category_form">
					<h3>Category Form</h3>
				</Link>
				<h1> Control Panel </h1>
				<UserFormAdmin />
				<h1> Purchase Order Panel </h1>
				<PurchaseOrderForm />
			</div>
		</div>
	);
}
