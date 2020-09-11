import {combineReducers} from 'redux';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
// import purchaseOrderReducer from './purchaseOrderReducer'
// import userReducer from './userReducer';

export default combineReducers({
	categories: categoryReducer,
	products: productReducer
	// carrito: purchaseOrderReducer
	// users: userReducer
});
