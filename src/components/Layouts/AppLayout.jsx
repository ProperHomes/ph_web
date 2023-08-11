"use client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Navbar from "../Navbar";
import BottomNavbar from "../BottomNavbar";

function AppLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        marginBottom: { xs: "4em", md: 0 },
      }}
    >
      <Navbar />
      <Container maxWidth="xl">
        <Box pt={2} pb={4} sx={{ width: "100%", height: "100%" }}>
          {children}
        </Box>
      </Container>
      {isMobile && <BottomNavbar />}
    </Box>
  );
}

export default AppLayout;
