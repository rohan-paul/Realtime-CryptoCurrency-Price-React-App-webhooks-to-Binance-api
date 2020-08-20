/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable global-require */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { useSelector } from "react-redux"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import Checkbox from "@material-ui/core/Checkbox"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import TableCellWithTooltip from "./TableCellWithTooltip"
import RowDefinition from "./RowDefinition"
import RowDefinitionBuy from "./RowDefinitionBuy"

const useStyles = makeStyles({
  tableCell: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  imageClass: {
    width: "35px",
    height: "35px",
    color: "green",
  },
})

const ThisTableRow = ({
  thisItem,
  selected,
  onSelected,
  selectedItems,
  isBuySell,
}) => {
  const classes = useStyles()
  const globalStore = useSelector(state => state.globalStore)

  const RowDefinitionToRender = isBuySell ? RowDefinitionBuy : RowDefinition

  return (
    <TableRow
      hover
      onClick={() => onSelected(thisItem)}
      role="checkbox"
      aria-checked={selected}
      tabIndex={-1}
      key={thisItem._id}
      selected={selected}
    >
      <TableCell padding="checkbox" className={classes.tableCell}>
        <Checkbox
          color="primary"
          checked={selected}
          key={`${thisItem._id}checkbox`}
        />
      </TableCell>
      {RowDefinitionToRender.map(row => {
        const value = row.valueFunction
          ? row.valueFunction(thisItem)
          : Array.isArray(thisItem[row.field])
          ? thisItem[row.field].join(", ").toString()
          : thisItem[row.field]

        if (row.useTooltip) {
          return (
            <TableCellWithTooltip
              align={row.align}
              value={value}
              width={row.width}
              key={thisItem._id + row.field}
            />
          )
        }
        return (
          <TableCell
            align={row.align}
            className={classes.tableCell}
            style={{ width: row.width }}
            key={thisItem._id + row.field}
          >
            <Typography variant="h4">{value}</Typography>
          </TableCell>
        )
      })}
    </TableRow>
  )
}

ThisTableRow.propTypes = {
  thisItem: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onSelected: PropTypes.func.isRequired,
  selectedItems: PropTypes.array.isRequired,
}

export default ThisTableRow
