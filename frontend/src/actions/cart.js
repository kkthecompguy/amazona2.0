import *as actionTypes from './actionTypes';
import axios from 'axios';

export const addToCart = product => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  let alreadyInCart = false;

  cartItems.forEach(item => {
    if (item._id === product._id) {
      item.count++;
      alreadyInCart = true;
    }
  });

  if (!alreadyInCart) {
    cartItems.push({...product, count: 1});
  }

  dispatch({
    type: actionTypes.ADD_ITEM_TO_CART,
    payload: cartItems
  });

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export const removeFromCart = product => (dispatch, getState) => {
  const { cart: { cartItems } } = getState();
  const items = cartItems.slice().filter(item => item._id !== product._id);

  dispatch({
    type: actionTypes.REMOVE_ITEM_FROM_CART,
    payload: items
  });

  localStorage.setItem("cartItems", JSON.stringify(items));
}

export const createOrder = order => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    const res = await axios.post('/api/orders', order, config);

    dispatch({
      type: actionTypes.CREATE_ORDER,
      payload: res.data
    });

    dispatch({ type: actionTypes.CLEAR_CART_ITEMS });

    localStorage.removeItem("cartItems");

  } catch (error) {
    console.log(error);
  }
}

export const clearOrder = () => dispatch => {
  dispatch({ type: actionTypes.CLEAR_ORDER });
}