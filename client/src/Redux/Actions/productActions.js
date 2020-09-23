import * as actionTypes from './actionTypes';
import axios from 'axios';

const urlBack = process.env.REACT_APP_API_URL;

export const getAllProducts = (pag) => dispatch => {
	axios
		.get(`${urlBack}/products/pag/?p=${pag}`)
		.then(res => {
			const products = res.data.data;

			dispatch({type: actionTypes.GET_ALL_PRODUCTS, payload: products});

			dispatch({type: actionTypes.CLEAN_MESSAGES});
		})
		.catch(err => dispatch(catchError(err)));
};

// export const getProduct = () => dispatch => {
// 	dispatch({
// 		type: actionTypes.GET_PRODUCT
// 	});
// };

export const postProduct = (product, categories) => dispatch => {
	axios
		.post(`${urlBack}/products/`, product)
		.then(res => {
			dispatch({type: actionTypes.POST_PRODUCT, payload: res.data});

			if (categories.length) dispatch(modifyProductCategories(res.data.id, categories));
			else dispatch(getAllProducts());
		})
		.catch(err => dispatch(catchError( err)));
};

export const deleteProduct = productId => dispatch => {
	axios
		.delete(`${urlBack}/products/${productId}`)
		.then(res => {
			dispatch({type: actionTypes.DELETE_PRODUCT, payload: res.data});

			dispatch(getAllProducts());
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
	dispatch({type: actionTypes.PRODUCTS_ERROR, payload: err.response.data});
	dispatch({type: actionTypes.CLEAN_MESSAGES});
};
