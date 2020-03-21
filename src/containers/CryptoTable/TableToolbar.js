/* eslint-disable no-underscore-dangle */
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { CSVLink } from "react-csv"
import IconButton from "@material-ui/core/IconButton"
import moment from "moment"
import ExportTableIcon from "../../components_libs/ExportTableIcon"

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.background.default,
    position: "relative",
  },
  actionContainer: {
    textAlign: "right",
    position: "absolute",
    right: "0px",
  },
}))

const TableToolbar = ({ selected }) => {
  const classes = useStyles()
  const active = selected.length > 0
  const filename = `cryptoCurrencies_${moment().format("L/h:mm")}.csv`

  const buildMenu = () => {
    return (
      <div className={classes.actionContainer}>
        <CSVLink data={selected} filename={filename}>
          <IconButton color="primary">
            <ExportTableIcon />
          </IconButton>
        </CSVLink>
      </div>
    )
  }

  return (
    <Toolbar className={classes.container}>
      <div>
        {active ? (
          <Typography variant="subtitle1">
            {selected.length} selected
          </Typography>
        ) : null}
      </div>
      {active ? buildMenu() : null}
    </Toolbar>
  )
}

TableToolbar.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default TableToolbar
