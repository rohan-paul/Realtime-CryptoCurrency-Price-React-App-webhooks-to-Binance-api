import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '7rem',
    height: '100%',
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: '50%',
  },
})

export const LoadingSpinner = ({ size }) => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <div className={classes.progress}>
        <CircularProgress mode="indeterminate" size={size} color="primary" />
      </div>
    </div>
  )
}

LoadingSpinner.defaultProps = {
  size: 80,
}

LoadingSpinner.propTypes = {
  size: PropTypes.number,
}

export default LoadingSpinner
