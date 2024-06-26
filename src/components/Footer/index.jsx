"use client";
import { useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import {
  TwitterIcon,
  PinterestIcon,
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
} from "next-share";

import CityLinks from "./CityLinks";
import { navlinksSale, navlinksRent } from "@/utils/constants";
import TypographyUnderline from "../TypographyUnderline";

const tabSections = ["HYDERABAD", "VIJAYAWADA"].map((c) => ({ label: c }));

const socialLinks = [
  { Icon: TwitterIcon, href: "https://www.twitter.com/properhomesin" },
  {
    Icon: LinkedinIcon,
    href: "https://www.linkedin.com/company/properhomesindia",
  },
  { Icon: FacebookIcon, href: "/" },
  { Icon: InstagramIcon, href: "/" },
  { Icon: PinterestIcon, href: "/" },
];

const subLinks = [
  {
    title: "About Us",
    path: "/about",
  },
  { title: "Pricing", path: "/pricing" },

  { title: "Blog", path: "/blog" },
  {
    title: "FAQ",
    path: "/faq",
  },
  { title: "Affiliate", path: "/affiliate-program" },
  {
    title: "EMI Calculator",
    path: "/homeloans/emi-calculator",
  },
  {
    title: "Create Rental Agreement",
    path: "/create-rental-agreement",
  },
];

const legalLinks = [
  {
    title: "Privacy Policy",
    path: "/privacypolicy",
  },
  {
    title: "Terms",
    path: "/terms-and-conditions",
  },
];

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [index, setIndex] = useState(0);

  const handleChange = (_e, newIndex) => {
    setIndex(newIndex);
  };
  const city = ["HYDERABAD", "VIJAYAWADA"][index];

  const allNavLinks = [
    ...navlinksSale,
    ...navlinksRent,
    { link: "paying-guests-accommodation", title: "Paying Guest" },
    { link: "hostel-accommodation", title: "Hostels" },
  ];

  return (
    <Box
      py={2}
      pb={{ xs: 10, md: 2 }}
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[2],

        width: "100%",
        position: "absolute",
        bottom: 0,
        transform: "translateY(100%)",
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="flex-start"
          justifyContent={{ xs: "center", md: "space-between" }}
        >
          <Stack alignItems={{ xs: "center", md: "start" }}>
            <Link href="/" title="ProperHomes">
              <Image
                src="/logo.png"
                width={200}
                height={50}
                priority
                quality={100}
                alt="logo"
                style={{
                  objectFit: "contain",
                  width: "auto",
                  height: "auto",
                }}
              />
            </Link>
            <Stack my={1} direction="row" alignItems="center">
              <Typography fontWeight={600}>Follow us on: </Typography>
              {socialLinks.map(({ Icon, href }, i) => {
                return (
                  <IconButton
                    aria-label="social media icon"
                    LinkComponent={Link}
                    href={href}
                    key={i}
                  >
                    <Icon round size="30" />
                  </IconButton>
                );
              })}
            </Stack>
            <Typography fontWeight={600}>
              ProperHomes is India's first spam free Real Estate Discovery and
              Listing App. <br />
              At ProperHomes, no middlemen is involved between buyers and
              sellers or tenants and owners. <br />
              Find Properties like Flats, Villas, Individual Houses, Commercial
              Units for Sale, Rent and Lease!.
              <br />
              <br />
              For any feedback, enquiries or complaints: <br /> Call: &nbsp;
              +916305078250 <br /> Email: veera@properhomes.in
            </Typography>
          </Stack>
          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
            spacing={3}
            mt={2}
          >
            {subLinks.map((l) => {
              return (
                <Link
                  key={l.path}
                  href={l.path}
                  prefetch={false}
                  title={l.title}
                  style={{ position: "relative" }}
                >
                  <TypographyUnderline>{l.title}</TypographyUnderline>
                </Link>
              );
            })}
          </Stack>
        </Stack>

        <Box py={4}>
          <Tabs
            value={index}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={isMobile}
            allowScrollButtonsMobile
            aria-label="footer city tabs"
          >
            {tabSections.map(({ label }) => {
              return (
                <Tab
                  key={label}
                  label={
                    <Typography fontSize="large" textTransform="capitalize">
                      {label.toLocaleLowerCase()}
                    </Typography>
                  }
                  sx={{
                    minHeight: "3.5em",
                    maxHeight: "3.5em",
                  }}
                />
              );
            })}
          </Tabs>

          <CityLinks links={allNavLinks} city={city} />
        </Box>

        <Stack direction="row" spacing={3}>
          {legalLinks.map((l) => {
            return (
              <Link
                key={l.path}
                href={l.path}
                prefetch={false}
                title={l.title}
                style={{ position: "relative" }}
              >
                <Typography fontSize="0.8rem">{l.title}</Typography>
              </Link>
            );
          })}
        </Stack>
        <Typography
          color={theme.palette.getContrastText(theme.palette.background.paper)}
          fontSize="14px"
        >
          All trademarks, logos and names are properties of their respective
          owners. All Rights Reserved. &nbsp; © Copyright{" "}
          {new Date().getFullYear()}&nbsp; Proper Eleven Techonologies Private
          Limited.
        </Typography>
      </Container>
    </Box>
  );
}
