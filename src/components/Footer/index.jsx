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
import { useTheme } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import RedditIcon from "@mui/icons-material/Reddit";

import CityLinks from "./CityLinks";
import {
  ALL_CITIES,
  navlinksSale,
  navlinksRent,
  navlinksOthers,
} from "@/utils/constants";

const tabSections = ALL_CITIES.map((c) => ({ label: c }));

const socialLinks = [
  { Icon: FacebookIcon, href: "/" },
  { Icon: InstagramIcon, href: "/" },
  { Icon: LinkedInIcon, href: "/" },
  { Icon: PinterestIcon, href: "/" },
  { Icon: RedditIcon, href: "/" },
  { Icon: TwitterIcon, href: "/" },
];

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode == "dark";
  const [index, setIndex] = useState(0);

  const handleChange = (_e, newIndex) => {
    setIndex(newIndex);
  };
  const city = ALL_CITIES[index];

  return (
    <Box
      py={2}
      sx={{
        boxShadow: theme.shadows[2],
        borderRadius: "2em 2em 0 0",
        width: "100%",
        position: "absolute",
        bottom: 0,
        transform: "translateY(100%)",
      }}
    >
      <Container maxWidth="xl" sx={{ overflowX: "scroll" }}>
        <Stack>
          <Link href="/">
            <Typography
              color={theme.palette.primary.main}
              fontFamily={theme.typography.fontFamily.Monsterrat}
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
          {/* <Typography gutterBottom maxWidth="500px">
            ProperHomes is the place where you can find a home that love you.
            Zero Spam, Zero Brokerage, Zero Paperwork and Zero Issues are our
            main advantages over other real estate listing websites/apps.
          </Typography> */}
          <Stack my={1} ml={-1} direction="row" alignItems="center" spacing={1}>
            {socialLinks.map(({ Icon, href }, i) => {
              return (
                <IconButton LinkComponent={Link} href={href} key={i}>
                  <Icon />
                </IconButton>
              );
            })}
          </Stack>
        </Stack>

        <Tabs
          value={index}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="footer city tabs"
        >
          {tabSections.map(({ label }) => {
            return (
              <Tab
                key={label}
                label={
                  <Typography fontSize="medium" textTransform="capitalize">
                    {label.toLocaleLowerCase()}
                  </Typography>
                }
                sx={{
                  fontFamily: theme.typography.fontFamily.Manrope,
                  minHeight: "3.5em",
                  maxHeight: "3.5em",
                }}
              />
            );
          })}
        </Tabs>

        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          minHeight="350px"
        >
          <CityLinks links={navlinksSale} city={city} />
          <CityLinks links={navlinksRent} city={city} />
          <CityLinks links={navlinksOthers} city={city} />
        </Stack>

        <Typography
          color={theme.palette.getContrastText(theme.palette.background.paper)}
          variant="caption"
        >
          All trademarks, logos and names are properties of their respective
          owners. All Rights Reserved. © Copyright {new Date().getFullYear()}{" "}
          Properhomes Realty Pvt Limited.
        </Typography>
      </Container>
    </Box>
  );
}
