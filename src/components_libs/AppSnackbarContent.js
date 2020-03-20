import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import amber from '@material-ui/core/colors/amber'
import SnackbarContent from '@material-ui/core/SnackbarContent'

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(2),
  },
  success: {
    backgroundColor: theme.palette.secondary.main,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}))

const AppSnackbarContent = props => {
  const classes = useStyles()
  const { className, message, onClose, variant, ...other } = props

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          {message}
        </span>
      }
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    />
  )
}

AppSnackbarContent.defaultProps = {
  className: undefined,
  message: '',
  onClose: () => {},
}

AppSnackbarContent.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
}

export default AppSnackbarContent
