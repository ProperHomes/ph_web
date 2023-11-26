import { Suspense } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { manRope } from "@/utils/constants";
import PageLoadProgress from "@/components/PageLoadProgress";

const Navbar = dynamic(() => import("../components/Navbar"));
const BottomNavbar = dynamic(() => import("../components/BottomNavbar"), {
  ssr: false,
});
const Footer = dynamic(() => import("../components/Footer"), { ssr: false });

import AppMain from "./AppMain/index";

import "../styles/globals.css";

export const metadata = {
  title:
    "ProperHomes - Find Properties for Sale & Rent in India. List Property, Manage Rentals and more.",
  description: `Find Proper Homes, Flats, Commercial Properties for Sale, Rent, Lease! List property, Manage rentals and more at ProperHomes. Real Estate in India.`,
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
  alternates: {
    canonical: "https://www.properhomes.in",
  },
  metadataBase: new URL("https://www.properhomes.in"),
  openGraph: {
    title:
      "ProperHomes - Find Properties for Sale & Rent in India. List Property, Manage Rentals and more.",
    description: `Find Proper Homes, Flats, Commercial Properties for Sale, Rent, Lease! List property, Manage rentals and more at ProperHomes. Real Estate in India.`,
    siteName: "ProperHomes",
    url: "https://www.properhomes.in",
    type: "website",
    images: "/logo.png",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "ProperHomes - Find Properties for Sale & Rent in India. List Property, Manage Rentals and more.",
    description: `Find Proper Homes, Flats, Commercial Properties for Sale, Rent, Lease! List property, Manage rentals and more at ProperHomes. Real Estate in India.`,
    creator: "@ProperHomes",
    images: ["/logo.png"],
  },
};

const rootJsonLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ProperHomes",
  url: "https://www.properhomes.in",
  alternateName: "Proper Homes",
  description:
    "Find Proper Homes, Flats, Commercial Properties for Sale, Rent, Lease! List property, Manage rentals and more at ProperHomes. Real Estate in India.",
  logo: {
    "@type": "ImageObject",
    url: "https://properhomes.in/logo.png",
    width: 374,
    height: 72,
  },
  // sameAs: [
  //   "https://www.facebook.com/magicbricks",
  //   "https://www.twitter.com/magicbricks",
  //   "https://www.youtube.com/user/magicbricksvideo",
  //   "https://www.linkedin.com/company/magicbricks/",
  // ],
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Proper Eleven Technologies Private Limited (properhomes.in), Sarojini Heights, Kanuru, 520007",
    addressLocality: "Vijayawada",
    addressRegion: "India",
    postalCode: "520007",
  },
  // contactPoint: [
  //   {
  //     "@type": "ContactPoint",
  //     telephone: "+91 120-6866600",
  //     contactType: "Customer Service",
  //     areaServed: "India",
  //   },
  // ],
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLD) }}
        />
        <script
          defer
          data-domain="properhomes.in"
          src="https://plausible.properhomes.in/js/script.js"
        ></script>
      </head>
      <body className={manRope.className}>
        <Suspense fallback={<></>}>
          <PageLoadProgress showSpinner={false} />
        </Suspense>
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
