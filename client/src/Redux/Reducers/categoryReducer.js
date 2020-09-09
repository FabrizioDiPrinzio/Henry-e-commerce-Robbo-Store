import * as actionTypes from '../Actions/actionTypes';

const urlBack = process.env.REACT_APP_API_URL;

const initialState = {
  allCategories:[],
  lastResponse: {},
  lastError: '',
};

// const state = { categories: { allCategories: [], errors:'' } }

export default function categoryReducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_ALL_CATEGORIES:

      let categories = action.payload.map(category => ({
          id: category.id,
          name: category.name,
          description: category.description
      }))

			return {
				...state,
				allCategories: categories
      }; // < ------------------------------------------------------ almost all actions bellow this line will be probably deprecated maybe error will remain
		case actionTypes.GET_CATEGORY:
			return;
		case actionTypes.POST_CATEGORY:
			return {
				...state,
				lastResponse: action.payload
      };
		case actionTypes.DELETE_CATEGORY:
			return;
		case actionTypes.PUT_CATEGORY:
			return {
				...state,
				lastResponse: action.payload
      }
    case actionTypes.CATEGORIES_ERROR:
      return {
        ...state,
        lastError: action.payload
      }
		default:
			return state;
	}
}
