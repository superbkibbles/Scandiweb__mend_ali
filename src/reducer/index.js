import { combineReducers } from "redux";

import cartReducer from "./cartReducer";
import currencyReducer from "./currencyReducer";
import productReducer from "./productReducer";

export default combineReducers({
  cart: cartReducer,
  currency: currencyReducer,
  products: productReducer,
});
