/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable-next-line react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { Typography } from "@material-ui/core"
import GlobalSnackbar from "../../components_libs/GlobalSnackbar"
import LoadingSpinner from "../../components_libs/LoadingSpinner"
import {
  loadCurrencyList,
  handleUserCurrencySelection,
  handleSnackBarStatus,
} from "../../actions/getUserActions"
import Button from "@material-ui/core/Button"
import { useStyles } from "./Styles"
import Select from "react-select"

const CryptoList = () => {
  const globalStore = useSelector(state => state.globalStore)
  const dispatch = useDispatch()
  const classes = useStyles()
  const [isClearable, setisClearable] = useState(true)

  useEffect(() => {
    dispatch(loadCurrencyList())
  }, [dispatch])

  const toggleClearable = () =>
    this.setState(state => ({ isClearable: !state.isClearable }))

  const closeSnackbar = () => dispatch(handleSnackBarStatus(false))

  const handleInputChange = inputValue => {
    console.log(inputValue)
    dispatch(handleUserCurrencySelection(inputValue.value))
  }

  return (
    <div className={classes.container}>
      {/* {console.log(options)} */}
      <div className={classes.tableAndFabContainer}>
        {/* {console.log("PAGE ", page)} */}
        {globalStore.loading ? (
          <div className={classes.spinner}>
            <LoadingSpinner />
          </div>
        ) : (
          <div className={classes.table}>
            {/* {console.log("SNACKBAR ", globalStore.snackbar)} */}
            <div className={classes.inputandButtonContainer}>
              <Select
                onChange={handleInputChange}
                className={classes.selectionBox}
                isClearable={isClearable}
                options={globalStore.currencyList}
                getOptionLabel={option => option.label}
                getOptionValue={option => option.value}
              />
              <Button
                // onClick={loadAllData}
                className={classes.button}
                variant="contained"
                size="large"
                color="primary"
                disabled={globalStore.user_selected_currency === ""}
              >
                <Typography
                  variant="h3"
                  // className={classes.modalButtonLabelEnabled}
                >
                  Proceed
                </Typography>
              </Button>
            </div>
            {/* <div style={{ marginTop: "20px" }}>
              <EachUserListItem
                currentCityShown={currentCityShown}
              ></EachUserListItem>
            </div> */}
          </div>
        )}

        <GlobalSnackbar
          open={
            globalStore.snackbar === true ||
            typeof globalStore.snackbar === "object" ||
            typeof globalStore.snackbar === "string" ||
            globalStore.snackbar instanceof String
          }
          variant="error"
          message={"Error occurred while loading Initial Data"}
          onClose={closeSnackbar}
        />
      </div>
    </div>
  )
}

CryptoList.propTypes = {
  onClose: PropTypes.func,
}

export default CryptoList
