import * as actionTypes from '../Actions/actionTypes';

const urlBack = process.env.REACT_APP_API_URL;

const initialState = {
	allCategories:[]
};

// const state = { categories: { allCategories: [] } }

export default function categoryReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_ALL_CATEGORIES:
			return {
				...state,
				allCategories: action.payload
			};
		case actionTypes.GET_CATEGORY:
			return;
		case actionTypes.POST_CATEGORY:
			return {};
		case actionTypes.DELETE_CATEGORY:
			return;
		case actionTypes.PUT_CATEGORY:
			return {
				...state,
				response: action.payload 
			}
			return;
		default:
			return state;
	}
}
