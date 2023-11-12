"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";

import NavLinks from "./NavLinks";
import NavbarRight from "./Right";
import UserSlideDrawer from "../UserSlideDrawer";
import HideOnScroll from "../HideOnScroll";

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer((prev) => !prev);
  };

  return (
    <HideOnScroll canHide={isMobile}>
      <Box
        pt={2}
        pb={{ xs: 1, sm: 0 }}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: theme.palette.background.paper,
          boxShadow: "0px 2px 20px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={1}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              py={1}
              pb={2}
              spacing={1}
            >
              <Stack direction="row" alignItems="center">
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
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: "0px !important",
                      position: "absolute",
                    }}
                  >
                    ProperHomes
                  </Typography>
                </Link>
                <NavLinks />
              </Stack>
              <NavbarRight />
            </Stack>
          </Stack>
        </Container>
        <UserSlideDrawer showDrawer={showDrawer} toggleDrawer={toggleDrawer} />
      </Box>
    </HideOnScroll>
  );
}

export default Navbar;
