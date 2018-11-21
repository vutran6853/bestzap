import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import categoriesListReducer from './categoriesListReducer';
import userDataReducer from './userDataReducer';

////  Use for mult reducers
const combinedReducers  = combineReducers({
  categoriesList: categoriesListReducer,
  userData: userDataReducer
});

////  Redux Devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = composeEnhancers(applyMiddleware(promiseMiddleware()));

////  Store combineReducer and Middleware into store
const store = createStore(combinedReducers, middlewares);

export default store;
