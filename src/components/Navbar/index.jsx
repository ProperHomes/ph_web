"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

import NavbarLeft from "./Left";
import NavbarRight from "./Right";
import UserSlideDrawer from "../UserSlideDrawer";

function Navbar() {
  const theme = useTheme();

  const [showDrawer, setShowDrawer] = useState(false);

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
