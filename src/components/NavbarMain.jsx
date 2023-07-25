import { useRouter } from "next/router";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

import Logo from "public/assets/images/ProperHomesLogoTransparent.png";
import useToggleAuth from "@/utils/hooks/useToggleAuth";

function Navbar() {
  const theme = useTheme();
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  const { Auth, toggleAuth } = useToggleAuth();

  const navigateToHome = () => {
    router.push("/");
  };

  const handleClickRentOrSell = () => {};

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth={isHomePage ? "xl" : "lg"}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: "80px" }}
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
                fontWeight: 600,
                color: theme.palette.primary.main,
                fontFamily: theme.typography.fontFamily.Manrope,
                backgroundColor: theme.palette.secondary.main,
                "&:hover": {
                  backgroundColor: theme.palette.secondary.contrastText,
                },
              }}
              onClick={handleClickRentOrSell}
            >
              Rent/Sell your property
            </Button>
            <Avatar onClick={toggleAuth} sx={{ cursor: "pointer" }} />
          </Stack>
        </Stack>
      </Container>
      <Divider />
      {Auth}
    </Box>
  );
}

export default Navbar;
