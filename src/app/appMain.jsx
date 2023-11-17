"use client";
import { ApolloProvider } from "@apollo/client";
import Box from "@mui/material/Box";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { usePathname } from "next/navigation";

import { NotificationsProvider } from "src/app/notifications/context";
import ThemeRegistry from "../ThemeRegistry";
import { lightTheme } from "../theme";
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

function AppMain({ children }) {
  const pathname = usePathname();
  const isBuilderOrProject =
    pathname.includes("/builder") || pathname.includes("/project");
  const theme = lightTheme;
  return (
    <ThemeRegistry theme={lightTheme} options={{ key: "mui" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ApolloProvider client={apolloClient}>
          <AppProvider>
            <NotificationsProvider>
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
            </NotificationsProvider>
          </AppProvider>
        </ApolloProvider>
      </LocalizationProvider>
    </ThemeRegistry>
  );
}

export default AppMain;
