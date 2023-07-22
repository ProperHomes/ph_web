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
  //   components: {
  //     MuiMobileStepper: {
  //       styleOverrides: {
  //         progress: {
  //           width: "100%",
  //           backgroundColor: "#3F4044",
  //           "& span": {
  //             backgroundColor: "#e0e6e9",
  //           },
  //         },
  //       },
  //     },
  //     MuiTooltip: {
  //       styleOverrides: {
  //         tooltip: {
  //           backgroundColor: "transparent",
  //         },
  //       },
  //     },
  //   },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": "Raleway",
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
    },
    ...defaultThemeOptions,
  })
);

export { darkTheme, lightTheme };
