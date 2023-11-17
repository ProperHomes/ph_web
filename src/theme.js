import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { DamionFont, ralewayFont } from "./utils/constants";

const defaultThemeOptions = {
  typography: {
    fontFamily: {
      Damion: DamionFont.style.fontFamily,
      Raleway: ralewayFont.style.fontFamily,
      // Manrope: manRopeFont.style.fontFamily, // manrope is default, check layout.js in app
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiInput: {
      styleOverrides: {
        input: {
          backgroundColor: "transparent",
        },
        root: {
          "&::before": {
            borderColor: "#3f4044",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          borderRadius: "8px",
        },
        root: {
          "& fieldset": {
            borderRadius: "6px",
          },
          "&::before": {
            borderRadius: "6px",
          },
          "&.Mui-error": {
            borderRadius: "8px",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: "none",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: ({ theme }) => ({
          fontSize: "2rem !important",
          ...(theme.palette.mode === "dark" && {
            color: "#f9f9f9",
          }),
        }),
        h2: ({ theme }) => ({
          fontSize: "1.8rem !important",
          ...(theme.palette.mode === "dark" && {
            color: "#f9f9f9",
          }),
        }),
        h4: ({ theme }) => ({
          fontSize: "1.5rem !important",
          ...(theme.palette.mode === "dark" && {
            color: "#f9f9f9",
          }),
        }),
        body1: ({ theme }) => ({
          ...(theme.palette.mode === "dark" && {
            color: "#f9f9f9",
          }),
        }),
      },
    },
  },
};

const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#0e0e0e !important",
        secondary: "#0e0e0e",
      },
      primary: {
        main: "#f9fbfc",
      },
      secondary: {
        main: "#b4b4b4",
      },
      text: {
        main: "#f9fbfc",
        secondary: "rgba(255, 255, 255, 0.8)",
      },
      info: {
        main: "#0080ff",
      },
      orange: {
        main: "#ff5657",
        contrastText: "#fff",
      },
    },
    ...defaultThemeOptions,
  })
);

const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#ffffff",
        secondary: "#3c27b012",
      },
      primary: {
        main: "#222",
      },
      secondary: {
        main: "#2222220a",
        mainHover: "#222222",
      },
      text: {
        secondary: "#374151",
      },
      info: {
        main: "#0080ff",
      },
      orange: {
        main: "#ff5657",
        contrastText: "#fff",
      },
    },
    ...defaultThemeOptions,
  })
);

export { darkTheme, lightTheme };
