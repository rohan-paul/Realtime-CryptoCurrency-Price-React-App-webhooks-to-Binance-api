import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import PropTypes from 'prop-types'
import AppSnackbarContent from './AppSnackbarContent'

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(4),
  },
}))

const GlobalSnackbar = ({ open, onClose, message, variant }) => {
  const classes = useStyles()

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={8000}
      onClose={onClose}
    >
      <AppSnackbarContent
        onClose={onClose}
        variant={variant}
        className={classes.margin}
        message={message}
      />
    </Snackbar>
  )
}

GlobalSnackbar.defaultProps = {
  open: false,
  onClose: () => {},
  message: 'Unknown error',
  variant: 'warning',
}

GlobalSnackbar.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  message: PropTypes.string,
  variant: PropTypes.string,
}

export default GlobalSnackbar
