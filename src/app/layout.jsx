import dynamic from "next/dynamic";
import Script from "next/script";
import Box from "@mui/material/Box";
import NextTopLoader from "nextjs-toploader";
import { Manrope } from "next/font/google";
import Container from "@mui/material/Container";

const Navbar = dynamic(() => import("../components/Navbar"));
const BottomNavbar = dynamic(() => import("../components/BottomNavbar"));
const Footer = dynamic(() => import("../components/Footer"));

export const metadata = {
  title:
    "ProperHomes - Find Properties for Sale & Rent in India. List Property, Manage Rentals and more.",
  description: `Find Proper Homes, Flats, Commercial Properties for Sale, Rent, Lease! List property, Manage rentals and more at ProperHomes.`,
  keywords: [
    "2BHK apartments for sale",
    "3BHK apartments for sale",
    "2BHK apartments for rent",
    "3BHK apartments for rent",
    "Homes for sale, rent",
    "Flats for sale, rent",
    "Apartments for sale, rent",
    "Properties for Sale, Rent",
    "Real Estate India",
    "Find Residential properties",
    "Find Real Estate Projects",
    "Holiday Homes",
    "Rental Property Management in India",
    "Manage Rental Properties",
    "100% verified Owners",
    "No Brokers, No Agents, No Middlemen",
    "ProperHomes",
    "Proper Homes",
  ],
  metadataBase: new URL("https://www.properhomes.in"),
  openGraph: {
    title:
      "ProperHomes - Find Properties for Sale & Rent in India. List Property, Manage Rentals and more.",
    description: `Find Proper Homes, Flats, Commercial Properties for Sale, Rent, Lease! List property, Manage rentals and more at ProperHomes.`,
    siteName: "ProperHomes",
    url: "https://www.properhomes.in",
    type: "website",
    images: "/logo.png",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "ProperHomes - Find Properties for Sale & Rent in India. List Property, Manage Rentals and more.",
    description: `Find Proper Homes, Flats, Commercial Properties for Sale, Rent, Lease! List property, Manage rentals and more at ProperHomes.`,
    creator: "@ProperHomes",
    images: ["/logo.png"],
  },
};

import AppMain from "./appMain";

import "../styles/globals.css";

export const manRope = Manrope({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

function RootLayout({ children }) {
  // https://open-next.js.org/common_issues/isr#patch-fetch-behaviour-for-isr-only-for-next1351
  const asyncStorage = require("next/dist/client/components/static-generation-async-storage.external");
  const staticStore =
    fetch.__nextGetStaticStore?.() || asyncStorage.staticGenerationAsyncStorage;
  const store = staticStore.getStore();
  store.isOnDemandRevalidate =
    store.isOnDemandRevalidate && !(process.env.OPEN_NEXT_ISR === "true");

  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="author" content="ProperHomes" />
        <meta name="copyright" content="ProperHomes" />
        <meta name="application-name" content="ProperHomes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="ProperHomes - Find Properties for Sale & Rent in India. List Property, Manage Rentals and more."
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href="https://www.properhomes.in" />
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
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
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
