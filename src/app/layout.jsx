import { Suspense, lazy } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import NextTopLoader from "nextjs-toploader";
import { Manrope } from "next/font/google";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export const metadata = {
  title:
    "ProperHomes: Find Properties | Buy/Sell/Rent Properties in India | Manage Rentals",
  description: `Find homes and properties for sale, rent, or lease, manually reviewed for authenticity and quality. 
  List your property for sale, rent or lease. Say goodbye to spam calls, scams and brokers.`,
  keywords: [
    "Properties for Sale",
    "Properties for Rent",
    "Properties for Lease",
    "Homes for sale",
    "Homes for rent",
    "Homes for lease",
    "Real Estate India",
  ],
  metadataBase: new URL("https://properhomes.in"),
  openGraph: {
    title:
      "ProperHomes: Find Properties | Buy/Sell/Rent Homes and Properties in India | Manage Rentals",
    description: `Find homes and properties for sale, rent, or lease. 
    List your property for sale, rent or lease. No more spam calls, no more scams and no more brokers.`,
    url: "https://properhomes.in",
    siteName: "ProperHomes",
    type: "website",
    images: "/assets/images/Logo.png",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "ProperHomes: Find Properties | Buy/Sell/Rent Homes and Properties in India | Manage Rentals",
    description: `Find homes and properties for sale, rent, or lease, manually reviewed for authenticity and quality. 
    List your property for sale, rent or lease. Say goodbye to spam calls, scams and brokers.`,
    creator: "@ProperHomes",
    images: ["/assets/images/Logo.png"],
  },
};

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
        <meta name="application-name" content="ProperHomes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="ProperHomes: Find Properties | Buy/Sell/Rent Homes and Properties in India | Manage Rentals"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/assets/images/LogoIcon.png" />
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
          href="/assets/images/LogoIcon.png"
        />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
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
