import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {allActions} from '../../Redux/Actions/actions.js';
import Menu from './Menu/Menu.jsx';
import Modal from 'react-bootstrap/Modal';
import UserOptions from './UserOptions/UserOptions';
import UserForm from '../FormularioUsuario/UserForm';
import {cartButton, userButton, searchButton, success} from '../../multimedia/SVGs.js';
import 'bootstrap/dist/css/bootstrap.css';
import './navBar.css';
// ------- Fin de imports --------------


document.addEventListener('scroll', e => {
	const searchBar = document.querySelector('.SearchBarContainer');
	if (!searchBar) return; // when apps crashes navbar does not exist and stacks an error

	if (window.scrollY > 55) {
		searchBar.style.top = '0';
	}
	else {
		searchBar.style.top = 55 - window.scrollY + 'px'; //55 definido por position de searchbar en css (deben valer lo mismo)
	}
});

export default function NavBar() {
	// Redux
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);

	// React Hooks
	const [search, setSearch] = useState({query: ''});
	const [showModal, setShowModal] = useState(false);
	const [statusChanged, setStatusChanged] = useState(false);
	const [redirect, setRedirect] = useState(false);

	useEffect(
		() => {
			setStatusChanged(true); // Closes modals whenever a user logs in or out
		},
		[user.id]
	);

	useEffect(() => setRedirect(false), [redirect]);

	// ----- Functionality ----
	const onEnterKey = e => {
		if (e.key === 'Enter') setRedirect(true);
	};

	const handleInputChange = event =>
		setSearch({...search, [event.target.name]: event.target.value});

	const hideModals = () => {
		setShowModal(!showModal);
		setStatusChanged(false);
	};

	const handleClickTitle = () => {
		dispatch(allActions.productActions.cleanProduct());
		dispatch(allActions.productActions.getAllProducts(1));
	} 

	return (
		<div className="navBarContainer">
			<nav className="NavBar">
				<Link to="/">
					<span onClick={handleClickTitle} className="Title">Robbo Store</span>
				</Link>
				<img src="../favicon.svg" alt="logo" className="logo" />
				<span className="espacioBlanco"> </span>
				<span className="welcome"> Bienvenido, {user.name || 'visitante'}! </span>
				<div>
					<button className="UserBtn" onClick={hideModals}>
						{userButton}
					</button>
					{user.rol === 'Guest' &&
					!statusChanged && (
						<Modal show={showModal} onHide={hideModals}>
							<UserForm />
						</Modal>
					)}
					{user.rol !== 'Guest' &&
					!statusChanged && (
						<Modal show={showModal} onHide={hideModals}>
							<UserOptions />
						</Modal>
					)}

					{statusChanged && (
						<Modal show={showModal} onHide={hideModals}>
							{user.rol === 'Guest' && (
								<div className="success"> {success} ¡Sesión cerrada! </div>
							)}
							{user.rol !== 'Guest' && (
								<div className="success">
									{' '}
									{success} ¡Bienvenido, {user.name}!{' '}
								</div>
							)}
						</Modal>
					)}

					<Link to="/carrito">
						<button className="CartBtn">{cartButton}</button>
					</Link>
				</div>
			</nav>

			<div className="SearchBarContainer">
				<div className="SearchBar">
					<Menu />
					<input
						className="SearchInput"
						name="query"
						type="text"
						placeholder="Buscar..."
						onChange={handleInputChange}
						onKeyPress={onEnterKey}
					/>
					<Link to={`/search?query=${search.query}`}>
						<button className="SearchBtn">{searchButton}</button>
					</Link>
					{redirect && <Redirect to={`/search?query=${search.query}`} />}
				</div>
			</div>
		</div>
	);
}
