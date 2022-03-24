import _ from "lodash";

import {
  OPEN__CLOSE_CART,
  ADD_TO_CART,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  CHANGE_ATRIBUTE,
  REMOVE_PRODUCT,
} from "../constants";

const initState = {
  isOpen: false,
  products: [],
};

export default function cartReducer(state = initState, action) {
  switch (action.type) {
    case OPEN__CLOSE_CART:
      return { ...state, isOpen: action.payload };
    case ADD_TO_CART:
      const prds = state.products.filter(
        (p) => p.product.id === action.payload.product.id
      );
      let isEqual = false;
      let index = 0;
      if (prds?.length > 0) {
        prds.forEach((p, i) => {
          if (_.isEqual(p.artibutes, action.payload.artibutes)) {
            isEqual = true;
            index = i;
            return;
          }
        });
      }
      if (isEqual) {
        state.products[index].count = state.products[index].count + 1;
        return { ...state };
      }
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case INCREMENT_COUNT:
      const { id, count } = action.payload;
      state.products[id].count = count + 1;
      return { ...state };

    case DECREMENT_COUNT:
      const { id: dID, count: dCount } = action.payload;
      state.products[dID].count = dCount - 1;
      return { ...state };

    case CHANGE_ATRIBUTE:
      state.products[action.payload.productID].artibutes = {
        ...state.products[action.payload.productID].artibutes,
        [action.payload.attributeID]: action.payload.id,
      };

      return { ...state };
    case REMOVE_PRODUCT:
      state.products.splice(action.payload, 1);
      return { ...state };
    default:
      return state;
  }
}
