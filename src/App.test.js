import React from "react"
import renderer from "react-test-renderer"
import { MuiThemeProvider } from "@material-ui/core/styles"
import globalTheme from "./globalTheme"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import App from "./App"
import { Action } from "redux"
import { createShallow } from "@material-ui/core/test-utils"
import * as Redux from "react-redux"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("App Component", () => {
  let shallow: typeof enzyme.shallow
  let useSelectorSpy: jest.SpyInstance
  let useDispatchSpy: jest.SpyInstance

  let store

  beforeEach(() => {
    shallow = createShallow()
    useSelectorSpy = jest.spyOn(Redux, "useSelector")
    useDispatchSpy = jest.spyOn(Redux, "useDispatch")
    useDispatchSpy.mockImplementation(() => (cb: Action) => cb)

    store = mockStore({
      globalStore: {
        loading: false,
        currencyList: [],
        error_while_fetching_initial_currency_list: "",
        error_while_fetching_initial_data: false,
        user_selected_currency: "",
        selected_ticker_data: [],
        snackbar: false,
        current_websocket_connection: null,
      },
    })
  })
  it("renders without crashing", () => {
    const tree = renderer.create(
      <Provider store={store}>
        <MuiThemeProvider theme={globalTheme}>
          <App />
        </MuiThemeProvider>
      </Provider>,
    )

    expect(tree.toJSON()).toMatchSnapshot()
  })

  it("should work", () => {
    useSelectorSpy.mockReturnValue({
      bar: "baz",
    })
    const wrapper = shallow(<App />)
    expect(wrapper.is(App))
  })
})
