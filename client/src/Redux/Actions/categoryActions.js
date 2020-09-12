import * as actionTypes from './actionTypes';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;

export const getCategory = () => dispatch => {
	dispatch({
		type: actionTypes.GET_CATEGORY,
		payload: null
	});
};
// ============================================================================ The function bellow is maybe the only usefull function
export const getAllCategories = () => dispatch => {
	axios
		.get(`${urlBack}/products/category/names`)
		.then(response => {
			const categories = response.data;

			dispatch({
				type: actionTypes.GET_ALL_CATEGORIES,
				payload: categories
			});
		})
		.catch(error => {
			const errorMsg = error.response.data;
			dispatch(errorActionCreator(errorMsg));
		});
};
// ============================================================================ The function above is maybe the only usefull function
export const postCategory = category => dispatch => {
	axios
		.post(`${urlBack}/products/category`, category)
		.then(response => {
			dispatch({
				type: actionTypes.POST_CATEGORY,
				payload: response.data
			});

			dispatch(getAllCategories());
		})
		.catch(error => {
			const errorMsg = error.response.data;
			dispatch(errorActionCreator(errorMsg));
		});
};

export const deleteCategory = () => dispatch => {
	dispatch({
		type: actionTypes.DELETE_CATEGORY,
		payload: null
	});
};

export const putCategory = (id, body) => dispatch => {
	axios
		.put(`${urlBack}/products/category/${id}`, body)
		.then(response => {
			const editedCategory = response.data;

			dispatch({
				type: actionTypes.PUT_CATEGORY,
				payload: editedCategory
			});

			dispatch(getAllCategories());
		})
		.catch(error => {
			const errorMsg = error.response.data;
			dispatch(errorActionCreator(errorMsg));
		});
};
// ============================================================================ The function bellow is maybe the only usefull function
const errorActionCreator = errorMessage => {
	return {
		type: actionTypes.CATEGORIES_ERROR,
		payload: errorMessage
	};
};
// ============================================================================ The function above is maybe the only usefull function
