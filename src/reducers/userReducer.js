import {
  LOADING,
  LOAD_CURRENCY_LIST,
  ERROR_WHILE_FETCHING_INITIAL_CURRENCY_LIST,
  USER_SELECTED_CURRENCY,
  SNACKBAR_STATUS,
  LOAD_SELECTED_TICKER_DATA,
  LOAD_ORDER_BOOK_DATA,
} from "../actions/types"

const initialState = {
  loading: false,
  currencyList: [],
  error_while_fetching_initial_currency_list: false,
  error_while_fetching_initial_data: false,
  user_selected_currency: "",
  selected_ticker_data: [],
  snackbar: false,
  current_websocket_connection: null,
  buyOrder_websocket_connection: null,
  order_book_buy_data: [],
  order_book_sell_data: [],
}

export default (state = initialState, actions) => {
  switch (actions.type) {
    case LOADING:
      return {
        ...state,
        loading: actions.payload,
      }
    case SNACKBAR_STATUS:
      return {
        ...state,
        snackbar: actions.payload,
      }

    case LOAD_CURRENCY_LIST:
      return {
        ...state,
        loading: false,
        currencyList: actions.payload,
      }

    case ERROR_WHILE_FETCHING_INITIAL_CURRENCY_LIST:
      return {
        ...state,
        snackbar: true,
        error_while_fetching_initial_currency_list: actions.payload,
      }
    case USER_SELECTED_CURRENCY:
      return {
        ...state,
        user_selected_currency: actions.payload,
      }
    case LOAD_SELECTED_TICKER_DATA:
      return {
        ...state,
        loading: false,
        selected_ticker_data: actions.payload.tickerData,
        current_websocket_connection:
          actions.payload.current_websocket_connection,
      }

    case LOAD_ORDER_BOOK_DATA:
      return {
        ...state,
        loading: false,
        buyOrder_websocket_connection:
          actions.payload.buyOrder_websocket_connection,
        order_book_buy_data: actions.payload.buy,
        order_book_sell_data: actions.payload.sell,
      }

    default:
      return state
  }
}
