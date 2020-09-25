import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import './PurchaseOrderForm.css';
import 'bootstrap/dist/css/bootstrap.css';
import PurchaseOrderFormLine from './PurchaseOrderFormLine/PurchaseOrderFormLine';

const urlBack = process.env.REACT_APP_API_URL;

export default function PurchaseOrderForm() {

	const [selectedStatus, setSelectedStatus] = useState('0');
	const [productOrders, setProductOrders] = useState([]);
	const [orders, setOrders] = useState([]);
	const lista = useRef(0);

	useEffect(() => {
		axios
			.get(`${urlBack}/orders`)
			.then(response => {
				setProductOrders(response.data);
				setOrders(response.data);
			})
			.catch(err => console.log(err.response.data));
	}, []);

	const handleSelectChange = event => {
		event.preventDefault();
		setProductOrders(orders);

		let status = event.target.value;
		setSelectedStatus(status);

		if (status !== "0") {
			setProductOrders(productOrders.filter(order => order.status === status));
		}
		else {
			setProductOrders(orders);
			setSelectedStatus('0');
		}
	};

	return (
		<div className="productFormAdmin">
			<div>
				<div>Filtrar por estado: </div>
				<select ref={lista} className="statusSelect" defaultValue="Estado..." onChange={handleSelectChange}>
					<option selected value="0">Todo</option>
					<option value="enCarrito">En carrito</option>
					<option value="creada">Creada</option>
					<option value="pagada">Pagada</option>
					<option value="Entregada">Entregada</option>
					<option value="Rechazada">Rechazada</option>
				</select>
			</div>
			<div className="productTableTitleContainer">
				<div className="productTableTitle">
					<h6>Id Orden</h6>
					<h6>Nombre</h6>
					<h6>Estado</h6>
					<h6>Envío</h6>
					<h6>Fecha</h6>
					<h6>Precio Total</h6>
				</div>
			</div>
			<div className="productListContainer">
				<ul className="productList">
					{productOrders &&
						productOrders.map(order => (
							<li key={order.id}>
								<PurchaseOrderFormLine info={order} />
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}
