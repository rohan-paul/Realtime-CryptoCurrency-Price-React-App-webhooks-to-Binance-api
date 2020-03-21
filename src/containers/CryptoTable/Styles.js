import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  container: {
    margin: "auto",
    backgroundColor: theme.background.default,
    textAlign: "center",
  },

  tableAndFabContainer: {
    textAlign: "center",
  },

  tableContainer: {
    borderRadius: theme.shape.borderRadius,
  },
  innerTableContainer: {
    height: "calc(100vh - 190px)",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.background.paper,
  },
  table: {
    backgroundColor: theme.background.paper,
    borderRadius: theme.shape.borderRadius,
    paddingBottom: "100px",
  },

  changeTableText: {
    color: theme.common.white,
    cursor: "pointer",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "5px",
    paddingBottom: "4px",
  },
  spinner: {
    height: "calc(100vh - 100px)",
  },
}))

export { useStyles }
