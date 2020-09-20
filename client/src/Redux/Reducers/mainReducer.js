import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import userReducer from './userReducer';
// Fin de imports

const persistConfig = {
	key: 'root',
	storage: storageSession,
	whitelist: ['cart']
};

const rootReducer = combineReducers({
	categories: categoryReducer,
	products: productReducer,
	cart: cartReducer,
	user: userReducer
});

export default persistReducer(persistConfig, rootReducer);
