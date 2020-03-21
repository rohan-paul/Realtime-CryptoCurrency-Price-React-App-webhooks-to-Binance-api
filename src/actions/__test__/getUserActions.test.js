import configureStore from "redux-mock-store"
import thunk from "redux-thunk"
import * as getUserActions from "../getUserActions"
const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const store = mockStore({})

describe("User Signup Actions Tests", () => {
  it("should set snackbar status when executing handleSnackBarStatus() ", () => {
    const handleSnackBarStatusPayload = getUserActions.handleSnackBarStatus(
      false,
    )
    expect(handleSnackBarStatusPayload).toEqual({
      type: "SNACKBAR_STATUS",
      payload: false,
    })
  })

  it("should handleUserCurrencySelection correctly ", () => {
    const handleUserCurrencySelectionPayload = getUserActions.handleUserCurrencySelection(
      "ETH",
    )
    expect(handleUserCurrencySelectionPayload).toEqual({
      type: "USER_SELECTED_CURRENCY",
      payload: "ETH",
    })
  })

  // it("should getSelectedCurrency correctly ", () => {
  //   const expectedPayload = {
  //     tickerData: [
  //       {
  //         s: "ETHUSDT",
  //         c: "128.01000000",
  //         h: "152.55000000",
  //         l: "116.74000000",
  //         v: "2288718.42508000",
  //         n: 679454,
  //       },
  //     ],
  //     current_websocket_connection: WebSocket,
  //   }
  //   const getSelectedCurrencyPayload = getUserActions.getSelectedCurrency("eth")
  //   expect(getSelectedCurrencyPayload).toEqual({
  //     type: "LOAD_SELECTED_TICKER_DATA",
  //     payload: expectedPayload,
  //   })
  // })
})
