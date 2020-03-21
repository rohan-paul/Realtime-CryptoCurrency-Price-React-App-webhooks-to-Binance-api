/* eslint-disable import/prefer-default-export */
import {
  LOADING,
  LOAD_CURRENCY_LIST,
  ERROR_WHILE_FETCHING_INITIAL_CURRENCY_LIST,
  USER_SELECTED_CURRENCY,
  SNACKBAR_STATUS,
  SELECTED_TICKER_DATA,
} from "./types"
import history from "../history"

import axios from "axios"
const pick = require("lodash.pick")
const map = require("lodash.map")
const partialRight = require("lodash.partialright")

const headers = {
  "Content-Type": "application/json",
}

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

export const getSelectedCurrency = () => async dispatch => {
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/ethusdt@ticker`)
  ws.onopen = () => {
    console.log("Connected to WebSocket")
  }
  ws.onmessage = event => {
    console.log(
      "Recd from WebSocket in Action ",
      pick(JSON.parse(event.data), ["s", "c", "h", "l", "v", "n"]),
    )

    dispatch({
      type: SELECTED_TICKER_DATA,
      payload: [pick(JSON.parse(event.data), ["s", "c", "h", "l", "v", "n"])],
    })
  }
  history.push("/table")
}

// Util function to merge to topUsers array data with userProfiles array, as they are coming from two different api calls
const mergeArraysConditionally = (topUsers, userProfiles) => {
  let merged = []

  // First return the first array with only elements whose id matches with an element's id from the second array
  topUsers.every(i =>
    userProfiles.map(j => j.id).includes(i.id) ? merged.push(i) : null,
  )

  // Now that I have got two separate arrays of matched and the original array, simply merge the matched array (on the basis of ID) with the original array containing the data.
  merged = merged.map(i =>
    Object.assign(
      i,
      userProfiles.find(j => j.id === i.id),
    ),
  )
  return merged
}
