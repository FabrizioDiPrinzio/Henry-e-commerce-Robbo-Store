import React, {useEffect} from 'react';

export default function OAuthSuccess() {
	// Popup closes itself and refreshes the main page
	useEffect(() => {
		const url = '/welcome';
		window.opener.open(url, '_self');
		window.opener.focus();
		window.close();
	}, []);

	return <div />;
}
