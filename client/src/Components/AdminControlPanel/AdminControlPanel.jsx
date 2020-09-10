import React from 'react';
import UserFormAdmin from './userForm/UserFormAdmin.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './adminControlPanel.css';
import {Link} from 'react-router-dom';

// =========== FIN DE IMPORTS ============


function controlPanel() {
  

	return (
		<div className="controlPanel">
      <div className='centerColumn'>
        <h1> Control Panel </h1>
        <UserFormAdmin />
      </div>
		</div>
	);
}

export default controlPanel;
