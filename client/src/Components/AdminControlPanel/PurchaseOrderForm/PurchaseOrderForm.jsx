import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './PurchaseOrderForm.css';
import 'bootstrap/dist/css/bootstrap.css';
import {returnArrow} from '../../../multimedia/SVGs';
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
		if (event.target.value !== '0') {
			setSelectedOrders(allOrders.filter(order => order.status === event.target.value));
		}
		else {
			setSelectedOrders(allOrders);
		}
	};

	return (
		<div className="productFormAdmin">
			<Link className="goBackBtn" to="/admin/">
				{returnArrow}
			</Link>
			<h3 className="POtitle">Órdenes de Compra</h3>
			<div className="productTableTitleContainer">
				<div className="productTableTitle">
					<h6>Id Orden</h6>
					<h6>Nombre</h6>
					<h6>
						<select className="statusSelect" onChange={handleSelectChange}>
							<option selected value="0">
								Estado
							</option>
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
