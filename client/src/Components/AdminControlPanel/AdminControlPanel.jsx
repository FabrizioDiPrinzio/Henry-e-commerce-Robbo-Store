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
				<Link className="CPButtons CPText" to="/product_form">
					<svg className="iconBtn" fill="currentColor" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M20.025 16c2.196.014 3.975 1.801 3.975 4 0 2.208-1.793 4-4 4h-16c-2.208 0-4-1.792-4-4s1.792-4 4-4h16.025zm-.025 6c1.103 0 2-.896 2-2 0-1.1-.89-1.993-1.987-2h-16.013c-1.104 0-2 .896-2 2s.896 2 2 2h16zm-16-3c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm8 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-4 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm8 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm4 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm0-4h-16v-15h16v15zm-10-13h-4v11h12v-11h-4v5h-4v-5zm7 10h-4v-2h4v2z"/></svg>
					<h3>Formulario de Productos</h3>
				</Link>
				<Link className="CPButtons CPText" to="/category_form">
					<svg className="iconBtn" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 11h-14v-2h14v2zm0 2h-14v2h14v-2zm0 4h-14v2h14v-2zm3-11v16h-20v-16h20zm2-6h-24v24h24v-24z"/></svg>
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
