"use client";

import { ApolloProvider } from "@apollo/client";
import Box from "@mui/material/Box";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import NProgress from "nprogress";
import { useApollo } from "@/utils/hooks/useApollo";

import { AppProvider } from "src/appContext";
import { NotificationsProvider } from "src/app/notifications/context";
import { PropertyProvider } from "src/app/property/context";
import AppLayout from "src/components/Layouts/AppLayout";
import useDarkMode from "@/utils/hooks/useDarkMode";
import ThemeRegistry from "../ThemeRegistry";
import { darkTheme, lightTheme } from "../theme";

import "../styles/globals.css";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

function Main({ children }) {
  const apolloClient = useApollo();
  return (
    <ApolloProvider client={apolloClient}>
      <AppProvider>
        <App>{children}</App>
      </AppProvider>
    </ApolloProvider>
  );
}

function App({ children }) {
  const { isDarkModeActive } = useDarkMode();
  const theme = isDarkModeActive ? darkTheme : lightTheme;
  return (
    <ThemeRegistry theme={theme} options={{ key: "mui" }}>
      <NotificationsProvider>
        <PropertyProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.default,
                margin: "0 auto",
              }}
            >
              <AppLayout>{children}</AppLayout>
            </Box>
          </LocalizationProvider>
        </PropertyProvider>
      </NotificationsProvider>
    </ThemeRegistry>
  );
}

export default Main;
