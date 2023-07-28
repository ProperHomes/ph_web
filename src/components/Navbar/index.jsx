import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

import NavbarLeft from "./Left";
import NavLinks from "./NavLinks";
import NavbarRight from "./Right";
import SecondSection from "./SecondSection";

function Navbar() {
  const theme = useTheme();
  return (
    <Box
      pt={1}
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
            spacing={1}
          >
            <NavbarLeft />
            <NavbarRight />
          </Stack>
          <Divider />
          <SecondSection />
        </Stack>
      </Container>
    </Box>
  );
}

export default Navbar;