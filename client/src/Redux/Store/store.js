import {createStore, applyMiddleware, compose} from 'redux';
import mainReducer from '../Reducers/mainReducer.js';
import {persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

export const store = createStore(
	mainReducer,
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export const persistor = persistStore(store);
