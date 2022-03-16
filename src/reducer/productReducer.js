import {
  GET_PRODUCTS_BY_CATEGORY_REDUCER,
  CHANGE_ALL_PRODUCT_ATTRIBUTE,
} from "../constants";

export default function productReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS_BY_CATEGORY_REDUCER:
      return { ...action.payload };
    case CHANGE_ALL_PRODUCT_ATTRIBUTE:
      const product = state.products.filter(
        (p) => p.id === action.payload.productID
      )[0];
      const a = product.selectedArtibutes
        ? product
        : { ...product, selectedArtibutes: {} };

      a.selectedArtibutes[action.payload.attributeID] = action.payload.id;
      const newD = state.products.map((p) =>
        p.id === action.payload.productID ? a : p
      );
      return { ...state, products: newD };
    default:
      return state;
  }
}
