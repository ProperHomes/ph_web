"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import NavbarLeft from "./Left";
import NavbarRight from "./Right";
import { PRIVATE_ROUTES } from "@/utils/constants";
import UserSlideDrawer from "../UserSlideDrawer";

function Navbar() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [showDrawer, setShowDrawer] = useState(false);

  const isPrivateRoute = PRIVATE_ROUTES.includes(router.pathname);

  const toggleDrawer = () => {
    setShowDrawer((prev) => !prev);
  };

  return (
    <Box
      pt={2}
      pb={{ xs: 1, sm: 0 }}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: theme.palette.background.default,
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
            <NavbarLeft />
            <NavbarRight />
          </Stack>
        </Stack>
      </Container>
      <UserSlideDrawer showDrawer={showDrawer} toggleDrawer={toggleDrawer} />
    </Box>
  );
}

export default Navbar;
