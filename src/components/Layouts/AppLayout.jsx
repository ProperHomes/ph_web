import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Navbar from "../Navbar";
import BottomNavbar from "../BottomNavbar";
import Footer from "../Footer";

function AppLayout({ children }) {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        marginBottom: { xs: "4em", md: 0 },
      }}
    >
      <Navbar />
      <Container maxWidth="xl">
        <Box pt={2} pb={4} sx={{ width: "100%", height: "100%" }}>
          {children}
        </Box>
      </Container>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: "100%",
        }}
      >
        <Footer />
      </Box>

      <Box sx={{ display: { xs: "flex", sm: "none" } }}>
        <BottomNavbar />
      </Box>
    </Box>
  );
}

export default AppLayout;
