import React from 'react';
import {useLocation} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import logo from '../../multimedia/logo.svg';
import './LoadingScreen.css';

export default function LoadingScreen({loading}) {
	const location = useLocation();

	// So an ugly loading screen doesn't show up when the user is logging in through a third party
	if (location.pathname === '/oauth/success') return <div />;

	return (
		<div className={`loading-screen ${loading ? 'dummy-class' : 'hideLoading'} `}>
			<img src={logo} alt="Robbo" id="loading-logo" />
			<Spinner animation="border" id="loading-spinner" />
		</div>
	);
}
