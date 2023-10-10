"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import RedditIcon from "@mui/icons-material/Reddit";

import CityLinks from "./CityLinks";
import { ALL_CITIES, navlinksSale, navlinksRent } from "@/utils/constants";
import TypographyUnderline from "../TypographyUnderline";

const tabSections = ALL_CITIES.map((c) => ({ label: c }));

const socialLinks = [
  { Icon: FacebookIcon, href: "/" },
  { Icon: InstagramIcon, href: "/" },
  { Icon: LinkedInIcon, href: "/" },
  { Icon: PinterestIcon, href: "/" },
  { Icon: RedditIcon, href: "/" },
  { Icon: TwitterIcon, href: "/" },
];

const subLinks = [
  { title: "Pay Rent", path: "/pay-rent" },
  {
    title: "EMI Calculator",
    path: "/homeloans/emi-calculator",
  },
  {
    title: "About Us",
    path: "/about",
  },
  {
    title: "FAQ",
    path: "/faq",
  },
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
  const pathname = usePathname();
  const theme = useTheme();
  const isDark = theme.palette.mode == "dark";
  const [index, setIndex] = useState(0);

  const handleChange = (_e, newIndex) => {
    setIndex(newIndex);
  };
  const city = ALL_CITIES[index];

  const isDashboard = pathname.includes("/dashboard");

  const allNavLinks = [
    { link: "paying-guests-accommodation", title: "Paying Guest" },
    { link: "hostel-accommodation", title: "Hostels" },
    ...navlinksSale,
    ...navlinksRent,
  ];

  return (
    <Box
      py={2}
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        borderRadius: !isDark ? "2em 2em 0 0" : "0",
        width: "100%",
        position: "absolute",
        bottom: 0,
        transform: "translateY(100%)",
      }}
    >
      <Container maxWidth="xl" sx={{ overflowX: "scroll" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent={{ xs: "center", md: "space-between" }}
        >
          <Stack alignItems={{ xs: "center", md: "start" }}>
            <Link href="/">
              <Typography
                color={theme.palette.primary.main}
                fontSize={{ xs: "1.4rem", sm: "1.8rem", md: "2rem" }}
                fontWeight={600}
                sx={{
                  cursor: "pointer",
                  maxWidth: "280px",
                  height: "auto",
                }}
              >
                ProperHomes
              </Typography>
            </Link>

            <Stack
              my={1}
              ml={-1}
              direction="row"
              alignItems="center"
              spacing={1}
            >
              {socialLinks.map(({ Icon, href }, i) => {
                return (
                  <IconButton LinkComponent={Link} href={href} key={i}>
                    <Icon />
                  </IconButton>
                );
              })}
            </Stack>
          </Stack>
          <Stack direction="row" spacing={3}>
            {subLinks.map((l) => {
              return (
                <Link
                  key={l.path}
                  href={l.path}
                  style={{ position: "relative" }}
                >
                  <TypographyUnderline>{l.title}</TypographyUnderline>
                </Link>
              );
            })}
          </Stack>
        </Stack>

        <Box pb={4}>
          <Tabs
            value={index}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
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

          <Box>
            <CityLinks links={allNavLinks} city={city} prefetch={false} />
          </Box>
        </Box>

        <Typography
          color={theme.palette.getContrastText(theme.palette.background.paper)}
          variant="caption"
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
