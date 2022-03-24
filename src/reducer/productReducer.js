import {
  GET_PRODUCTS_BY_CATEGORY_REDUCER,
} from "../constants";

export default function productReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS_BY_CATEGORY_REDUCER:
      return { ...action.payload };
    default:
      return state;
  }
}
