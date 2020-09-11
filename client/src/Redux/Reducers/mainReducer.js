import {combineReducers} from 'redux';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import userReducer from './userReducer';

export default combineReducers({
	categories: categoryReducer,
	products: productReducer,
	cart: cartReducer,
	user: userReducer
});
