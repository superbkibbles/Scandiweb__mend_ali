import {
  ADD_TO_CART,
  OPEN__CLOSE_CART,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  CHANGE_ATRIBUTE,
  REMOVE_PRODUCT,
} from "../constants";

export const openCloseCart = (isOpen) => async (dispatch) => {
  dispatch({
    type: OPEN__CLOSE_CART,
    payload: isOpen,
  });
};

export const addToCart = (product, artibutes, i) => async (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: { product: product, artibutes: artibutes, count: 1, i },
  });
};

export const incrementCount = (id, count) => async (dispatch) => {
  const req = { id, count };
  dispatch({
    type: INCREMENT_COUNT,
    payload: req,
  });
};

export const decrementCount = (id, count) => async (dispatch) => {
  const req = { id, count };
  dispatch({
    type: DECREMENT_COUNT,
    payload: req,
  });
};

export const changeArtibutes = (value) => async (dispatch) => {
  dispatch({
    type: CHANGE_ATRIBUTE,
    payload: value,
  });
};

export const removeProduct = (id) => async (dispatch) => {
  dispatch({
    type: REMOVE_PRODUCT,
    payload: id,
  });
};
