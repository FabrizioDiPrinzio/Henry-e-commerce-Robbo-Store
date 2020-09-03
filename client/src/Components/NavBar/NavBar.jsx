import React from 'react';
import {Link} from 'react-router-dom';
import './navBar.css';
import 'bootstrap/dist/css/bootstrap.css';
import Menu from './Menu/Menu.jsx';

document.addEventListener('scroll', e => {
	const searchBar = document.querySelector(".SearchBarContainer")
	if (window.scrollY > 50) {
			searchBar.style.top = '0'
		} else {
			searchBar.style.top = (48 - window.scrollY ) + 'px'
		}

	
})

export default function NavBar(props) {
	return (
		<div className="navBarContainer">
			<nav className="NavBar">
				<Link to="/">
					<span className="Title">Robbo Store</span>
				</Link>
				<div>
					<button className="UserBtn">
						<svg
							width="2em"
							height="2em"
							viewBox="0 0 16 16"
							class="bi bi-person"
							fill="white"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
							/>
						</svg>
					</button>

					<button className="CartBtn">
						<svg
							width="2em"
							height="2em"
							viewBox="0 0 16 16"
							class="bi bi-cart2"
							fill="white"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
							/>
						</svg>
					</button>
				</div>
			</nav>

			<div className="SearchBarContainer" >
				<div className="SearchBar">
					<Menu />
					<input className="SearchInput" type="text" placeholder="Buscar..." />
					<button className="SearchBtn" onClick={() => props.onSearch('Buscando robot...')}>
						<svg
							width="1.5em"
							height="1.5em"
							viewBox="0 0 16 16"
							class="bi bi-search"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
							/>
							<path
								fill-rule="evenodd"
								d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}
