import * as actionTypes from '../Actions/actionTypes';

const initialState = {
	currentCart: {},
	lastError: null
};

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_CART:
			return {
				...state,
				currentCart: action.payload
			};
		case actionTypes.POST_CART:
			const initialFix = action.payload
			initialFix.products = [];
			initialFix.ordelines = [];
			return {
				...state,
				currentCart: initialFix
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
