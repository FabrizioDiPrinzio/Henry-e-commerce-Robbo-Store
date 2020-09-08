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
		.get(`${urlBack}/products/category/names`)  // hace la petición al back
		.then(response => {

      const categories = response.data.map(category => {
        return {
          id: category.id,
          name: category.name,
          description: category.description
        }
      }) // guarda en la constante la respuesta de la petición (mapenado lo que necesita)
      
      dispatch({
				type: actionTypes.GET_ALL_CATEGORIES,
				payload: categories                    // dispacha una action que es un objeto y en el payload está la respuesta.
      })
      
		}).catch(error => {
      const errorMsg = error.message // si hubo un error guarda el mensaje
      dispatch({
        type: actionTypes.CATEGORIES_ERROR,
        payload: errorMsg  // dispacha una action que es un objeto y en el payload está el error.
      })
    });
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

export const putCategory = (id, body) => dispatch => {
  axios.put(`${urlBack}/products/category/${id}`, body) // hace la petición con los parametros pasados
  .then(response => {
    const editedCategory = response.data
    
    dispatch({
      type: actionTypes.PUT_CATEGORY,
      payload: editedCategory         // dispacha una action que es un objeto y en el payload está la respuesta.
    })

    dispatch(getAllCategories())
    
  }).catch(error => {
    const errorMsg = error.message
    dispatch({
      type: actionTypes.CATEGORIES_ERROR,
      payload: errorMsg  // dispacha una action que es un objeto y en el payload está el error.
    })
  });

};