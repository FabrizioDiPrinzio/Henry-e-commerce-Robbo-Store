import * as actionTypes from '../Actions/actionTypes';

const initialState = {allProducts: []};

export default function productReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_ALL_PRODUCTS:
			return {
				...state,
				allProducts: state.allProducts.concat(action.payload.products)
			};

		case actionTypes.CLEAN_PRODUCTS:
			return {
				...state,
				allProducts: []
			};

		default:
			return state;
	}
}
