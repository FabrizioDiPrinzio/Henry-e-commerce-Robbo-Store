import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import './menu.css';

export default function Menu() {
	const categories = useSelector(state => state.categories.allCategories);

	const [stateMenu, setStateMenu] = useState({
		line: 'line',
		menu: 'menuClose',
		cross: 'crossHide'
	});

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
		<div className="containerMenu">
			<div className={'botonMenu'} onClick={clickHandle}>
				<div className={stateMenu.cross} />
				<div className={stateMenu.line} />
				<div className={stateMenu.line} />
				<div className={stateMenu.line} />
			</div>

			<div className={stateMenu.menu}>
				<ul className="menuList">
					{categories.map(categoria => {
						return (
							<li onClick={clickHandle} className="categoria" key={categoria.name}>
								<NavLink to={`/categories/${categoria.name}`} className="link-categoria">
									{' '}
									{categoria.name}
								</NavLink>
								<div />
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
