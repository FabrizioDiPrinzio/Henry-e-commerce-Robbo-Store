import * as actionTypes from '../Actions/actionTypes';

const initialState = {
	currentCart: []
};

export default function purchaseOrderReducer(state = initialState, action) {
	switch (action.type) {
		// case actionTypes.GET_PREVIOUS_CART:
		// 	return {

		// 		SI ES userType: User o Admin

		// 		pedir al back el último carrito. y setearlo en current cart

		// 		axios.get('${urlBack}/user/:idUser/cart')
		// 		dispachar el carrito obtenido

		// 		...state,
		// 	};

		// case actionTypes.POST:
		// 	return{
		// 		if (state.user.userType === ('User' || 'Admin') )

		// 		if (state.user.userType === 'Guest')
		// 	}

		default:
			return state;
	}
}
