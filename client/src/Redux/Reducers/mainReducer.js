import {combineReducers} from 'redux';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import carritoReducer from './carritoReducer';
// import userReducer from './userReducer';

export default combineReducers({
	categories: categoryReducer,
	products: productReducer,
	carrito: carritoReducer
	// users: userReducer
});
