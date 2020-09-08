import * as actionTypes from '../Actions/actionTypes';

const urlBack = process.env.REACT_APP_API_URL;

let initialState;
axios.get(`${urlBack}/products/category/names`).then(res => {initialState = res.data})


// const state = { categories: { categories: [] } }

export default function categoryReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_ALL_CATEGORIES:
			return {
				...state,
				categories: action.payload
			};
		case actionTypes.GET_CATEGORY:
			return;
		case actionTypes.POST_CATEGORY:
			return {};
		case actionTypes.DELETE_CATEGORY:
			return;
		case actionTypes.PUT_CATEGORY:
			return;
		default:
			return state;
	}
}
