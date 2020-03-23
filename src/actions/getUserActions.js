/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState, useRef } from "react"
import {
  LOADING,
  LOAD_CURRENCY_LIST,
  ERROR_WHILE_FETCHING_INITIAL_CURRENCY_LIST,
  USER_SELECTED_CURRENCY,
  SNACKBAR_STATUS,
  LOAD_SELECTED_TICKER_DATA,
  LOAD_ORDER_BOOK_DATA,
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
          const image = require(`../assets/images/${e[0]}.png`)
          return {
            value: e[0],
            label: (
              <>
                <img
                  src={image}
                  alt=""
                  height="20px"
                  width="20px"
                  style={{ marginRight: "15px" }}
                />
                {e[1].name}
              </>
            ),
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

const convertArrToObjBids = arr => {
  return arr
    .filter(item => parseInt(item[1]) !== 0)
    .sort((a, b) => a[0] > b[0])
    .slice(0, 8)
    .map(i => {
      return {
        p: i[0],
        q: i[1],
      }
    })
}

const convertArrToObjAsk = arr => {
  return arr
    .filter(item => parseInt(item[1]) !== 0)
    .sort((a, b) => a[0] < b[0])
    .slice(0, 8)
    .map(i => {
      return {
        p: i[0],
        q: i[1],
      }
    })
}

export const getOrderBook = ticker => async dispatch => {
  const url = `wss://stream.binance.com:9443/ws/${ticker}btc@depth`

  let orderBook = new WebSocket(url)

  orderBook.onmessage = event => {
    const order = JSON.parse(event.data)

    dispatch({
      type: LOAD_ORDER_BOOK_DATA,
      payload: {
        buyOrder_websocket_connection: orderBook,
        buy: convertArrToObjBids(order.b),
        sell: convertArrToObjAsk(order.a),
      },
    })
  }
}
