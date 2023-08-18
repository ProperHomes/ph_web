import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import NextTopLoader from "nextjs-toploader";
import { Manrope } from "next/font/google";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import AppMain from "./appMain";
import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import Footer from "@/components/Footer";

import "../styles/globals.css";

dayjs.extend(relativeTime);

export const manRope = Manrope({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manRope.className}>
        <NextTopLoader showSpinner={false} />
        <AppMain>
          <Box
            sx={{
              width: "100%",
              minHeight: "100vh",
              position: "relative",
              marginBottom: { xs: "4em", md: 0 },
            }}
          >
            <Navbar />
            <Container
              maxWidth="xl"
              sx={{
                width: "100%",
                height: "100%",
                paddingTop: "1em",
                paddingBottom: "2em",
              }}
            >
              {children}
            </Container>
            <Footer />
            <BottomNavbar />
          </Box>
        </AppMain>
      </body>
    </html>
  );
}

export default RootLayout;
