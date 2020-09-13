import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './PurchaseOrderForm.css';
import 'bootstrap/dist/css/bootstrap.css';
import PurchaseOrderFormLine from './PurchaseOrderFormLine/PurchaseOrderFormLine';

const urlBack = process.env.REACT_APP_API_URL;

export default function PurchaseOrderForm() {
	// const userList = useSelector(state => state.users)
	// const dispatch = useDispatch()

	const [productOrders, setProductOrders] = useState([]);

	useEffect(() => {
		axios
			.get(`${urlBack}/orders`)
			.then(response => {
				setProductOrders(response.data);
				console.log(response)
			})
			.catch(err => console.log(err.message));
	}, []);

	return (
		<div className="productFormAdmin">
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
