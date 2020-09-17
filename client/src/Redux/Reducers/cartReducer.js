import * as actionTypes from '../Actions/actionTypes';

const initialState = {
	currentCart: {
		orderlines: [],
		products: []
	},
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
			initialFix.orderlines = [];
			return {
				...state,
				currentCart: initialFix
			};
		case actionTypes.EDIT_GUEST_CART:
			const {orderlines, robot, modifyProducts} = action.payload;
			const products = [...state.currentCart.products];

			if (modifyProducts === 'AddToProducts') products.push(robot);
			if (modifyProducts === 'RemoveFromProducts') {
				const index = products.findIndex(p => p.id === robot.id);
				products.splice(index, 1);
			}

			return {
				...state,
				currentCart: {
					...state.currentCart,
					orderlines,
					products
				}
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
