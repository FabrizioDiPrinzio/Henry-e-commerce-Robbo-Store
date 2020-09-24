import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import logo from '../../multimedia/logo.svg';
import './LoadingScreen.css';

export default function LoadingScreen({loading}) {
	return (
		<div className={`loading-screen ${loading ? 'dummy-class' : 'hideLoading'} `}>
			<img src={logo} alt="Robbo" id="loading-logo" />
			<Spinner animation="border" id="loading-spinner" />
		</div>
	);
}
