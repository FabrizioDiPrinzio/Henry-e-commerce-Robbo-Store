import * as actionTypes from '../Actions/actionTypes';

const initialState = {
	allProducts: [],
	lastResponse: null,
	lastError: null
};

export default function productReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_ALL_PRODUCTS:
			return {
				...state,
				allProducts: state.allProducts.concat(action.payload.products)
			};

		case actionTypes.PUT_PRODUCT:
			return {
				...state,
				lastResponse: {
					response: action.payload,
					message: 'El producto fue editado exitosamente'
				},
				lastError: null
			};

		case actionTypes.PRODUCTS_ERROR:
			return {
				...state,
				lastResponse: null,
				lastError: action.payload
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
