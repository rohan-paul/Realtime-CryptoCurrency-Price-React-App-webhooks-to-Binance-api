import React from "react"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  container: {
    margin: "auto",
    backgroundColor: theme.background.default,
  },
  table: {
    backgroundColor: theme.background.paper,
    borderRadius: theme.shape.borderRadius,
    paddingBottom: "100px",
    alignItems: "center ",
    justifyContent: "center ",
    verticalAlign: "middle ",
    textAlign: "center",
  },
  inputandButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center ",
    justifyContent: "center ",
  },
  selectionBox: {
    marginTop: "20px",
    marginRight: "10px",
    width: "55%",
    height: "50px",
  },
  button: {
    marginTop: "20px",
    width: "25%",
    height: "50px",
  },

  spinner: {
    height: "calc(100vh - 100px)",
  },
}))

export { useStyles }
