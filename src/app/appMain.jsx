"use client";

import { ApolloProvider } from "@apollo/client";
import Box from "@mui/material/Box";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { usePathname } from "next/navigation";

import { NotificationsProvider } from "src/app/notifications/context";
import useDarkMode from "src/hooks/useDarkMode";
import ThemeRegistry from "../ThemeRegistry";
import { darkTheme, lightTheme } from "../theme";
import apolloClient from "@/graphql/apolloClient";
import { AppProvider } from "src/appContext";

import "../styles/globals.css";

function Main({ children }) {
  const { isDarkModeActive } = useDarkMode();
  const pathname = usePathname();
  const theme = isDarkModeActive ? darkTheme : lightTheme;
  const isManageRentalsPage =
    pathname === "/property-rental-management-for-owners-managers";
  return (
    <ThemeRegistry theme={theme} options={{ key: "mui" }}>
      <NotificationsProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              backgroundColor: isManageRentalsPage
                ? theme.palette.background.secondary
                : theme.palette.background.default,
              margin: "0 auto",
            }}
          >
            {children}
          </Box>
        </LocalizationProvider>
      </NotificationsProvider>
    </ThemeRegistry>
  );
}

function AppMain({ children }) {
  return (
    <ApolloProvider client={apolloClient}>
      <AppProvider>
        <Main>{children}</Main>
      </AppProvider>
    </ApolloProvider>
  );
}

export default AppMain;
