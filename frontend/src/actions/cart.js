import *as actionTypes from './actionTypes';
import axios from 'axios';
import { returnErrors } from './errors';


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


export const fetchOrders = () => async (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    dispatch({ type: actionTypes.ORDERS_LIST_REQUEST });

    const res = await axios.get('/api/orders', config);

    dispatch({
      type: actionTypes.ORDERS_LIST_SUCCESS,
      payload: res.data
    });

  } catch (err) {
    console.log(err);
    dispatch(returnErrors(err.response.data, err.response.status));
  }
}


export const deleteOrder = orderId => async (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    Authorization: `Bearer ${token}`
  }

  try {
    await axios.delete(`/api/orders/${orderId}`, config);

    const orders = getState().cart.orders.slice().filter(order => order._id !== orderId);

    dispatch({
      type: actionTypes.ORDER_DELETE_SUCCESS,
      payload: orders
    });

  } catch (err) {
    console.log(err);
    dispatch(returnErrors(err.response.data, err.response.status));
  }
}