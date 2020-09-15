import * as actionTypes from '../Actions/actionTypes';

const initialState = {
	rol: 'Guest',
	id: 0,
	name: null,
	email: null
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.LOGIN:
			return {
				...state,
				rol: action.payload.rol,
				id: action.payload.id,
				name: action.payload.name,
				email: action.payload.email
			};
		default:
			return state;
	}
}
