import * as actionTypes from './actionTypes';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;

export const getAllProducts = (pag = 1) => dispatch => {
	axios
		.get(`${urlBack}/products/pag/?p=${pag}`)
		.then(res => {
			const payload = {
				products: res.data.data,
				currentPage: res.currentPage
			};
			dispatch({type: actionTypes.GET_ALL_PRODUCTS, payload: payload});
			dispatch({type: actionTypes.CLEAN_MESSAGES});
		})
		.catch(err => dispatch(catchError(err)));
};

export const postProduct = (product, categories) => dispatch => {
	axios
		.post(`${urlBack}/products/`, product)
		.then(res => {
			dispatch({type: actionTypes.POST_PRODUCT, payload: res.data});

			if (categories.length) dispatch(modifyProductCategories(res.data.id, categories));
			else dispatch(getAllProducts());
		})
		.catch(err => dispatch(catchError(err)));
};

export const putProduct = (productId, body, categories) => dispatch => {
	axios
		.put(`${urlBack}/products/${productId}`, body) // hace la petición con los parametros pasados
		.then(res => {
			dispatch({type: actionTypes.PUT_PRODUCT, payload: res.data}); // dispacha una action que es un objeto y en el payload está la respuesta.

			if (categories.length > 0) dispatch(modifyProductCategories(productId, categories));
			else dispatch(getAllProducts());
		})
		.catch(err => dispatch(catchError(err)));
};

export const modifyProductCategories = (productId, categories) => dispatch => {
	categories.map((cat, i) => {
		if (cat.add) {
			axios
				.post(`${urlBack}/products/${productId}/category/${cat.id}`)
				.then(res => dispatch({type: actionTypes.ADDED_CATEGORY, payload: res.data}))
				.then(() => {
					if (i === categories.length - 1) dispatch(getAllProducts());
				})
				.catch(err => dispatch(catchError(err)));
		}
		else if (!cat.add) {
			axios
				.delete(`${urlBack}/products/${productId}/category/${cat.id}`)
				.then(res => dispatch({type: actionTypes.REMOVED_CATEGORY, payload: res.data}))
				.then(() => {
					if (i === categories.length - 1) dispatch(getAllProducts());
				})
				.catch(err => dispatch(catchError(err)));
		}
	});
};

export const catchError = err => dispatch => {
	dispatch({type: actionTypes.PRODUCTS_ERROR, payload: err.response ? err.response.data : err});
	dispatch({type: actionTypes.CLEAN_MESSAGES});
};

export const cleanProduct = () => dispatch => {
	dispatch({type: actionTypes.CLEAN_PRODUCTS});
};
