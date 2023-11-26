"use client";
import Box from "@mui/material/Box";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { usePathname } from "next/navigation";
import ThemeRegistry from "../../ThemeRegistry";
import { lightTheme } from "../../theme";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/graphql/apolloClient";


const links = [
  "/about",
  "/faq",
  "/pricing",
  "/terms-and-conditions",
  "/affiliate-program",
  "/privacypolicy",
  "/homeloans/emi-calculator",
  "/create-rental-agreement",
  "/list-your-property-for-sale-rent-lease",
  "/property-rental-management-for-owners-managers",
];

function MainClient({ children }) {
  const pathname = usePathname();
  const isBuilderOrProject =
    pathname.includes("/builder") || pathname.includes("/project");
  const theme = lightTheme;
  return (
    <ThemeRegistry theme={lightTheme} options={{ key: "mui" }}>
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
          <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
        </Box>
      </LocalizationProvider>
    </ThemeRegistry>
  );
}

export default MainClient;
