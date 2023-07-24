import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Navbar from "../NavbarMain";

function HomeLayout({ children }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Navbar />
      <Container maxWidth="xl">
        <Box py={4}>{children}</Box>
      </Container>
    </Box>
  );
}

export default HomeLayout;
