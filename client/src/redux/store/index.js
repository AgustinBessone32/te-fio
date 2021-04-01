import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../users/reducer';


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


let store = createStore(userReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;