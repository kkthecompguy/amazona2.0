import { combineReducers } from 'redux';
import product from './product';
import errors from './errors';

export default combineReducers({
  product,
  errors
});