import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Navbar from "../NavbarMain";

function HomeLayout({ children }) {
  return (
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="xl">
        <Box py={4} sx={{ overflow: "scroll", width: "100%", height: "100%" }}>
          {children}
        </Box>
      </Container>
    </Box>
  );
}

export default HomeLayout;
