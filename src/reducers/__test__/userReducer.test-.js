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

  // it("should handle SNACKBAR_STATUS", () => {
  //   const snackbarAction = {
  //     type: SNACKBAR_STATUS,
  //     payload: true,
  //   }
  //   expect(reducer({}, snackbarAction)).toEqual({ snackbar: true })
  // })

  // it("should handle ERROR_WHILE_FETCHING_INITIAL_CURRENCY_LIST", () => {
  //   const errorWhileFetchingTableAction = {
  //     type: ERROR_WHILE_FETCHING_INITIAL_CURRENCY_LIST,
  //     payload: true,
  //   }
  //   expect(reducer({}, errorWhileFetchingTableAction)).toEqual({
  //     snackbar: true,
  //   })
  // })

  // it("should handle CITY_TO_SEARCH", () => {
  //   const cityToSearchAction = {
  //     type: CITY_TO_SEARCH,
  //     payload: "Bengaluru",
  //   }
  //   expect(reducer({}, cityToSearchAction)).toEqual({
  //     city_to_search: "Bengaluru",
  //   })
  // })
})
