import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './UserProfile.css';
import Collapse from 'react-bootstrap/Collapse';
// ======================== Fin de Imports ======================== //


const urlBack = process.env.REACT_APP_API_URL;


export default function UserProfile() {

	// ============================== Redux State ================================== //

	const user = useSelector(state => state.user);


	// ========================= React Component State ============================== //

	const {id} = useParams();
	const [userProfile, setUserProfile] = useState({});
	const [purchaseOrders, setPurchaseOrders] = useState([]);
	const [authFlag, setAuthFlag] = useState(false);

	useEffect(
		() => {
			axios.get(`${urlBack}/user/${id}`)
			.then(response => {
				setUserProfile(response.data)

				if(user.id !== userProfile.id && user.rol !== 'Admin') {
					setAuthFlag(false)
				} else {
					setAuthFlag(true)
				}
			})
			.catch(err => {
				alert('Hubo un problema con la petición del usuario, revisa la consola')
				console.log(err)
			})

			axios.get(`${urlBack}/orders/users/${id}`)
			.then(response => {
				setPurchaseOrders(response.data)

			}).catch(err => {
				alert('Hubo un problema con la petición de las ordenes, revisa la consola')
				console.log(err)
			})

		},
		[user]
	)

	// ============================ react-bootstrap ================================= //
	
	const [openPurchaseHistory, setOpenPurchaseHistory] = useState(false); // Elemento desplegable (desplegado / no desplegado)


	return (
		<div className='profileContainer'>
			<div className="profilePage">

				<div className='profileCard'>
					<h2>
						<strong className='text-shadow-drop-center'>
							{userProfile.name}
						</strong>
					</h2>
					<h7>
						Gracias  por formar parte de Robbo Store ❤
					</h7>
					<hr />
					<div className='userCredentials'>
						<div>
							<h6>
								User Id:
							</h6>
							{userProfile.id}
						</div>
						<div>
							<h6>
								Rol:
							</h6>
							{userProfile.rol}
						</div>
					</div>
				</div>
				
				<div className='profileCard'>
					<div className='purchaseHistroyButton'>
					<h3 
					onClick={() => setOpenPurchaseHistory(!openPurchaseHistory)}
					aria-controls="example-collapse-text"
					aria-expanded={openPurchaseHistory}>
	
							Ver historial de compras
					</h3>
					</div>
					<hr />

	
					<Collapse in={openPurchaseHistory}>
	      				<div className=''>

	      					{authFlag &&
	      						purchaseOrders.map(order => {
	      							return (

	      							<Link to={`/purchase_order/${order.id}`} style={{ textDecoration: 'none' }}>
	      								<div key={order.id} className='orderRow'>

	      									<h6><span className='idBox'>{order.id}</span>

	      									Status: <span className='statusBox'>{order.status}</span></h6>
	      									
	      									<span><time>{Date(order.updatedAt)}</time></span>
	      								</div>
	      							</Link>

	      							)
	      						})
							}

							{!authFlag &&
								<h7>No puedes ver el historial de compras de otro usuario</h7>
							}

							<br/>
						</div>
	      			</Collapse>

	      		</div>
			</div>
		</div>
	);
}
