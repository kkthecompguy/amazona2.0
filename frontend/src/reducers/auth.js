import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  token: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_SIGIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.USER_SIGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      }
    case actionTypes.USER_SIGIN_FAIL:
      return {
        ...state,
        loading: false
      }
    case actionTypes.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        token: null
      }
    default:
      return state
  }
}