import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Orderline from './Orderline/Orderline.jsx';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './Purchase_order.css';

const urlBack = process.env.REACT_APP_API_URL;

export default function Purchase_order(props) {
	//=====================   redux state    ==================== //


	//=====================   react-component state    ==================== //

	const { purchaseOrderid } = useParams();
	const [ purchaseOrderData, setPurchaseOrderData ] = useState({});

	// ==================== auxiliary function ==================== //

	const axiosPetitionHandler = response => {
		alert(response.statusText);
		console.log(response);
	};

	useEffect(() => {
		axios.get(`${urlBack}/orders/${purchaseOrderid}`)
		.then(response => {setPurchaseOrderData(response.data); return response.data})
		.then(response => {console.log(response)})
		.catch(error => {alert(error)})
	}, [])


	// ================== component event handlers ================ //


	// Changes the status of the Purchase Order

	const handleSubmit = event => {
		event.preventDefault();

		axios
			.put(`${urlBack}/orders/${purchaseOrderid}`, purchaseOrderData)
			.then(response => axiosPetitionHandler(response))
			.catch(error => alert('No se pudo crear la categoria: ' + error.response.data));
	};

	const handleStatusChange = event => {
		event.preventDefault();
		if (event.target.value === 'enCarrito') {
			alert('no puedes cambiar una compra realizada a carrito');
		} else {
			const changedPurchaseOrder = purchaseOrderData
			changedPurchaseOrder.status = event.target.value
			setPurchaseOrderData(changedPurchaseOrder)
			console.log(purchaseOrderData)
		}
	};

	return (
		<div className='outerContainer'>
			<div className="purchaseOrderContainer">
				<div className='firstRow'>

					<div className='purchaseOrderData'>
						<h6> Purchase Order: {`${purchaseOrderData.id}`} </h6>
						<h6> Buyer ID: <Link to="#"> {`${purchaseOrderData.buyerId}`} </Link> </h6>
					</div>

					<div className='purchaseOrderStatus'>
						<form className="form" onSubmit={handleSubmit}  >
							<select id="select" value={purchaseOrderData.status} onChange={handleStatusChange}>
								<option value= "enCarrito"> En Carrito </option>
								<option value="creada"> Creada </option>
								<option value="pagada"> Pagada </option>
								<option value="entregada"> Entregada </option>
							</select>
							<button onClick={handleSubmit} className="submitBtn">
								Confirmar Cambio de Status
							</button>
						</form>
					</div>

					<div className='date'>
						Última Modificación: <br /> {`${new Date(purchaseOrderData.updatedAt)}`}
					</div>
				</div>

				<div className='secondRow'>
					<div className='orderLines'>
							<hr /> <br />
							{purchaseOrderData.orderlines && purchaseOrderData.orderlines.map(bot => 
							<div className='orderline' key={bot.id}>
								<Orderline robot={bot} orderProducts={purchaseOrderData.products} />
							</div> )}
					</div>
				</div>

				<div className='shippingInfo'>
					<hr /> 
					<h5> Datos de Envío </h5>
					<div className='shippingData'>
						Nombre del Destinatario: {`${purchaseOrderData.recipient_name}`} <br />
						Apellido del Destinatario: {`${purchaseOrderData.recipient_lastname}`} <br />
						País de Entrega: {`${purchaseOrderData.country}`} <br />
						Ciudad de Entrega: {`${purchaseOrderData.city}`} <br />
						Dirección de Entrega: {`${purchaseOrderData.address}`} <br />
						Código Postal: {`${purchaseOrderData.postal_code}`} <br />
						Numero de Teléfono: {`${purchaseOrderData.phone_number}`} <br />
						Tipo de Envío: {`${purchaseOrderData.shipping_type}`} <br />
					</div>
				</div>
				<hr /> 
				<div className='paymentInfo'>
					<h5> Datos de Pagos </h5>
					<div className='paymentData'>
						Cuotas | Descuentos | Etc
					</div>
				</div>
			</div>
		</div>
	);
}