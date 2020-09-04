import React, {useState, useEffect} from 'react';
import './menu.css';
import axios from 'axios';

export default function Menu() {
	const [stateMenu, setStateMenu] = useState({
		line: 'line',
		menu: 'menuClose',
		cross: 'crossHide'
	});
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:3001/products/category/names').then(res => {
			const resp = res.data.map(e => {
				return e.name;
			});
			setCategories(resp);
		});
	}, []);

	const clickHandle = event => {
		event.preventDefault();
		setStateMenu({
			...stateMenu,
			line: stateMenu.line === 'line' ? 'lineHide' : 'line',
			menu: stateMenu.menu === 'menuClose' ? 'menuOpen' : 'menuClose',
			cross: stateMenu.cross === 'crossHide' ? 'cross' : 'crossHide'
		});
	};

	return (
		<div className="container">
			<div className={'botonMenu'} onClick={clickHandle}>
				<div className={stateMenu.cross} />
				<div className={stateMenu.line} />
				<div className={stateMenu.line} />
				<div className={stateMenu.line} />
			</div>

			<div className={stateMenu.menu}>
				<ul className="list">
					{categories.map(categoria => {
						return (
							<li className="categoria">
								<a href="#"> {categoria} </a>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
