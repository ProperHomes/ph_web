import { memo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";

import useToggleAuth from "@/utils/hooks/useToggleAuth";
import useDarkMode from "@/utils/hooks/useDarkMode";
import { Typography } from "@mui/material";

function Navbar() {
  const theme = useTheme();
  const router = useRouter();
  const isPropertyProfilePage = router.pathname.includes("/property/");
  const { Auth, toggleAuth } = useToggleAuth();
  const { isDarkModeActive, toggleDarkMode } = useDarkMode();

  const navigateToHome = () => {
    router.push("/");
  };

  const handleClickRentOrSell = () => {};

  // use 99acress nav menu instead
  const NavLinks = memo(() => {
    const links = [
      { title: "For Sale", path: "/list/properties-for-sale" },
      { title: "For Rent", path: "/list/properties-for-rent" },
      { title: "EMI Calculator", path: "/homeloan/emi-calculator" },
    ];
    return (
      <Stack
        sx={{
          display: { xs: "none", md: "flex" },
          marginRight: "auto",
          marginLeft: "5em",
        }}
        direction="row"
        spacing={2}
        alignItems="center"
      >
        {links.map(({ title, path }) => {
          return (
            <Link href={path} key={path}>
              <Typography
                fontWeight={700}
                fontSize={isPropertyProfilePage ? "0.8rem" : "1rem"}
                color={theme.palette.text.primary}
                fontFamily={theme.typography.fontFamily.Manrope}
                sx={{
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {title}
              </Typography>
            </Link>
          );
        })}
      </Stack>
    );
  }, []);

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Container maxWidth={isPropertyProfilePage ? "lg" : "xl"}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: "80px" }}
        >
          <Typography
            onClick={navigateToHome}
            color={theme.palette.primary.main}
            fontFamily={theme.typography.fontFamily.Manrope}
            fontSize="2rem"
            fontWeight={600}
            sx={{
              cursor: "pointer",
              maxWidth: "280px",
              height: "auto",
            }}
          >
            ProperHomes
          </Typography>

          <NavLinks />
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              size="large"
              sx={{
                display: { xs: "none", sm: "flex" },
                marginLeft: "auto",
                borderRadius: "1em",
                fontWeight: 600,
                color: theme.palette.text.primary,
                fontFamily: theme.typography.fontFamily.Manrope,
                backgroundColor: isDarkModeActive
                  ? "transparent"
                  : theme.palette.secondary.main,
                "&:hover": {
                  backgroundColor: theme.palette.secondary.contrastText,
                },
              }}
              onClick={handleClickRentOrSell}
            >
              Rent/Sell your property
            </Button>
            <IconButton onClick={toggleDarkMode}>
              {isDarkModeActive ? (
                <LightMode htmlColor="#fff" />
              ) : (
                <DarkMode htmlColor="#000" />
              )}
            </IconButton>

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
