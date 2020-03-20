import {createStore, applyMiddleware, compose} from 'redux';
//Thunking means spliting data into chunks
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const middleware = [thunk];
const store = createStore(
    rootReducer, 
    {},
    compose(
    //... means spread operator
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));  

export default store;
