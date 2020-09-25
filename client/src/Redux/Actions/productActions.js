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
		.catch(err => console.log(err));
};

export const cleanProduct = () => dispatch => {
	dispatch({type: actionTypes.CLEAN_PRODUCTS});
};
