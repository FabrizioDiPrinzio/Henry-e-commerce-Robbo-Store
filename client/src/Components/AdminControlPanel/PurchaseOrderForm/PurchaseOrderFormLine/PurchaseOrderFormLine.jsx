import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
// import './PurchaseOrderFormLine.css';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;

export default function FormFormAdmin(props) {
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
		buyerId
	} = props.info;

	const [inputValues, setInputValues] = useState({
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
		buyerId
	});

	const [stateEdit, setStateEdit] = useState({
		edit: 'editClose'
	});

	// ----------- Funcionalidad ----------

	const handleInputChange = event => {
		setInputValues({...inputValues, [event.target.name]: event.target.value});
	};

	const clickHandle = event => {
		event.preventDefault();
		setStateEdit({
			...stateEdit,
			edit: stateEdit.edit === 'editClose' ? 'editOpen' : 'editClose'
		});
	};

	const handleSelectChange = event => {
		setInputValues({...inputValues, status: event.target.value});
	};

	const handleEdit = event => {
		event.preventDefault();

		axios
			.put(`${urlBack}/orders/${id}`, inputValues)
			.then(() => alert('Se realizaron los cambios'))
			.catch(err => alert(err.message));
	};

	return (
		<div>
			<ul className="formFormLine">
				<div className="productInputTag" id={status}>
					{status}
				</div>
				<div className="productInputTag" id={recipient_name}>
					{recipient_name}
				</div>
				<div className="productInputTag" id={recipient_lastname}>
					{recipient_lastname}
				</div>
				<div className="productInputTag" id={country}>
					{country}
				</div>
				<div className="productInputTag" id={city}>
					{city}
				</div>
				<div className="productInputTag" id={address}>
					{address}
				</div>
				<div className="productInputTag" id={postal_code}>
					{postal_code}
				</div>
				<div className="productInputTag" id={phone_number}>
					{phone_number}
				</div>
				<div className="productInputTag" id={shipping_type}>
					{shipping_type}
				</div>
				<div className="productInputTag" id={buyerId}>
					{buyerId}
				</div>
				<div calssName="formActionContainer">
					<button type="submit" className="editBtn" value="Edit" onClick={clickHandle}>
						<svg
							width="1em"
							height="1em"
							viewBox="0 0 16 16"
							class="bi bi-pencil-square"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
							<path
								fill-rule="evenodd"
								d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
							/>
						</svg>
					</button>
				</div>
			</ul>
			<form className={stateEdit.edit}>
				<select defaultValue={status} onChange={handleSelectChange}>
					<option value="En carrito">En carrito</option>
					<option value="Creada">Creada</option>
					<option value="Pagada">Pagada</option>
					<option value="Entregada">Entregada</option>
					<option value="Cancelada">Cancelada</option>
				</select>
				<input
					className="productInputTag"
					type="text"
					name="recipient_name"
					value={inputValues.recipient_name}
					onChange={handleInputChange}
				/>
				<input
					className="productInputTag"
					type="text"
					name="recipient_lastname"
					value={inputValues.recipient_lastname}
					onChange={handleInputChange}
				/>
				<input
					className="productInputTag"
					type="text"
					name="country"
					value={inputValues.country}
					onChange={handleInputChange}
				/>
				<input
					className="productInputTag"
					type="text"
					name="city"
					value={inputValues.city}
					onChange={handleInputChange}
				/>
				<input
					className="productInputTag"
					type="text"
					name="address"
					value={inputValues.address}
					onChange={handleInputChange}
				/>
				<input
					className="productInputTag"
					type="text"
					name="postal_code"
					value={inputValues.postal_code}
					onChange={handleInputChange}
				/>
				<input
					className="productInputTag"
					type="text"
					name="phone_number"
					value={inputValues.phone_number}
					onChange={handleInputChange}
				/>
				<input
					className="productInputTag"
					type="text"
					name="shipping_type"
					value={inputValues.shipping_type}
					onChange={handleInputChange}
				/>
				<input
					className="productInputTag"
					type="text"
					name="buyerId"
					value={inputValues.buyerId}
					onChange={handleInputChange}
				/>
				<div className="formActionContainer">
					<button type="submit" className="editBtn" value="Edit" onClick={handleEdit}>
						Aceptar
					</button>
				</div>
			</form>
		</div>
	);
}
