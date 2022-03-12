import { combineReducers } from "redux";

import cartReducer from "./cartReducer";
import currencyReducer from "./currencyReducer";

export default combineReducers({
  cart: cartReducer,
  currency: currencyReducer,
});
