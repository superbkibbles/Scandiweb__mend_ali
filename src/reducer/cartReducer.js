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
      const newArr = [...state.products, action.payload];
      return {
        ...state,
        products: newArr,
      };
    case INCREMENT_COUNT:
      const { id, count } = action.payload;
      const index = state.products.findIndex((p) => p.product.id === id);
      if (index === -1) return state;
      state.products[index].count = count + 1;
      return { ...state };

    case DECREMENT_COUNT:
      const { id: dID, count: dCount } = action.payload;
      const dIndex = state.products.findIndex((p) => p.product.id === dID);
      if (dIndex === -1) return state;
      state.products[dIndex].count = dCount - 1;
      return { ...state };

    case CHANGE_ATRIBUTE:
      const product = state.products.filter(
        (p) => p.product.id === action.payload.productID
      )[0];

      product.artibutes[action.payload.attributeID] = action.payload.id;
      const newD = state.products.map((p) =>
        p.product.id === action.payload.productID ? product : p
      );
      return { ...state, products: newD };
    case REMOVE_PRODUCT:
      const newProductList = state.products.filter(
        (p) => p.product.id !== action.payload
      );
      return { ...state, products: newProductList };
    default:
      return state;
  }
}
