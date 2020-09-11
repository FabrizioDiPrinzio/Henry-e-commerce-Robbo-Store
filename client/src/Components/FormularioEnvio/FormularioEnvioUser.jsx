import React, {useState, useEffect} from 'react';
import axios from 'axios';
import FormularioEnvio from'./FormularioEnvio.jsx';
//import PurchaseOrderFormLine from '../AdminControlPanel/PurchaseOrderForm/PurchaseOrderFormLine/PurchaseOrderFormLine.jsx';
import 'bootstrap/dist/css/bootstrap.css';

const urlBack = process.env.REACT_APP_API_URL;

export default function FormEnvioUser() {
	// const userList = useSelector(state => state.users)
	// const dispatch = useDispatch()

	const [productOrders, setProductOrders] =useState([])
	useEffect(() => {
		axios.get(`${urlBack}/orders`).then(response => {
			setProductOrders(response.data);
			console.log(response.data);
		});
	}, []);

	return (
		<div className="productFormAdmin">
			<div className="productTableTitleContainer">
				<div className="productTableTitle">
					
					<h6>recipient_name</h6>
					<h6>recipient_lastname</h6>
					<h6>country</h6>
					<h6>city</h6>
					<h6>address</h6>
					<h6>postal_code</h6>
					<h6>phone_number</h6>
					<h6>shipping_type</h6>
				</div>
			</div>
			<div className="productListContainer">
				<ul className="productList">
					{productOrders &&
						productOrders.map(order => (
							<li className="listItem" key={order.id}>
								<FormularioEnvio info={order} />
							</li>
						))}
				</ul>
			</div>
		</div>
	);
}
