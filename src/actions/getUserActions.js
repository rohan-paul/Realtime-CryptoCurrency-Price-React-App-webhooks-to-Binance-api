/* eslint-disable import/prefer-default-export */
import {
  LOADING,
  LOAD_CURRENCY_LIST,
  ERROR_WHILE_FETCHING_INITIAL_CURRENCY_LIST,
  USER_SELECTED_CURRENCY,
  SNACKBAR_STATUS,
  LOAD_SELECTED_TICKER_DATA,
} from "./types"
import history from "../history"

import axios from "axios"
const pick = require("lodash.pick")

export const handleSnackBarStatus = bool => {
  return {
    type: SNACKBAR_STATUS,
    payload: bool,
  }
}

export const handleUserCurrencySelection = currency => {
  return {
    type: USER_SELECTED_CURRENCY,
    payload: currency,
  }
}

export const loadCurrencyList = () => async dispatch => {
  dispatch({
    type: LOADING,
    payload: true,
  })
  axios
    .get(`https://api.transak.com/api/v1/currencies/list`)
    .then(res => {
      const options = Object.entries(res.data.response.cryptocurrencies).map(
        e => {
          return {
            value: e[0],
            label: e[1].name,
          }
        },
      )
      dispatch({
        type: LOAD_CURRENCY_LIST,
        payload: options,
      })
    })
    .catch(err => {
      dispatch({
        type: ERROR_WHILE_FETCHING_INITIAL_CURRENCY_LIST,
        payload: "Error occurred while loading Initial Currency Data",
      })
    })
}

// A function to return the websocket response as a Promise
const connect = ticker => {
  return new Promise((resolve, reject) => {
    let server = new WebSocket(
      `wss://stream.binance.com:9443/ws/${ticker}usdt@ticker`,
    )
    server.onopen = () => {
      resolve(server)
    }
    server.onerror = err => {
      reject(err)
    }
  })
}

export const getSelectedCurrency = ticker => async dispatch => {
  dispatch({
    type: LOADING,
    payload: true,
  })

  connect(ticker)
    .then(server => {
      server.onmessage = event => {
        // console.log(
        //   "payload ",
        //   pick(JSON.parse(event.data), ["s", "c", "h", "l", "v", "n"]),
        // )
        dispatch({
          type: LOAD_SELECTED_TICKER_DATA,
          payload: {
            tickerData: [
              pick(JSON.parse(event.data), ["s", "c", "h", "l", "v", "n"]),
            ],
            current_websocket_connection: server,
          },
        })
      }
      history.push("/table")
    })
    .catch(err => {
      dispatch({
        type: ERROR_WHILE_FETCHING_INITIAL_CURRENCY_LIST,
        payload: "Error occurred while loading selected ticker Data",
      })
    })
}
