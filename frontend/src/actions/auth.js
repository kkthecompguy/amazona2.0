import * as actionTypes from './actionTypes';
import axios from 'axios';
import { returnErrors } from './errors';


export const signin = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    dispatch({ type: actionTypes.USER_SIGIN_REQUEST });

    const res = await axios.post('/api/users/signin', formData, config);

    dispatch({
      type: actionTypes.USER_SIGIN_SUCCESS,
      payload: res.data
    });

    history.push('/orders');

  } catch (err) {
    console.log(err);
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: actionTypes.USER_SIGIN_FAIL });
  }
}


export const logout = () => dispatch => {
  dispatch({ type: actionTypes.USER_LOGOUT_SUCCESS });
}
