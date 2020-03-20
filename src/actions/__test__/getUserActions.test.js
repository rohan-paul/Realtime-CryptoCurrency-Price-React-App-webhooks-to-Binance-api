import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as getUserActions from '../getUserActions'
const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const store = mockStore({})

describe('User Signup Actions Tests', () => {
  it('should set City correctly when executing handleCityToSearchChangePayload() ', () => {
    const handleCityToSearchChangePayload = getUserActions.handleCityToSearchChange(
      'Bengaluru',
    )
    expect(handleCityToSearchChangePayload).toEqual({
      type: 'CITY_TO_SEARCH',
      payload: 'Bengaluru',
    })
  })

  it('should handleSnackBarStatus correctly ', () => {
    const handleSnackBarStatusPayload = getUserActions.handleSnackBarStatus(
      true,
    )
    expect(handleSnackBarStatusPayload).toEqual({
      type: 'SNACKBAR_STATUS',
      payload: true,
    })
  })
})
