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
})
