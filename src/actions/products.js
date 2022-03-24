import client from "../client";
import {
  GET_PRODUCTS_BY_CATEGORY_REDUCER,
} from "../constants";
import { GET_PRODUCTS_BY_CATEGORY } from "../gql/queries";

export const getProductsByCategory = (category) => async (dispatch) => {
  try {
    const { data } = await client.query({
      query: GET_PRODUCTS_BY_CATEGORY,
      variables: { categoryid: category },
    });
    
    dispatch({
      type: GET_PRODUCTS_BY_CATEGORY_REDUCER,
      payload: data.category,
    });
  } catch (e) {
    console.log(e);
  }
};

// export const changeProductsAttribute = (value) => async (dispatch) => {
//   dispatch({
//     type: CHANGE_ALL_PRODUCT_ATTRIBUTE,
//     payload: value,
//   });
// };
