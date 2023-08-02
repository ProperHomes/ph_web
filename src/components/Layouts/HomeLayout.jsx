import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Navbar from "../Navbar";
import useToggleAuth from "@/utils/hooks/useToggleAuth";
import BottomNavbar from "../BottomNavbar";

function HomeLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isLoggedIn } = useToggleAuth();
  return (
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth="xl">
        <Box py={4} sx={{ width: "100%", height: "100%" }}>
          {children}
        </Box>
      </Container>
      {isLoggedIn && isMobile && <BottomNavbar />}
    </Box>
  );
}

export default HomeLayout;
