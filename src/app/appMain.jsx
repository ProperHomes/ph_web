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

const links = [
  "/about",
  "/faq",
  "/pricing",
  "/terms-and-conditions",
  "/privacypolicy",
  "/homeloans/emi-calculator",
  "/create-rental-agreement",
  "/list-your-property-for-sale-rent-lease",
  "/property-rental-management-for-owners-managers",
];

function Main({ children }) {
  const { isDarkModeActive } = useDarkMode();
  const pathname = usePathname();
  const isBuilderOrProject =
    pathname.includes("/builder") || pathname.includes("/project");
  const theme = isDarkModeActive ? darkTheme : lightTheme;

  return (
    <ThemeRegistry theme={theme} options={{ key: "mui" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            backgroundColor:
              links.includes(pathname) || isBuilderOrProject
                ? theme.palette.background.secondary
                : theme.palette.background.default,
            margin: "0 auto",
          }}
        >
          {children}
        </Box>
      </LocalizationProvider>
    </ThemeRegistry>
  );
}

function AppMain({ children }) {
  return (
    <ApolloProvider client={apolloClient}>
      <AppProvider>
        <NotificationsProvider>
          <Main>{children}</Main>
        </NotificationsProvider>
      </AppProvider>
    </ApolloProvider>
  );
}

export default AppMain;
