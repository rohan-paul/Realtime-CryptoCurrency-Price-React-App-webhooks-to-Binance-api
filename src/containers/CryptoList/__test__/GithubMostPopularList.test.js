import React from "react"
import renderer from "react-test-renderer"
import { MuiThemeProvider } from "@material-ui/core/styles"
import globalTheme from "../../../globalTheme"
import PropTypes from "prop-types"
import { mount, shallow } from "enzyme"
import expect from "expect"
import { createShallow, createMount } from "@material-ui/core/test-utils"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import CryptoList from "../CryptoList"
import EachUserListItem from "../EachUserListItem"
import {
  handleCityToSearchChange,
  handleSnackBarStatus,
} from "../../../actions/getUserActions"
import Button from "@material-ui/core/Button"
import { useDispatch } from "react-redux"
import * as Redux from "react-redux"
import { Action } from "redux"
import Autosuggest from "react-autosuggest"
import TablePagination from "@material-ui/core/TablePagination"

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

    /* Everything you pass into mockStore will be your Redux store's initial state. So make sure you provide everything that's needed by your connected React component to render without any problems. */
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
      error_while_fetching_initial_currency_list: false,
      error_while_fetching_initial_data: false,
      city_to_search: "",
      snackbar: false,
      topTenUsersInCity: ["a", "b"],
      totalNoOfUsersFromAPI: 0,
    })
    // const wrapperComp = shallow(<CryptoList />)

    const wrapperComp1 = shallow(
      <Provider store={store}>
        <MuiThemeProvider theme={globalTheme}>
          <CryptoList />
        </MuiThemeProvider>
      </Provider>,
    )
    expect(wrapperComp1.is(CryptoList))
  })

  it("should render EachUserListItem Component correct number of times", () => {
    const wrapper = mount(
      <Provider store={store}>
        <MuiThemeProvider theme={globalTheme}>
          <CryptoList />
        </MuiThemeProvider>
      </Provider>,
    )
    // console.log("STORE IS ", store.getState())
    expect(wrapper.find("EachUserListItem").length).toEqual(1)
  })

  it("should render Autosuggest Component correct number of times", () => {
    expect(wrapperComp.find("Autosuggest").length).toEqual(1)
  })

  /*   it("should submit proper search term after Autosuggest has value and the Search button is clicked", () => {
    wrapperComp.find("Autosuggest").props().inputProps.value = "Bangalore"
    expect(wrapperComp.find("Autosuggest").props().inputProps.value).toEqual(
      "Bangalore",
    )
    wrapperComp.update()
    console.log(
      "AUTO SUGGEST VALUE ",
      wrapperComp.find("Autosuggest").props().inputProps.value,
    )
    wrapperComp
      .find(Button)
      .last()
      .simulate("click")

    wrapperComp.update()

    console.log("STORE IS ", store.getState())
  }) */

  it("should submit proper search term after Autosuggest has value and the Search button is clicked", () => {
    wrapperComp.find(Autosuggest).props().inputProps.value = "Bangalore"
    expect(wrapperComp.find(Autosuggest).props().inputProps.value).toEqual(
      "Bangalore",
    )
    // wrapperComp.update()
    // console.log("AUTO SUGGEST VALUE ", wrapperComp.find("Autosuggest").props())

    const store1 = mockStore({
      globalStore: {
        loading: false,
        error_while_fetching_initial_currency_list: false,
        error_while_fetching_initial_data: false,
        city_to_search: `${
          wrapperComp.find(Autosuggest).props().inputProps.value
        }`,
        snackbar: false,
        topTenUsersInCity: [],
        totalNoOfUsersFromAPI: 0,
      },
    })

    const wrapperComp1 = mount(
      <Provider store={store1}>
        <MuiThemeProvider theme={globalTheme}>
          <CryptoList />
        </MuiThemeProvider>
      </Provider>,
    )

    wrapperComp1
      .find(Button)
      .last()
      .simulate("click")

    wrapperComp1.update()

    // console.log("STORE IS ", store1.getState())
    // console.log("NEW GITHUB COMP IS ", wrapperComp.props().store.getState())
    // console.log(
    //   "MODIFIED BUTTON IS ",
    //   wrapperComp1
    //     .find(Button)
    //     .last()
    //     .props(),
    // )
  })

  //************* */

  it("should dispatch an action on button click", () => {
    renderer.act(() => {
      wrapperComp
        .find(Button)
        .props()
        .onClick()
    })
    console.log("NEW GITHUB COMP IS ", wrapperComp.props().store.getState())
    console.log("USE DISPATCH ", useDispatchSpy)
    expect(useDispatchSpy).toHaveBeenCalledTimes(14)
    // expect(useDispatchSpy).toHaveBeenCalledWith(loadMostPopularUsers())
  })

  it("should render Button disabled props correctly ", () => {
    const button = wrapperComp.find(Button).last()
    button.simulate("click")
    expect(
      wrapperComp
        .find(Button)
        .last()
        .props().disabled,
    ).toEqual(true)
  })

  it("onClick props on Button should be defined", () => {
    const button = wrapperComp.find(Button).last()
    button.simulate("click")
    expect(
      wrapperComp
        .find(Button)
        .last()
        .props().onClick,
    ).toBeDefined()
  })

  // ***************
  // it("should dispatch the correct action on button click - 4", () => {
  //   const wrapperComp2 = mount(
  //     <Provider store={store}>
  //       <MuiThemeProvider theme={globalTheme}>
  //         <CryptoList />
  //         {/* <CryptoList loadAllData={getUsers} /> */}
  //       </MuiThemeProvider>
  //     </Provider>,
  //   )

  //   wrapperComp2.loadAllData = jest.fn()
  //   wrapperComp2.update()

  //   wrapperComp2
  //     .find(Button)
  //     .last()
  //     .simulate("click")
  //   wrapperComp2.update()
  //   // console.log("STORE IS ", store.globalStore.topTenUsersInCity)
  //   expect(wrapperComp2.loadAllData).toHaveBeenCalled()
  // })
})
