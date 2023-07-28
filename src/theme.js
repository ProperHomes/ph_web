import { Raleway, Montserrat, Manrope, Roboto } from "next/font/google";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const ralewayFont = Raleway({
  weight: ["500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const monsterratFont = Montserrat({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const manRopeFont = Manrope({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const robotoFont = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const defaultThemeOptions = {
  typography: {
    fontFamily: {
      Raleway: ralewayFont.style.fontFamily,
      Monsterrat: monsterratFont.style.fontFamily,
      Manrope: manRopeFont.style.fontFamily,
      Roboto: robotoFont.style.fontFamily,
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
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": "Manrope",
      },
    },
  },
};

const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#0e0e0e",
      },
      primary: {
        main: "#f9fbfc",
      },
      secondary: {
        main: "#b4b4b4",
      },
      text: {
        secondary: "rgba(255, 255, 255, 0.8)",
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
      },
      primary: {
        main: "#222",
      },
      secondary: {
        main: "#2222220a",
        mainHover: "#222222",
      },
    },
    ...defaultThemeOptions,
  })
);

export { darkTheme, lightTheme };
