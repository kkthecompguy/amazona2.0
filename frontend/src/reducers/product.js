import * as actionTypes from '../actions/actionTypes';

const initialState = {
  products: [],
  filtered: [],
  product: {},
  size: "",
  sort: "",
  loading: false,
}

export default function (state=initialState, action) {
  switch (action.type) {
    case actionTypes.PRODUCTS_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case actionTypes.PRODUCTS_LIST_SUCCESS:
      return {
        ...state,
        products: action.payload,
        filtered: action.payload,
        loading: false
      }
    case actionTypes.PRODUCTS_LIST_FAIL:
      return {
        ...state,
        loading: false
      }
    case actionTypes.FILTER_PRODUCTS_BY_SIZE:
      return {
        ...state,
        size: action.payload.size,
        products: action.payload.items
      }
    case actionTypes.ORDER_PRODUCTS_BY_PRICE:
      return {
        ...state,
        sort: action.payload.sort,
        products: action.payload.items
      }
    default:
      return state
  }
}