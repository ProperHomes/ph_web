import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import ReorderOutlined from "@mui/icons-material/ReorderOutlined";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import useToggleAuth from "@/utils/hooks/useToggleAuth";
import useDarkMode from "@/utils/hooks/useDarkMode";
import { useState } from "react";
import SlideDrawer from "../Drawer";

function NavbarRight() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { Auth, loggedInUser, isLoggedIn, toggleAuth, logout } =
    useToggleAuth();
  const [showDrawer, setShowDrawer] = useState(false);
  const { isDarkModeActive, toggleDarkMode } = useDarkMode();

  const toggleDrawer = () => {
    setShowDrawer((prev) => !prev);
  };

  const navigateTo = (link) => () => {
    router.push(link);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button
        size="large"
        sx={{
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
        onClick={toggleDrawer}
      >
        <Avatar sx={{ width: 30, height: 30, marginRight: "0.5em" }} />
        {!!loggedInUser ? (
          <Typography
            fontWeight="bold"
            fontFamily={theme.typography.fontFamily.Manrope}
          >
            {loggedInUser?.name}
          </Typography>
        ) : (
          <ReorderOutlined htmlColor={theme.palette.text.secondary} />
        )}
      </Button>
      {Auth}

      <SlideDrawer
        open={showDrawer}
        handleClose={toggleDrawer}
        title={
          !isLoggedIn ? "Welcome to ProperHomes" : `Hello ${loggedInUser?.name}`
        }
        position={isMobile ? "bottom" : "right"}
      >
        <Stack sx={{ height: "100%" }}>
          {isLoggedIn && (
            <Stack>
              <Button onClick={navigateTo("/dashboard/saved")}>
                View Saved Properties
              </Button>
            </Stack>
          )}
          <Stack spacing={2} sx={{ marginTop: "auto" }}>
            <Button onClick={toggleDarkMode} variant="contained">
              {isDarkModeActive ? (
                <LightMode htmlColor="#fff" />
              ) : (
                <DarkMode htmlColor="#000" />
              )}
              {isDarkModeActive ? "Light Mode" : "Dark Mode"}
            </Button>
            {!isLoggedIn ? (
              <Button variant="contained" onClick={toggleAuth}>
                Login or Signup
              </Button>
            ) : (
              <Button variant="contained" onClick={logout}>
                Logout
              </Button>
            )}
          </Stack>
        </Stack>
      </SlideDrawer>
    </Stack>
  );
}

export default NavbarRight;
