import * as actionTypes from '../Actions/actionTypes';

const initialState = {
	currentCart: {
		orderlines: [],
		products: [],
	},
	lastError: null
};

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_CART:
			return {
				...state,
				currentCart: action.payload,
			};
		case actionTypes.POST_CART:
			return {
				...state,
				currentCart: action.payload,
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
