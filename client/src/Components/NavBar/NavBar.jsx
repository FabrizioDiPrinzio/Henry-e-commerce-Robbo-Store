import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Menu from './Menu/Menu.jsx';
import Modal from 'react-bootstrap/Modal';
import UserOptions from './UserOptions/UserOptions';
import 'bootstrap/dist/css/bootstrap.css';
import './navBar.css';
import UserForm from '../FormularioUsuario/UserForm';
// ------- Fin de imports --------------

document.addEventListener('scroll', e => {
	const searchBar = document.querySelector('.SearchBarContainer');
	if (window.scrollY > 55) {
		searchBar.style.top = '0';
	}
	else {
		searchBar.style.top = 55 - window.scrollY + 'px'; //55 definido por position de searchbar en css (deben valer lo mismo)
	}
});

export default function NavBar() {
	// Redux
	const user = useSelector(state => state.user);

	// React Hooks
	const [search, setSearch] = useState({query: ''});
	const [showModal, setShowModal] = useState(false);

	useEffect(
		() => {
			setShowModal(false); // Closes modals whenever a user logs in or out
		},
		[user.id]
	);

	// ----- Functionality ----
	const handleInputChange = event =>
		setSearch({...search, [event.target.name]: event.target.value});

	return (
		<div className="navBarContainer">
			<nav className="NavBar">
				<Link to="/">
					<span className="Title">Robbo Store</span>
				</Link>
				<img src="../favicon.svg" alt="logo" className="logo" />
				<span className="espacioBlanco"> </span>
				<span className="welcome"> Bienvenido, {user.name || 'visitante'}! </span>
				<div>
					<button className="UserBtn" onClick={() => setShowModal(!showModal)}>
						<svg
							width="2em"
							height="2em"
							viewBox="0 0 16 16"
							className="bi bi-person"
							fill="white"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
							/>
						</svg>
					</button>
					{user.rol === 'Guest' && (
						<Modal show={showModal} onHide={() => setShowModal(!showModal)}>
							<UserForm />
						</Modal>
					)}
					{user.rol !== 'Guest' && (
						<Modal show={showModal} onHide={() => setShowModal(!showModal)}>
							<UserOptions />
						</Modal>
					)}

					<Link to="/carrito">
						<button className="CartBtn">
							<svg
								width="2em"
								height="2em"
								viewBox="0 0 16 16"
								className="bi bi-cart2"
								fill="white"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
								/>
							</svg>
						</button>
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
					/>
					<Link to={`/search?query=${search.query}`}>
						<button className="SearchBtn">
							<svg
								width="1.5em"
								height="1.5em"
								viewBox="0 0 16 16"
								className="bi bi-search"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
								/>
								<path
									fillRule="evenodd"
									d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
								/>
							</svg>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
