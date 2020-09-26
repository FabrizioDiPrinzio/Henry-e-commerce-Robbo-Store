import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './PurchaseOrderForm.css';
import 'bootstrap/dist/css/bootstrap.css';
import PurchaseOrderFormLine from './PurchaseOrderFormLine/PurchaseOrderFormLine';
import {Link} from 'react-router-dom';

const urlBack = process.env.REACT_APP_API_URL;

export default function PurchaseOrderForm() {

	const [selectedStatus, setSelectedStatus] = useState('0');
	const [selectedOrders, setSelectedOrders] = useState([]);
	const [allOrders, setAllOrders] = useState([]);

	useEffect(() => {
		axios
			.get(`${urlBack}/orders`)
			.then(response => {
				setSelectedOrders(response.data);
				setAllOrders(response.data);
			})
			.catch(err => console.log(err.response.data));
	}, []);

	const handleSelectChange = event => {

		if (event.target.value !== "0") {
			setSelectedOrders(allOrders.filter(order => order.status === event.target.value));
		}
		else {
			setSelectedOrders(allOrders);
		}
	};

	return (
		<div className="productFormAdmin">
			<Link className="goBackBtn" to="/admin/">
				<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.427 3.021h-7.427v-3.021l-6 5.39 6 5.61v-3h7.427c3.071 0 5.561 2.356 5.561 5.427 0 3.071-2.489 5.573-5.561 5.573h-7.427v5h7.427c5.84 0 10.573-4.734 10.573-10.573s-4.733-10.406-10.573-10.406z"/></svg>
			</Link>
			<h3 className="POtitle">Órdenes de Compra</h3>
			<div className="productTableTitleContainer">
				<div className="productTableTitle">
					<h6>Id Orden</h6>
					<h6>Nombre</h6>
					<h6>
						<select className="statusSelect" onChange={handleSelectChange}>
							<option selected value="0">Estado</option>
							<option value="enCarrito">En carrito</option>
							<option value="creada">Creada</option>
							<option value="pagada">Pagada</option>
							<option value="entregada">Entregada</option>
							<option value="rechazada">Rechazada</option>
						</select>
					</h6>
					<h6>Envío</h6>
					<h6>Fecha</h6>
					<h6>Precio Total</h6>
				</div>
			</div>
			<div className="productListContainer">
				<ul className="productList">
					{selectedOrders &&
						selectedOrders.map(order => (
							<li key={order.id}>
								<PurchaseOrderFormLine info={order} />
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}
