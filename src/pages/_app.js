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
import { useApollo } from "../apolloClient";
import { lightTheme } from "../theme";
import { AppProvider } from "src/appContext";
import { NotificationsProvider } from "@/containers/Notifications/context";

import "../styles/globals.css";

dayjs.extend(relativeTime);

const clientSideEmotionCache = createEmotionCache();

function App({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
  const apolloClient = useApollo();
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
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
            <NotificationsProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box
                  sx={{
                    backgroundColor: "#fff",
                    margin: "0 auto",
                  }}
                >
                  <Component {...pageProps} />
                </Box>
              </LocalizationProvider>
            </NotificationsProvider>
          </AppProvider>
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
