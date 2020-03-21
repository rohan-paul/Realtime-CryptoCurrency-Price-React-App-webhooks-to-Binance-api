import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

const useStyles = makeStyles(theme => ({
  tableCell: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  tooltipClass: {
    fontsize: '20px !important',
    marginLeft: '10px !important',
    fontFamily: 'Montserrat !important',
    backgroundColor: `${theme.palette.secondary.main} !important`,
    borderRadius: `${theme.shape.borderRadius} !important`,
    pointerEvents: 'auto !important',
    '&:hover': {
      visibility: 'visible !important',
      opacity: 1,
    },
    '&:after': {
      borderTopColor: `${theme.palette.secondary.main} !important`,
      borderTopWidth: '6px !important',
      left: '50% !important',
    },
  },
  tooltipContainer: props => ({
    width: `${props.value && props.value.length * 4}px`,
  }),
}))

const TableCellWithTooltip = ({ value, width }) => {
  const classes = useStyles({ value })

  return (
    <>
      <TableCell
        scope="row"
        className={classes.tableCell}
        style={{
          width,
        }}
      >
        <div className={classes.tooltipContainer}>
          <ReactTooltip
            className={classes.tooltipClass}
            place="top"
            type="info"
            effect="solid"
            delayShow={300}
            border
          />

          <div data-tip={value}>{value}</div>
        </div>
      </TableCell>
    </>
  )
}

TableCellWithTooltip.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  width: PropTypes.string.isRequired,
}

export default TableCellWithTooltip
