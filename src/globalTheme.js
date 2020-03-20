import { createMuiTheme } from "@material-ui/core/styles"

const globalTheme = createMuiTheme({
  common: {
    black: "#000",
    white: "#fff",
  },
  shape: {
    borderRadius: "8px",
  },
  background: {
    paper: "#fff",
    headers: "#CECECE",
    default: "rgba(229, 229, 229, 1)",
  },
  palette: {
    primary: {
      light: "#2882F8",
      main: "#2882F8",
      dark: "#212121",
    },
    secondary: {
      main: "#2882F8",
      light: "#fdffe0",
    },
    error: {
      main: "#ff0000",
      dark: "#212121",
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: "Montserrat",
    h1: {
      fontSize: 33,
      fontFamily: "Montserrat",
      fontWeight: 300,
      color: "#2882F8",
      letterSpacing: "0.0075em",
      verticalAlign: "middle",
      alignItems: "center",
      textAlign: "center",
    },
    subtitle1: {
      fontSize: 14,
      fontFamily: "Montserrat",
      color: "black",
      letterSpacing: "0.0075em",
      fontWeight: "bold",
      verticalAlign: "middle",
      alignItems: "center",
    },
    subtitle2: {
      fontSize: 16,
      fontFamily: "Montserrat",
      color: "black",
      letterSpacing: "0.0075em",
      fontWeight: "bold",
      verticalAlign: "middle",
      alignItems: "center",
    },
    h4: {
      fontSize: 14,
      fontWeight: 300,
      fontFamily: "Montserrat",
      color: "black",
      letterSpacing: "0.0075em",
      verticalAlign: "middle",
      alignItems: "center",
    },
    body1: {
      fontSize: 14,
      fontWeight: 400,
      fontFamily: "Montserrat",
      color: "black",
      letterSpacing: "0.0075em",
      verticalAlign: "middle",
      alignItems: "center",
    },
    h3: {
      fontSize: 14,
      fontWeight: 600,
      fontFamily: "Montserrat",
      color: "black",
      letterSpacing: "0.0075em",
      verticalAlign: "middle",
      alignItems: "center",
    },
    overline: {
      fontSize: 20,
      fontWeight: 800,
      fontFamily: "Montserrat",
      color: "#2882F8",
      letterSpacing: "0.0075em",
      verticalAlign: "middle",
      alignItems: "center",
    },
  },
})

globalTheme.overrides = {
  MuiTextField: {
    root: {
      background: globalTheme.background.paper,
      marginTop: globalTheme.spacing(2),
      marginBottom: globalTheme.spacing(3),
      borderRadius: globalTheme.shape.borderRadius,
    },
  },
  MuiInputBase: {
    root: {
      padding: globalTheme.spacing(1),
    },
  },
  MuiButton: {
    root: {
      fontSize: 14,
      fontWeight: 600,
      fontFamily: "Montserrat",
      letterSpacing: "0.0075em",
    },
  },
  MuiListItemText: {
    root: {
      fontSize: 20,
      fontWeight: 800,
      fontFamily: "Montserrat",
      color: "#2882F8",
      letterSpacing: "0.0075em",
      verticalAlign: "middle",
      alignItems: "center",
    },
  },
}

export default globalTheme
