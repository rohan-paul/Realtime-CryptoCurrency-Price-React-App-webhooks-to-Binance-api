import React from 'react'
import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'

function MockTheme({ children }: any) {
  const theme = createMuiTheme({})
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default MockTheme
