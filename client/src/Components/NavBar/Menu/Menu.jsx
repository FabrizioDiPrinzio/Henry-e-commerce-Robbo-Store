import React, {useState, useEffect} from 'react';
import {allActions} from '../../../Redux/Actions/actions';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import './menu.css';

export default function Menu() {
	const categories = useSelector(state => state.categories.allCategories);
	const dispatch = useDispatch();

	const [stateMenu, setStateMenu] = useState({
		line: 'line',
		menu: 'menuClose',
		cross: 'crossHide'
	});

	useEffect(() => {
		dispatch(allActions.categoryActions.getAllCategories());
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
				<ul className="menuList">
					{categories.map(categoria => {
						return (
							<li className="categoria" key={categoria.name}>
								<Link to={`/search?category=${categoria.name}`}> {categoria.name}</Link>
								<div />
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
