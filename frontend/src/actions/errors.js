import * as actionTypes from './actionTypes';

export const returnErrors = (msg, status) => dispatch => {
  dispatch({
    type: actionTypes.GET_SERVER_ERRORS,
    payload: {msg, status}
  });
}