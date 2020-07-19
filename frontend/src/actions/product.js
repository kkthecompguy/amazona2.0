import * as actionTypes from './actionTypes';
import axios from 'axios';
import { returnErrors } from './errors';

export const fetchProducts = () => async dispatch => {
  try {
    dispatch({ type: actionTypes.PRODUCTS_LIST_REQUEST })

    const res = await axios.get('/api/products');

    dispatch({
      type: actionTypes.PRODUCTS_LIST_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    dispatch({ type: actionTypes.PRODUCTS_LIST_FAIL });
    dispatch(returnErrors(err.response.data, err.response.status));
  }
} 


export const filterProducts = (products, size) => async dispatch => {
  dispatch({
    type: actionTypes.FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items: size === "" ? products : products.filter(x => x.availableSizes.indexOf(size) >= 0)
    }
  });
}

export const sortProducts = (products, sort) => async dispatch => {
  if (sort)
  dispatch({
    type: actionTypes.ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: products.slice().sort((a, b) => sort === "lowest" ?
        a.price > b.price
        ? 1
        : -1
      : sort === "highest" 
        ? a.price < b.price
          ? 1
          : -1
        : a._id < b._id 
          ? 1
          : -1
      )
    }
  })
}

