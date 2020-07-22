import { combineReducers } from 'redux';
import product from './product';
import cart from './cart';
import errors from './errors';
import auth from './auth';

export default combineReducers({
  product,
  cart,
  auth,
  errors
});