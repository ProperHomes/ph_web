import { Suspense, lazy } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import NextTopLoader from "nextjs-toploader";
import { Manrope } from "next/font/google";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import AppMain from "./appMain";

import "../styles/globals.css";

dayjs.extend(relativeTime);

export const manRope = Manrope({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const Navbar = lazy(() => import("@/components/Navbar"));
const BottomNavbar = lazy(() => import("@/components/BottomNavbar"));
const Footer = lazy(() => import("@/components/Footer"));

function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <meta name="theme-color" content={theme.palette.primary.main} /> */}
        <meta
          name="description"
          content={`ProperHomes - Discover an extensive range of homes and properties for sale, rent, or lease, all carefully reviewed for authenticity and quality. Say goodbye to spam calls and hello to a stress-free search for your dream space!`}
        />
        <meta name="application-name" content="ProperHomes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="ProperHomes: Find Your Dream Space!"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/assets/images/Logo.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/assets/images/PWA/ios/152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/images/PWA/ios/180.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/assets/images/PWA/ios/167.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/images/PWA/ios/32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/images/PWA/ios/16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/assets/images/Logo.png" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://properhomes.in" />
        <meta
          name="twitter:title"
          content="ProperHomes: Find Your Dream Space!"
        />
        <meta
          name="twitter:description"
          content={`ProperHomes - Discover an extensive range of homes and properties for sale, rent, or lease, all carefully reviewed for authenticity and quality. Say goodbye to spam calls and hello to a stress-free search for your dream space!`}
        />
        <meta name="twitter:image" content="/assets/images/Logo.png" />
        <meta name="twitter:creator" content="@ProperHomes" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="ProperHomes: Find Your Dream Space!"
        />
        <meta
          property="og:description"
          content={`ProperHomes - Discover an extensive range of homes and properties for sale, rent, or lease, all carefully reviewed for authenticity and quality. Say goodbye to spam calls and hello to a stress-free search for your dream space!`}
        />
        <meta property="og:site_name" content="ProperHomes" />
        <meta property="og:url" content="https://properhomes.in" />
        <meta property="og:image" content="/assets/images/Logo.png" />
      </head>
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
            <Suspense fallback={<></>}>
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
            </Suspense>
          </Box>
        </AppMain>
      </body>
    </html>
  );
}

export default RootLayout;
