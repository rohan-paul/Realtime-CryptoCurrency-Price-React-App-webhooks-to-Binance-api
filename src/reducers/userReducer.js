import {
  LOADING,
  LOAD_CURRENCY_LIST,
  ERROR_WHILE_FETCHING_INITIAL_CURRENCY_LIST,
  USER_SELECTED_CURRENCY,
  SNACKBAR_STATUS,
} from "../actions/types"

const initialState = {
  loading: false,
  currencyList: [],
  error_while_fetching_initial_currency_list: false,
  error_while_fetching_initial_data: false,
  user_selected_currency: "",
  snackbar: false,
}

export default (state = initialState, actions) => {
  switch (actions.type) {
    case LOADING:
      return {
        ...state,
        loading: actions.payload,
      }
    case SNACKBAR_STATUS:
      console.log("SNACKBAR COMING TO REDUCER ", actions.payload)
      return {
        ...state,
        snackbar: actions.payload,
      }

    case LOAD_CURRENCY_LIST:
      console.log("curr list in reducer ", actions.payload)
      return {
        ...state,
        currencyList: actions.payload,
      }

    case ERROR_WHILE_FETCHING_INITIAL_CURRENCY_LIST:
      return {
        ...state,
        snackbar: true,
      }
    case USER_SELECTED_CURRENCY:
      return {
        ...state,
        user_selected_currency: actions.payload,
      }

    default:
      return state
  }
}
