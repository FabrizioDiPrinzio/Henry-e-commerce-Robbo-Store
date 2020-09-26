import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './adminControlPanel.css';
import {Link} from 'react-router-dom';
// =========== FIN DE IMPORTS ============

export default function controlPanel() {
	return (
		<div className="controlPanel">
			<h1 className="CPTitle">Panel de Control</h1>
			<div className="centerColumn">
				<Link className="CPButtons CPText" to="/product_form">
					<svg className="iconBtn" fill="currentColor" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M20.025 16c2.196.014 3.975 1.801 3.975 4 0 2.208-1.793 4-4 4h-16c-2.208 0-4-1.792-4-4s1.792-4 4-4h16.025zm-.025 6c1.103 0 2-.896 2-2 0-1.1-.89-1.993-1.987-2h-16.013c-1.104 0-2 .896-2 2s.896 2 2 2h16zm-16-3c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm8 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-4 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm8 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm4 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm0-4h-16v-15h16v15zm-10-13h-4v11h12v-11h-4v5h-4v-5zm7 10h-4v-2h4v2z"/></svg>
					<h3>Agregar/editar productos</h3>
				</Link>
				<Link className="CPButtons CPText" to="/category_form">
					<svg className="iconBtn" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 11h-14v-2h14v2zm0 2h-14v2h14v-2zm0 4h-14v2h14v-2zm3-11v16h-20v-16h20zm2-6h-24v24h24v-24z"/></svg>
					<h3>Agregar/editar categorías</h3>
				</Link>
				<Link className="CPButtons CPText" to="/admin/users/">
					<svg className="iconBtn" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.644 17.08c2.866-.662 4.539-1.241 3.246-3.682-3.932-7.427-1.042-11.398 3.111-11.398 4.235 0 7.054 4.124 3.11 11.398-1.332 2.455.437 3.034 3.242 3.682 2.483.574 2.647 1.787 2.647 3.889v1.031h-18c0-2.745-.22-4.258 2.644-4.92zm-12.644 4.92h7.809c-.035-8.177 3.436-5.313 3.436-11.127 0-2.511-1.639-3.873-3.748-3.873-3.115 0-5.282 2.979-2.333 8.549.969 1.83-1.031 2.265-3.181 2.761-1.862.43-1.983 1.34-1.983 2.917v.773z"/></svg>
					<h3>Usuarios</h3>
				</Link>
				<Link className="CPButtons CPText" to="/admin/purchase_orders/">
					<svg className="iconBtn" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 7h-4v-3c0-2.209-1.791-4-4-4s-4 1.791-4 4v3h-4l-2 17h20l-2-17zm-11-3c0-1.654 1.346-3 3-3s3 1.346 3 3v3h-6v-3zm-4.751 18l1.529-13h2.222v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h6v1.5c0 .276.224.5.5.5s.5-.224.5-.5v-1.5h2.222l1.529 13h-15.502z"/></svg>
					<h3>Órdenes de compra</h3>
				</Link>
			</div>
		</div>
	);
}
