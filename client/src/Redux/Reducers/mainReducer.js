import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import userReducer from './userReducer';
// Fin de imports

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart', 'user']
};

const rootReducer = combineReducers({
	categories: categoryReducer,
	products: productReducer,
	cart: cartReducer,
	user: userReducer
});

export default persistReducer(persistConfig, rootReducer);
