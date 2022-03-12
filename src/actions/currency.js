import client from "../client";
import {
  OPEN__CLOSE_DROPDOWN,
  CHANGE_CURRENCY,
  GET_ALL_CURRENCIES,
} from "../constants";
import { GET_CURRENCIES } from "../gql/queries";

export const openCloseDropdown = (isOpen) => async (dispatch) => {
  dispatch({
    type: OPEN__CLOSE_DROPDOWN,
    payload: isOpen,
  });
};

export const changeCurrency = (value) => async (dispatch) => {
  dispatch({
    type: CHANGE_CURRENCY,
    payload: value,
  });
};

export const getCurrencies = () => async (dispatch) => {
  try {
    const { data } = await client.query({
      query: GET_CURRENCIES
    });
    dispatch({
      type: GET_ALL_CURRENCIES,
      payload: data.currencies,
    });
  } catch (e) {
    console.log(e);
  }
};
