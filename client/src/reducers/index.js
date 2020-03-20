//It will allow you to combine multiple reducers & pass it as a single to store
import {combineReducers} from 'redux';
//Import all reducer file
import authReducer from './authReducer';
import errorReducer from './errorReducer';


export default combineReducers({
    auth: authReducer,
    errors: errorReducer
})
