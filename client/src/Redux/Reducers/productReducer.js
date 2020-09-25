import * as actionTypes from '../Actions/actionTypes';

const initialState = {allProducts: [], more: true};

export default function productReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_ALL_PRODUCTS:
			return {
				...state,
				allProducts: state.allProducts.concat(action.payload.products),
				more: action.payload.more
			};

		case actionTypes.CLEAN_PRODUCTS:
			return {
				...state,
				allProducts: [],
				more: true
			};

		default:
			return state;
	}
}
