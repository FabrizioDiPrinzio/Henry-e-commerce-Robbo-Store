import React, { useState } from 'react'
import './menu.css'


export default  function Menu() {

const [stateMenu, setStateMenu] = useState({
	line : 'line',
	menu : 'menuClose',
	cross : 'crossHide',
	categorias : ['Arduino','Industriales','Domésticos','Arduino','Industriales','Domésticos','Arduino','Industriales','Domésticos']
});

const clickHandle = event => {
	event.preventDefault();
	setStateMenu({...stateMenu, 
		line : stateMenu.line === 'line' ? 'lineHide' : 'line',
	 	menu : stateMenu.menu ==='menuClose' ? 'menuOpen' : 'menuClose',
	 	cross : stateMenu.cross ==='crossHide' ? 'cross' : 'crossHide'})
}


return(

	<div className='container'>


	<div className={'botonMenu'} onClick={clickHandle}>
		<div className={stateMenu.cross}></div>
		<div className={stateMenu.line}></div>
		<div className={stateMenu.line}></div>
		<div className={stateMenu.line}></div>
	</div>



	<div className={stateMenu.menu}>
				<ul className="list">	
					{
					stateMenu.categorias.map(categoria => {
							return (<li className="categoria" > 
											<a href="#"> {categoria} </a> 
										</li>)
						})
					}
				</ul>
	</div>





	</div>
	)
} 

