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
  react_autosuggest__container: {
    position: "relative",
    height: "30px",
    marginRight: "10px",
  },
  react_autosuggest__input: {
    width: "240px",
    height: "30px",
    padding: "10px 20px",
    fontFamily: "Montserrat",
    fontWeight: "300",
    fontSize: "16px",
    border: "1px solid #aaa",
    borderRadius: "4px",
  },
  react_autosuggest__input__focused: {
    outline: "none",
  },
  react_autosuggest__input__open: {
    borderBottomLeftRadius: "0",
    borderBottomRightRadius: "0",
  },
  react_autosuggest__suggestions_container: {
    display: "none",
  },
  react_autosuggest__suggestions_container__open: {
    display: "block",
    position: "absolute",
    left: 0,
    top: "51px",
    width: "280px",
    border: "1px solid #aaa",
    backgroundColor: "#fff",
    fontFamily: "Montserrat",
    fontWeight: "300",
    fontSize: "16px",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
    zIndex: "2",
  },
  react_autosuggest__suggestions_list: {
    margin: "0",
    padding: "0",
    listStyleType: "none",
  },
  react_autosuggest__suggestion: {
    cursor: "pointer",
    padding: "10px 20px",
  },
  react_autosuggest__suggestion__highlighted: {
    backgroundColor: "#ddd",
  },
}))

export { useStyles }
