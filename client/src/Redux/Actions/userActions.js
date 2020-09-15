import * as actions from './actionTypes';

export const login = user => dispatch => {
	dispatch({
		type: actions.LOGIN,
		payload: user
	});
};

export const logOut = () => dispatch => dispatch({type: actions.LOGOUT});
