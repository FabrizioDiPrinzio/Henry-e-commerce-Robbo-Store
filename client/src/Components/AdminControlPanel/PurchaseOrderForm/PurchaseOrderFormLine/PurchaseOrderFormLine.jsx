import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
// import {useSelector, useDispatch} from 'react-redux';
// import {allActions} from '../../../../Redux/Actions/actions.js'
import './PurchaseOrderFormLine.css';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;

export default function FormFormAdmin(props) {
	// 	const productsInCart = useSelector(state => state.cart.currentCart.products);
	// 	const dispatch = useDispatch();

	// React Hooks
	const {
		id,
		status,
		recipient_name,
		recipient_lastname,
		country,
		city,
		address,
		postal_code,
		phone_number,
		shipping_type,
		buyerId,
		createdAt,
		products,
		orderlines
	} = props.info;

	// const [inputValues, setInputValues] = useState({
	// 	id,
	// 	status,
	// 	recipient_name,
	// 	recipient_lastname,
	// 	country,
	// 	city,
	// 	address,
	// 	postal_code,
	// 	phone_number,
	// 	shipping_type,
	// 	buyerId,
	// 	createdAt
	// });

	const orderDate = createdAt.slice(0, 10);

	const orderName = name => {
		if (name) {
			return recipient_name + ' ' + recipient_lastname;
		}
		else {
			return ' ------- ';
		}
	};

	const orderShipping = name => {
		if (name) {
			return shipping_type;
		}
		else {
			return ' ------- ';
		}
	};

	const reducer = arr => {
		var acc = 0;
		for (let i = 0; i < arr.length; i++) {
			acc += arr[i].price;
		}
		return acc;
	};

	const orderPrice = reducer(orderlines);

	const [stateDisplay, setStateDisplay] = useState({
		display: 'displayClose'
	});

	// useEffect(() => {
	// 		dispatch(allActions.cartActions.getUserCart())
	// }, [])

	// ----------- Funcionalidad ----------

	// const handleInputChange = event => {
	// 	setInputValues({...inputValues, [event.target.name]: event.target.value});
	// };

	const clickHandle = event => {
		event.preventDefault();
		setStateDisplay({
			...stateDisplay,
			display: stateDisplay.display === 'displayClose' ? 'displayOpen' : 'displayClose'
		});
	};

	return (
		<div className="lineOrder">
			<table>
				<tr className="orderFormLine" onClick={clickHandle}>
					<td className="productInputTag" id={id}>
						<Link to={`/purchase_order/${id}`}>
							{id}
						</Link>
					</td>
					<td className="productInputTag" id={recipient_name}>
						{orderName(recipient_name)}
					</td>
					<td className="productInputTag" id={status}>
						{status}
					</td>
					<td className="productInputTag" id={shipping_type}>
						{orderShipping(shipping_type)}
					</td>
					<td className="productInputTag" id={orderDate}>
						{orderDate}
					</td>
					<td className="productInputTag" id={orderPrice}>
						${orderPrice}
					</td>
				</tr>
			</table>

			<div className={stateDisplay.display}>
				<table className="tablaOrders">
					<tr className="orderTitle">
						<td className="productInputTag" id="prodId">
							Id Producto
						</td>
						<td className="productInputTag" id="prodName">
							Producto
						</td>
						<td className="productInputTag" id="prodPrice">
							Precio unit.
						</td>
						<td className="productInputTag" id="quantity">
							Cantidad
						</td>
						<td className="productInputTag" id="subTotal">
							Sub-Total
						</td>
					</tr>
					{products &&
						products.map(prod => (
							<tr className="orderContent">
								<td className="productInputTag" id="prodId">
									{prod.id}
								</td>
								<td className="productInputTag" id="prodName">
									{prod.name}
								</td>
								<td className="productInputTag" id="prodPrice">
									{prod.price}
								</td>
								<td className="productInputTag" id="quantity">
									{prod.orderline.quantity}
								</td>
								<td className="productInputTag" id="subTotal">
									{prod.price * prod.orderline.quantity}
								</td>
							</tr>
						))}
				</table>

				<div />
			</div>
		</div>
	);
}
