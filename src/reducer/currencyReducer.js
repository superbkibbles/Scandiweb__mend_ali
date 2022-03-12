import { OPEN__CLOSE_DROPDOWN, CHANGE_CURRENCY, GET_ALL_CURRENCIES } from "../constants";

const initState = {
  isOpen: false,
  currencies: [
    {
      symbol: "$",
      label: "USD",
    },
    {
      symbol: "¥",
      label: "JPY",
    },
  ],
  activeCurrency: "$",
};

export default function currencyReducer(state = initState, action) {
  switch (action.type) {
    case OPEN__CLOSE_DROPDOWN:
      return { ...state, isOpen: action.payload };
      case GET_ALL_CURRENCIES: 
      return {...state, currencies: action.payload}
    case CHANGE_CURRENCY:
      return {
        ...state,
        activeCurrency: action.payload,
        isOpen: false,
      };
    default:
      return state;
  }
}
