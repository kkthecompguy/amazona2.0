import * as actionTypes from '../actions/actionTypes';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  order: null,
  orders: [],
  loading: false
}

export default function (state=initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: action.payload
      }
    case actionTypes.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: action.payload
      }
    case actionTypes.CREATE_ORDER:
      return {
        ...state,
        order: action.payload,
      }
    case actionTypes.CLEAR_ORDER:
      return {
        ...state,
        order: null
      }
    case actionTypes.CLEAR_CART_ITEMS:
      return {
        ...state,
        cartItems: []
      }
    case actionTypes.ORDERS_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.ORDERS_LIST_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false
      }
    case actionTypes.ORDER_DELETE_SUCCESS:
      return {
        ...state,
        orders: action.payload
      }
    default:
      return state
  }
}