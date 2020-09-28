import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Orderline from './Orderline/Orderline.jsx';
import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // este es el boundle que me funcionó para importar bootstrap completo
import './Purchase_order.css';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Collapse from 'react-bootstrap/Collapse';

const urlBack = process.env.REACT_APP_API_URL;

export default function Purchase_order(props) {
	//=====================   redux state    ==================== //

	const user = useSelector(state => state.user);
	//const dispatch = useDispatch();


	//=====================   react-component state    ==================== //

	const {purchaseOrderId} = useParams();
	const [purchaseOrderData, setPurchaseOrderData] = useState({});
	const totalPrice =
		purchaseOrderData.orderlines &&
		purchaseOrderData.orderlines.length > 0 &&
		purchaseOrderData.orderlines.reduce((previous, current) => ({price: previous.price + current.price}));

	const [ authFlag, setAuthFlag ] = useState();

  
	// ========================== react-bootstrap ================================= //

	const [openShippingData, setOpenShippingData] = useState(false); // Elemento desplegable (desplegado / no desplegado)
	const [openPaymentData, setOpenPaymentData] = useState(false); // Elemento desplegable (desplegado / no desplegado)
	const [alertMessage, setAlertMessage] = useState('Selecciona Algun Status'); // mensaje del tooltip para cambiar el status

	// =========================== useEffect´s ================================//

	useEffect(() => {
		axios.get(`${urlBack}/orders/${purchaseOrderId}`)
		.then(response => {
			if (response.data.buyerId === user.id) {
				setAuthFlag(true);
			} else if (user.rol === 'Admin') {
				setAuthFlag(true)
			} else {
				setAuthFlag(false)
			}
			
			setPurchaseOrderData(response.data);
		})
		.catch(error => {alert(error)})
	}, [user.id])

	// ================== component event handlers ================ //

	// submits the changes
	const handleSubmit = event => {
		event.preventDefault();
		if (purchaseOrderData.status === 'enCarrito') return; // No hay que modificar este tipo de status

		axios
			.put(`${urlBack}/orders/${purchaseOrderId}`, {...purchaseOrderData, userEmail: user.email})
			.then(response => setAlertMessage(response.statusText))
			.catch(error => alert('No se pudo crear la categoria: ' + error.response.data));
	};

	// Changes the status of the Purchase Order
	const handleStatusChange = event => {
		event.preventDefault();

		if (event.target.value === 'enCarrito') {
			setAlertMessage('No es posible vovler a carrito una orden una vez creada');
			return;
		}

		if (purchaseOrderData.status === 'enCarrito') {
			setAlertMessage('No deberías cerrar un carrito desde el panel de control.');
			return;
		}

		setAlertMessage(`Click para cambiar el status a:  ${event.target.value}`);

		setPurchaseOrderData({...purchaseOrderData, status: event.target.value});
		console.log(purchaseOrderData);
	};

	if (!authFlag) return (
		<div className='outerContainer'>
			<div className="purchaseOrderContainer">
				<h3>No puedes ver las ordenes de compra de otro usuario</h3>
			</div>
		</div>
	);

	return (
		<div className="outerContainer">
			<div className="purchaseOrderContainer">
				<hr />
				<div className="firstRow">
					<div className="purchaseOrderData">
						<h6> Purchase Order: {`${purchaseOrderData.id}`} </h6>
						<h6>
							{' '}
							Buyer ID: <Link to="#"> {`${purchaseOrderData.buyerId}`} </Link>{' '}
						</h6>
					</div>

					<div className="purchaseOrderStatus">
						{user.rol === 'Admin' && (
							<form className="orderStatusSelector" onSubmit={handleSubmit}>
								<OverlayTrigger
									overlay={
										<Tooltip id="tooltip-SubmitStatus">{`${alertMessage}`}</Tooltip>
									}
								>
									<button onClick={handleSubmit} className="submitBtn">
										Confirmar Cambio de Status
									</button>
								</OverlayTrigger>

								<select
									id="selectStatus"
									value={purchaseOrderData.status}
									onChange={handleStatusChange}
								>
									<option value="enCarrito"> En Carrito </option>
									<option value="creada"> Creada </option>
									<option value="pagada"> Pagada </option>
									<option value="entregada"> Entregada </option>
									<option value="rechazada"> Rrechazada </option>
								</select>
							</form>
						)}

						{user.rol !== 'Admin' && (
							<h3>
								Estado de la orden:{' '}
								<OverlayTrigger
									overlay={
										<Tooltip id="tooltip-Status">
											{'enCarrito → creada → pagada → entregada'}
										</Tooltip>
									}
								>
									<span class="badge badge-pill badge-info">
										{` ${purchaseOrderData.status} `}
									</span>
								</OverlayTrigger>
							</h3>
						)}
					</div>

					<div className="date">
						Última Modificación: <br /> {`${new Date(purchaseOrderData.updatedAt)}`}
					</div>
				</div>

				<div className="secondRow">
					<div className="orderLines">
						<hr /> <br />
						{purchaseOrderData.orderlines &&
							purchaseOrderData.orderlines.map(bot => (
								<div className="orderline" key={bot.id}>
									<Orderline robot={bot} orderProducts={purchaseOrderData.products} />
									<br />
								</div>
							))}
					</div>
				</div>

				<div className="totalPrice">
					<h3>
						{' '}
						Total:{' '}
						<span class="badge badge-primary">U$S {totalPrice ? totalPrice.price : 0}</span>
					</h3>
				</div>

				<hr />

				<div className="shippingData">
					<h5
						onClick={() => setOpenShippingData(!openShippingData)}
						aria-controls="example-collapse-text"
						aria-expanded={openShippingData}
					>
						<Link>Datos de Envío</Link>
					</h5>

					<Collapse in={openShippingData}>
						<div className="shippingData card card-body">
							<p>
								Nombre del Destinatario:{' '}
								<strong> {`${purchaseOrderData.recipient_name}`} </strong> <br />
								Apellido del Destinatario:{' '}
								<strong> {`${purchaseOrderData.recipient_lastname}`} </strong> <br />
								País de Entrega: <strong> {`${purchaseOrderData.country}`} </strong> <br />
								Ciudad de Entrega: <strong> {`${purchaseOrderData.city}`} </strong> <br />
								Dirección de Entrega: <strong>
									{' '}
									{`${purchaseOrderData.address}`}{' '}
								</strong>{' '}
								<br />
								Código Postal: <strong> {`${purchaseOrderData.postal_code}`} </strong>{' '}
								<br />
								Numero de Teléfono: <strong>
									{' '}
									{`${purchaseOrderData.phone_number}`}{' '}
								</strong>{' '}
								<br />
								Tipo de Envío: <strong>
									{' '}
									{`${purchaseOrderData.shipping_type}`}{' '}
								</strong>{' '}
								<br />
							</p>
						</div>
					</Collapse>
				</div>

				<hr />

				<div className="paymentData">
					<h5
						onClick={() => setOpenPaymentData(!openPaymentData)}
						aria-controls="example-collapse-text"
						aria-expanded={openPaymentData}
					>
						<Link>Datos de Pago</Link>
					</h5>

					<Collapse in={openPaymentData}>
						<div className="paymentInfo card card-body">Descuentos o cuotas ...</div>
					</Collapse>
				</div>
				<hr />
			</div>
		</div>
	);
}
