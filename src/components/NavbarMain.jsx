import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

import AuthModal from "@/containers/Auth";
import Logo from "public/assets/images/LogoTransparent.png";

function Navbar() {
  const theme = useTheme();
  const router = useRouter();
  const [openAuth, setOpenAuth] = useState(false);
  const toggleAuth = () => {
    setOpenAuth((prev) => !prev);
  };
  const navigateToHome = () => {
    router.push("/");
  };

  return (
    <Box>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Image
            src={Logo}
            alt="logo"
            quality={100}
            priority
            style={{
              cursor: "pointer",
              maxWidth: "280px",
              height: "auto",
            }}
            onClick={navigateToHome}
          />

          <Stack direction="row" spacing={2}>
            <Button
              size="large"
              sx={{
                display: { xs: "none", sm: "flex" },
                marginLeft: "auto",
                borderRadius: "1em",
                fontWeight: "semibold",
                color: theme.palette.primary.main,
                fontFamily: theme.typography.fontFamily.Manrope,
                backgroundColor: theme.palette.secondary.main,
                "&:hover": {
                  backgroundColor: theme.palette.secondary.contrastText,
                },
              }}
            >
              Rent/Sell your property
            </Button>
            <Avatar onClick={toggleAuth} sx={{ cursor: "pointer" }} />
          </Stack>
        </Stack>
      </Container>
      <Divider />
      <AuthModal open={openAuth} handleClose={toggleAuth} />
    </Box>
  );
}

export default Navbar;
