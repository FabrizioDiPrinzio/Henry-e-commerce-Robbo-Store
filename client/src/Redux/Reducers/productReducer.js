import * as actionTypes from '../Actions/actionTypes';

const initialState = {
	allProducts: [],
	lastResponse: null,
	lastError: ''
};

export default function productReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_ALL_PRODUCTS:
			return {...state, allProducts: action.payload};

		case actionTypes.GET_PRODUCT:
			return;

		case actionTypes.POST_PRODUCT:
			return {...state, lastResponse: action.payload};

		case actionTypes.DELETE_PRODUCT:
			return {...state, lastResponse: action.payload};

		case actionTypes.PUT_PRODUCT:
			return {...state, lastResponse: action.payload};

		case actionTypes.ADDED_CATEGORY:
			return {...state, lastResponse: action.payload};

		case actionTypes.REMOVED_CATEGORY:
			return {...state, lastResponse: action.payload};

		case actionTypes.PRODUCTS_ERROR:
			return {...state, lastError: action.payload};

		default:
			return state;
	}
}
