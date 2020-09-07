import * as actionTypes from './actionTypes';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;

export const getCategory = () => dispatch => {
	dispatch({
		type: actionTypes.GET_CATEGORY,
		payload: null
	});
};

export const getAllCategories = () => dispatch => {
	axios
		.get(`${urlBack}/products/category/names`)
		.then(res => {
			const categories = res.data.map(cat => ({
				name: cat.name,
				id: cat.id
			}));
			return categories;
		})
		.then(categories =>
			dispatch({
				type: actionTypes.GET_ALL_CATEGORIES,
				payload: categories
			})
		)
		.catch(error => dispatch({error: error.message}));
};

export const postCategory = category => dispatch => {
	dispatch({
		type: actionTypes.POST_CATEGORY,
		payload: category
	});
};

export const deleteCategory = () => dispatch => {
	dispatch({
		type: actionTypes.DELETE_CATEGORY,
		payload: null
	});
};

export const putCategory = category => dispatch => {
	dispatch({
		type: actionTypes.PUT_CATEGORY,
		payload: category
	});
};
