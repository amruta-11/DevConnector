import {SET_CURRENT_USER, GET_ERRORS} from './types';
import axios from 'axios';

//Action-Register User
//This action will write the user to the state
//userData will come from the FORM after clicking the submit button
export const registerUser = (userData, history) => dispatch => {
    axios
      .post('/api/users/register', userData)
      .then(res => history.push('/login'))
      .catch(err =>
        dispatch(
            {
                type: GET_ERRORS,
                payload: err.response.data
            }
        ));
        

}

// {
//     return {
//     //We are returning an object having type of dispatch call & data is sent as payload
//     type: SET_CURRENT_USER,
//     payload: userData
//     } 
// }