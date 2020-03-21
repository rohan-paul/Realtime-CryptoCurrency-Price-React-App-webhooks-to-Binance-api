/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
/* eslint-disable no-underscore-dangle */
import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import PropTypes from "prop-types"
import TableContainer from "@material-ui/core/TableContainer"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import { orderBy } from "lodash"
import { Typography } from "@material-ui/core"
import LoadingSpinner from "../../components_libs/LoadingSpinner"
import TableRowHead from "./TableRowHead"
import TableRow from "./ThisTableRow"
import TableToolbar from "./TableToolbar"
import { useStyles } from "./Styles"

const tableToRender = [
  {
    pair: "ETHBTC",
    lastPrice: 0.0221212,
    _24hHigh: 0.0234568,
    _24hLow: 0.231012154,
    _24hVolume: 9022.83,
    totalTrades: 176944,
  },
  {
    pair: "FIATHBTC",
    lastPrice: 0.0221212,
    _24hHigh: 0.0234568,
    _24hLow: 0.231012154,
    _24hVolume: 9022.83,
    totalTrades: 176944,
  },
]

const CryptoTable = () => {
  const globalStore = useSelector(state => state.globalStore)
  const dispatch = useDispatch()
  const classes = useStyles()

  const [order, setOrder] = React.useState({
    field: "name",
    direction: "asc",
  })
  const [selected, setSelected] = useState([])
  const [initialLoadingErrSnackbar, setInitialLoadingErrSnackbar] = useState(
    false,
  )

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

  return (
    <div className={classes.container}>
      {/* {console.log('ALL SELECTED ', JSON.stringify(selected))}
      {console.log('ROUTE NAME ', window.location.pathname)} */}

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
                      <TableRow
                        thisItem={thisItem}
                        selectedItems={selected.filter(
                          i => i._id === thisItem._id,
                        )}
                        selected={isSelected(thisItem)}
                        onSelected={updateSelected}
                        key={thisItem._id || thisItem.name}
                      >
                        {/* {console.log('CURRENT VALUE ', thisItem)} */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  )
}

CryptoTable.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default CryptoTable
