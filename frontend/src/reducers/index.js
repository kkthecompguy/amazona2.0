import { combineReducers } from 'redux';
import product from './product';
import cart from './cart';
import errors from './errors';

export default combineReducers({
  product,
  cart,
  errors
});