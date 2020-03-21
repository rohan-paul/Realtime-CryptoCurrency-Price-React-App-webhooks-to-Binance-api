import React from "react"
import renderer from "react-test-renderer"
import { MuiThemeProvider } from "@material-ui/core/styles"
import globalTheme from "./globalTheme"
import PropTypes from "prop-types"
import { mount, shallow } from "enzyme"
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
  let component

  beforeEach(() => {
    shallow = createShallow()
    useSelectorSpy = jest.spyOn(Redux, "useSelector")
    useDispatchSpy = jest.spyOn(Redux, "useDispatch")
    useDispatchSpy.mockImplementation(() => (cb: Action) => cb)

    store = mockStore({
      globalStore: {
        loading: false,
        error_while_fetching_initial_currency_list: false,
        error_while_fetching_initial_data: false,
        city_to_search: "",
        snackbar: false,
        topTenUsersInCity: [],
        totalNoOfUsersFromAPI: 0,
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

  /*   it("renders an error message when a network error occurs", () => {
    props.users.error = true
    const tree = renderer.create(<App {...props} />)

    expect(tree.toJSON()).toMatchSnapshot()
  }) */

  /*   it("calls the getUsers function when the button is clicked", () => {
    props.getUsers = jest.fn()
    const wrapper = shallow(<App {...props} />)
    const spy = jest.spyOn(wrapper.instance().props, "getUsers")

    wrapper.find("button").simulate("click")
    expect(spy).toHaveBeenCalled()
  }) */

  /*   it("renders the User component correctly", () => {
    props.users.users = [
      {
        id: 1,
        name: "foo",
      },
    ]
    const wrapper = shallow(<App {...props} />)

    expect(wrapper.find("User").length).toBe(1)
  }) */
})
