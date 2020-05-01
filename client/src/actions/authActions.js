import {SET_CURRENT_USER, GET_ERRORS} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

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

//Action - Login User - Needs to get the user token
export const loginUser = userData => dispatch => {
    axios
      .post('/api/users/login', userData)
      .then(res => {
          //token needs to carried with each call
          //Save token to localstorage
          const {token} = res.data;
          
          //set token to localstorage
          localStorage.setItem('jwtToken', token);

          //set token to authheader(like we use to do in postman)
          setAuthToken(token);

          //Decode token to get the user data
          var decoded = jwt_decode(token);

          //Set current user - redux
          dispatch({
              type: SET_CURRENT_USER,
              payload: decoded
          })

      })
        .catch(err =>
            dispatch(
                {
                    type: GET_ERRORS,
                    payload: err.response.data
                }
            ));
}


//Log user out
export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Remove from redux store
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    })
  };

