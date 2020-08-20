import reducer from "../userReducer"
import expect from "expect"
import * as actions from "../../actions/getUserActions"
import {
  LOADING,
  LOAD_CURRENCY_LIST,
  ERROR_WHILE_FETCHING_INITIAL_CURRENCY_LIST,
  USER_SELECTED_CURRENCY,
  SNACKBAR_STATUS,
  LOAD_SELECTED_TICKER_DATA,
} from "../../actions/types"

const initialState = {
  loading: false,
  currencyList: [],
  error_while_fetching_initial_currency_list: false,
  error_while_fetching_initial_data: false,
  user_selected_currency: "",
  selected_ticker_data: [],
  snackbar: false,
  current_websocket_connection: null,
}

describe("post reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it("should handle SNACKBAR_STATUS", () => {
    const snackbarAction = {
      type: SNACKBAR_STATUS,
      payload: true,
    }
    expect(reducer({}, snackbarAction)).toEqual({ snackbar: true })
  })

  it("should handle ERROR_WHILE_FETCHING_INITIAL_CURRENCY_LIST", () => {
    const errorWhileFetchingTableAction = {
      type: ERROR_WHILE_FETCHING_INITIAL_CURRENCY_LIST,
      payload: true,
    }
    expect(reducer({}, errorWhileFetchingTableAction)).toEqual({
      snackbar: true,
      error_while_fetching_initial_currency_list: true,
    })
  })

  it("should handle CITY_TO_SEARCH", () => {
    const userSelectedCurrency = {
      type: USER_SELECTED_CURRENCY,
      payload: "ETH",
    }
    expect(reducer({}, userSelectedCurrency)).toEqual({
      user_selected_currency: "ETH",
    })
  })

  it("should get correct Ticker data", () => {
    const tickerData = [
      {
        s: "ETHUSDT",
        c: "128.01000000",
        h: "152.55000000",
        l: "116.74000000",
        v: "2288718.42508000",
        n: 679454,
      },
    ]

    const loadSelectedTickerData = {
      type: LOAD_SELECTED_TICKER_DATA,
      payload: {
        loading: false,
        tickerData: tickerData,
        current_websocket_connection: true,
      },
    }
    expect(reducer({}, loadSelectedTickerData)).toEqual({
      loading: false,
      current_websocket_connection: true,
      selected_ticker_data: tickerData,
    })
  })
})
