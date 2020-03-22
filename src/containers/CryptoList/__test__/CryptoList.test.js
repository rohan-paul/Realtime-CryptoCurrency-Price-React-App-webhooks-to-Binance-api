import React from "react"
import renderer from "react-test-renderer"
import { MuiThemeProvider } from "@material-ui/core/styles"
import globalTheme from "../../../globalTheme"
import { mount, shallow } from "enzyme"
import expect from "expect"
import { createShallow, createMount } from "@material-ui/core/test-utils"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import CryptoList from "../"
import * as Redux from "react-redux"
import { Action } from "redux"
import Select from "react-select"

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureMockStore(middlewares)

describe("CryptoList Component", () => {
  let shallow: typeof enzyme.shallow
  let useSelectorSpy: jest.SpyInstance
  let useDispatchSpy: jest.SpyInstance

  let store
  let component
  let wrapperComp

  beforeEach(() => {
    shallow = createShallow()
    useSelectorSpy = jest.spyOn(Redux, "useSelector")
    useDispatchSpy = jest.spyOn(Redux, "useDispatch")
    useDispatchSpy.mockImplementation(() => (cb: Action) => cb)

    /* Everything I pass into mockStore will be my Redux store's initial state. */
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

    wrapperComp = mount(
      <Provider store={store}>
        <MuiThemeProvider theme={globalTheme}>
          <CryptoList />
        </MuiThemeProvider>
      </Provider>,
    )

    store.dispatch = jest.fn()

    component = renderer.create(
      <Provider store={store}>
        <MuiThemeProvider theme={globalTheme}>
          <CryptoList />
        </MuiThemeProvider>
      </Provider>,
    )
  })

  it("should render with given state from Redux store", () => {
    expect(component.toJSON()).toMatchSnapshot()
  })

  it("Bare minimum Shallow rendering for test should work", () => {
    useSelectorSpy.mockReturnValue({
      loading: false,
      currencyList: [],
      error_while_fetching_initial_currency_list: "",
      error_while_fetching_initial_data: false,
      user_selected_currency: "",
      selected_ticker_data: [],
      snackbar: false,
      current_websocket_connection: null,
    })

    const wrapperComp1 = shallow(
      <Provider store={store}>
        <MuiThemeProvider theme={globalTheme}>
          <CryptoList />
        </MuiThemeProvider>
      </Provider>,
    )
    expect(wrapperComp1.is(CryptoList))
  })

  it("should render Select Component correct number of times", () => {
    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider theme={globalTheme}>
          <CryptoList />
        </MuiThemeProvider>
      </Provider>,
    )
    console.log("WRAPPER IS ", wrapper.find("Select").length)
    expect(wrapper.find("Select").length).toEqual(1)
  })
})
