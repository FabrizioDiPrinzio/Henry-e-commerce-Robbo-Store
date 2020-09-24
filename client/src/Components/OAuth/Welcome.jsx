import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {success} from '../../multimedia/SVGs';
import {useSelector} from 'react-redux';
import Home from '../Home/Home';
import Catalogo from '../Catalogo/Catalogo';

export default function Welcome() {
	// Redux
	const user = useSelector(state => state.user);

	// React Hooks
	const [showModal, setShowModal] = useState(true);

	return (
		<div>
			<Modal show={showModal && user.name} onHide={() => setShowModal(false)}>
				<div className="success">
					{success} ¡Bienvenido, {user.name}!
				</div>
			</Modal>
			<Home />
			<Catalogo location />
		</div>
	);
}
