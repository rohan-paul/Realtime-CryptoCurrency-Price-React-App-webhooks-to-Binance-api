import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.background.headers,
    textAlign: "center",
    height: "80px",
  },
  internalContainer: {
    position: "relative",
    height: "100%",
    margin: "auto",
    maxWidth: "1400px",
    display: "flex",
    flexDirection: "row",
    textAlign: "center !important",
    justifyContent: "center",
  },
  iconContainer: {
    padding: theme.spacing(2),
    "& img": {
      position: "absolute",
      top: theme.spacing(2),
      left: theme.spacing(0),
      height: "50px",
      width: "65px",
    },
  },
  textContainer: {
    margin: 0,
    height: "100% !important",
    textAlign: "center !important",
    display: "flex",
    alignItems: "center",
  },
}))

const PageHeader = ({ headerText }) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.internalContainer}>
        <div className={classes.textContainer}>
          <Typography variant="h1"> {headerText} </Typography>
        </div>
      </div>
    </div>
  )
}

PageHeader.propTypes = {
  headerText: PropTypes.string.isRequired,
}

export default PageHeader
