/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import PropTypes from "prop-types"
import TableContainer from "@material-ui/core/TableContainer"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import { orderBy } from "lodash"
import LoadingSpinner from "../../components_libs/LoadingSpinner"
import TableRowHead from "./TableRowHead"
import ThisTableRow from "./ThisTableRow"
import TableToolbar from "./TableToolbar"
import { useStyles } from "./Styles"
import GlobalSnackbar from "../../components_libs/GlobalSnackbar"
import { handleSnackBarStatus } from "../../actions/getUserActions"

const CryptoTable = () => {
  const globalStore = useSelector(state => state.globalStore)
  const dispatch = useDispatch()
  const classes = useStyles()

  const [order, setOrder] = React.useState({
    field: "name",
    direction: "asc",
  })
  const [selected, setSelected] = useState([])
  const webSocket = useRef(null)
  const buyOrderWebSocket = useRef(null)

  const closeSnackbar = () => dispatch(handleSnackBarStatus(false))

  const onOrderChange = property =>
    setOrder({
      field: property,
      direction:
        order.field === property && order.direction === "asc" ? "desc" : "asc",
    })

  const isSelected = thisItem => selected.indexOf(thisItem) !== -1

  const updateSelected = thisItem => {
    const index = selected.indexOf(thisItem)
    if (index !== -1) {
      selected.splice(index, 1)
    } else {
      selected.push(thisItem)
    }
    setSelected([...selected])
  }

  let tableToRender = globalStore.selected_ticker_data

  // this useEffect is only to close the websocket connection when component un-mounts
  useEffect(() => {
    // first store the websocket value in ref.current when component mounts
    webSocket.current = globalStore.current_websocket_connection
    buyOrderWebSocket.current = globalStore.buyOrder_websocket_connection
    return () => {
      if (webSocket.current) {
        webSocket.current.close()
      }
      if (buyOrderWebSocket.current) {
        buyOrderWebSocket.current.close()
      }
    }
  }, [
    globalStore.buyOrder_websocket_connection,
    globalStore.current_websocket_connection,
  ])

  return (
    <div className={classes.container}>
      <div className={classes.tableAndFabContainer}>
        {globalStore.loading ? (
          <div className={classes.spinner}>
            <LoadingSpinner />
          </div>
        ) : (
          <div>
            <TableToolbar selected={selected} />
            <TableContainer className={classes.tableContainer}>
              <div className={classes.innerTableContainer}>
                <Table stickyHeader className={classes.table}>
                  <TableRowHead
                    selectedCurrencies={tableToRender}
                    selected={selected}
                    order={order}
                    onOrderChange={onOrderChange}
                    setSelected={setSelected}
                  />

                  <TableBody>
                    {orderBy(
                      tableToRender,
                      [order.field],
                      [order.direction],
                    ).map(thisItem => (
                      <ThisTableRow
                        key={thisItem.pair}
                        thisItem={thisItem}
                        selectedItems={selected.filter(
                          i => i._id === thisItem._id,
                        )}
                        selected={isSelected(thisItem)}
                        onSelected={updateSelected}
                      ></ThisTableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TableContainer>
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className={classes.tableAndFabContainer}>
          <div>BIDS</div>
          {globalStore.loading ? (
            <div className={classes.spinner}>
              <LoadingSpinner />
            </div>
          ) : (
            <div>
              <TableToolbar selected={selected} />
              <TableContainer className={classes.tableContainer}>
                <div className={classes.innerTableContainer}>
                  <Table stickyHeader className={classes.table}>
                    <TableRowHead
                      isBuySell
                      selectedCurrencies={globalStore.order_book_buy_data}
                      selected={selected}
                      order={order}
                      onOrderChange={onOrderChange}
                      setSelected={setSelected}
                    />

                    <TableBody>
                      {orderBy(
                        globalStore.order_book_buy_data,
                        [order.field],
                        [order.direction],
                      ).map(thisItem => (
                        <ThisTableRow
                          isBuySell
                          key={thisItem.pair}
                          thisItem={thisItem}
                          selectedItems={selected.filter(
                            i => i._id === thisItem._id,
                          )}
                          selected={isSelected(thisItem)}
                          onSelected={updateSelected}
                        ></ThisTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TableContainer>
            </div>
          )}
        </div>

        <div className={classes.tableAndFabContainer}>
          <div>ASKS</div>
          {globalStore.loading ? (
            <div className={classes.spinner}>
              <LoadingSpinner />
            </div>
          ) : (
            <div>
              <TableToolbar selected={selected} />
              <TableContainer className={classes.tableContainer}>
                <div className={classes.innerTableContainer}>
                  <Table stickyHeader className={classes.table}>
                    <TableRowHead
                      isBuySell
                      selectedCurrencies={globalStore.order_book_sell_data}
                      selected={selected}
                      order={order}
                      onOrderChange={onOrderChange}
                      setSelected={setSelected}
                    />

                    <TableBody>
                      {orderBy(
                        globalStore.order_book_sell_data,
                        [order.field],
                        [order.direction],
                      ).map(thisItem => (
                        <ThisTableRow
                          isBuySell
                          key={thisItem.pair}
                          thisItem={thisItem}
                          selectedItems={selected.filter(
                            i => i._id === thisItem._id,
                          )}
                          selected={isSelected(thisItem)}
                          onSelected={updateSelected}
                        ></ThisTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TableContainer>
            </div>
          )}
        </div>
      </div>
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

CryptoTable.propTypes = {
  onClose: PropTypes.func,
}

export default CryptoTable
