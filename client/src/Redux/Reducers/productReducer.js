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
				allProducts: action.payload
			};

		case actionTypes.GET_PRODUCT:
			return;

		case actionTypes.POST_PRODUCT:
			return {
				...state,
				lastResponse: {
					response: action.payload,
					message: 'El producto fue agregado exitosamente'
				},
				lastError: null
			};

		case actionTypes.DELETE_PRODUCT:
			return {
				...state,
				lastResponse: {
					response: action.payload,
					message: 'El producto fue borrado exitosamente'
				},
				lastError: null
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

		case actionTypes.CLEAN_MESSAGES:
			return {
				...state,
				lastResponse: null,
				lastError: null
			};

		default:
			return state;
	}
}
