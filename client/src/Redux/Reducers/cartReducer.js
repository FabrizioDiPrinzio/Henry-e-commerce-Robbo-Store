import * as actionTypes from '../Actions/actionTypes';

const initialState = {
	currentCart: {},
	orderlines: [],
	lastError: null
};

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_CART:
			return {
				...state,
				currentCart: action.payload,
				orderlines: action.payload.orderlines
			};
		case actionTypes.POST_CART:
			return {
				...state,
				currentCart: action.payload,
				orderlines: []
			};
		case actionTypes.CART_ERROR:
			return {
				...state,
				lastError: action.payload
			};
		default:
			return state;
	}
}
