import * as actionTypes from '../Actions/actionTypes';

const initialState = {
	currentCart: {},
	lastError: null
};

export default function cartReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_USER_CART:
			return {
				...state,
				currentCart: action.payload
			};
		case actionTypes.POST_USER_CART:
			const initialFix = action.payload;
			initialFix.products = [];
			initialFix.ordelines = [];
			return {
				...state,
				currentCart: initialFix
			};
		case actionTypes.EMPTY_CART:
			return {
				...state,
				currentCart: {
					...state.currentCart,
					id: 0,
					buyerId: 0,
					orderlines: [],
					products: []
				}
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
