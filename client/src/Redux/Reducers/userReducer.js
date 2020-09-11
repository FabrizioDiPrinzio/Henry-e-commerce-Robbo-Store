import * as actionTypes from '../Actions/actionTypes';

const initialState = {
	userType: 'User' /*userTypes: [User, guest, admin]*/,
	userId: 1
};

export default function userReducer(state = initialState, action) {
	return state;
}
