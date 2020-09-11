import * as actionTypes from '../Actions/actionTypes';

const initialState = {
	type: 'User' /*userTypes: [User, guest, admin]*/,
	id: 1
};

export default function userReducer(state = initialState, action) {
	return state;
}
