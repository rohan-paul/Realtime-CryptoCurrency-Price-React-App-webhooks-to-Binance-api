/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable-next-line react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { Typography } from "@material-ui/core"
import GlobalSnackbar from "../../components_libs/GlobalSnackbar"
import LoadingSpinner from "../../components_libs/LoadingSpinner"
import {
  loadCurrencyList,
  handleUserCurrencySelection,
  handleSnackBarStatus,
  getSelectedCurrency,
} from "../../actions/getUserActions"
import Button from "@material-ui/core/Button"
import { useStyles } from "./Styles"
import Select from "react-select"

const CryptoList = () => {
  const globalStore = useSelector(state => state.globalStore)
  const dispatch = useDispatch()
  const classes = useStyles()
  const webSocket = useRef(null)

  useEffect(() => {
    dispatch(loadCurrencyList())
  }, [dispatch])

  const closeSnackbar = () => dispatch(handleSnackBarStatus(false))

  const handleInputChange = inputValue => {
    if (inputValue) {
      dispatch(handleUserCurrencySelection(inputValue.value))
    }
  }

  const ticker = globalStore.user_selected_currency.toLowerCase()

  return (
    <div className={classes.container}>
      {globalStore.loading ? (
        <div className={classes.spinner}>
          <LoadingSpinner />
        </div>
      ) : (
        <div className={classes.table}>
          <div className={classes.inputandButtonContainer}>
            <Select
              onChange={handleInputChange}
              className={classes.selectionBox}
              isClearable
              options={globalStore.currencyList}
              getOptionLabel={option => option.label}
              getOptionValue={option => option["value"]}
            />
            <Button
              onClick={() => {
                dispatch(getSelectedCurrency(ticker))
                webSocket.current = globalStore.current_websocket_connection
              }}
              className={classes.button}
              variant="contained"
              size="large"
              color="primary"
              disabled={globalStore.user_selected_currency === ""}
            >
              <Typography variant="h3">Proceed</Typography>
            </Button>
          </div>
        </div>
      )}
      <GlobalSnackbar
        open={
          globalStore.snackbar ||
          typeof globalStore.snackbar === "object" ||
          typeof globalStore.snackbar === "string" ||
          globalStore.snackbar instanceof String
        }
        variant="error"
        message={globalStore.error_while_fetching_initial_currency_list}
        onClose={closeSnackbar}
      />
    </div>
  )
}

CryptoList.propTypes = {
  onClose: PropTypes.func,
}

export default CryptoList
