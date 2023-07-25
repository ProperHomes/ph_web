import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { CacheProvider } from "@emotion/react";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import createEmotionCache from "../utils/createEmotionCache";
import { useApollo } from "@/utils/hooks/useApollo";
import { lightTheme, darkTheme } from "../theme";
import { AppProvider } from "src/appContext";
import { NotificationsProvider } from "@/containers/Notifications/context";

import "../styles/globals.css";
import { PropertyProvider } from "@/containers/Properties/context";
import useDarkMode from "@/utils/hooks/useDarkMode";

dayjs.extend(relativeTime);

const clientSideEmotionCache = createEmotionCache();

function App({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
  const apolloClient = useApollo();
  return (
    <CacheProvider value={emotionCache}>
      <CssBaseline />
      <Head>
        <title>ProperHomes: Find Your Dream Space!</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>

      <ApolloProvider client={apolloClient}>
        <AppProvider>
          <Main>
            <Component {...pageProps} />
          </Main>
        </AppProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}

function Main({ children }) {
  const { isDarkModeActive } = useDarkMode();
  const theme = isDarkModeActive ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <NotificationsProvider>
        <PropertyProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.default,
                margin: "0 auto",
              }}
            >
              {children}
            </Box>
          </LocalizationProvider>
        </PropertyProvider>
      </NotificationsProvider>
    </ThemeProvider>
  );
}

export default App;
