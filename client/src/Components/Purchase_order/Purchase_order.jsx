import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './Purchase_order.css';

const urlBack = process.env.REACT_APP_API_URL;

export default function Purchase_order(props) {


	return (
		<div className='outerContainer'>
			<div className="purchaseOrderContainer">
				<div className='firstRow'>
					<div className='purchaseOrderData'>
						<h5> ORDEN DE COMPRA ID: </h5>
						<h5> Realizada Por: </h5>
					</div>
					<div className='purchaseOrderStatus'>
						<form className="form" onSubmit={handleAdd} ref={status}>
							<select ref={status} id="select" defaultValue={status} onChange={handleSelectChange}>
								<option value="enCarrito"> En Carrito </option>
								<option value="creada"> Creada </option>
								<option value="pagada"> Pagada </option>
								<option value="entregada"> Entregada </option>
							</select>
							<button onClick={handleAdd} className="submitBtn">
								Confirmar Cambio de Status
							</button>
						</form>
					</div>
					<div className='date'>
						<h5> Fecha de Pago: </h5>
					</div>
				</div>
				<div className='secondRow'>
					<div className='orderLines'>
						
					</div>
				</div>
				<div className='shippingInfo'>

				</div>
				<div className='paymentInfo'>

				</div>
			</div>
		</div>
	);
}