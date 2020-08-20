/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  notFound: {
    paddingTop: '100px',
    textAlign: 'center',
  },
})

export default () => {
  const classes = useStyles()
  return (
    <div className={classes.notFound}>
      <div className="central-body">
        <img src={require('../assets/images/404.svg')} width="300px" />
        <div>
          <Link className="btn-go-home" to="/">
            Return to Home Page
          </Link>
        </div>
      </div>
    </div>
  )
}
