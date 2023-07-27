import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import useToggleAuth from "@/utils/hooks/useToggleAuth";
import useDarkMode from "@/utils/hooks/useDarkMode";
import SlideDrawer from "./Drawer";

function UserSlideDrawer({ showDrawer, toggleDrawer }) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { loggedInUser, isLoggedIn, toggleAuth, logout } = useToggleAuth();
  const { isDarkModeActive, toggleDarkMode } = useDarkMode();

  const navigateTo = (link) => () => {
    router.push(link);
    toggleDrawer();
  };

  return (
    <SlideDrawer
      open={showDrawer}
      handleClose={toggleDrawer}
      title={
        !isLoggedIn ? "Welcome to ProperHomes" : `Hello ${loggedInUser?.name}`
      }
      position={isMobile ? "bottom" : "right"}
    >
      <Stack p={2} sx={{ height: "100%" }}>
        {isLoggedIn && (
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center">
              <Typography
                color={theme.palette.text.primary}
                fontFamily={theme.typography.fontFamily.Monsterrat}
                fontWeight={600}
                fontSize={20}
                textAlign={"center"}
                mt={1}
                ml={{ xs: "1rem", md: 0 }}
              >
                Hello, {loggedInUser?.name}
              </Typography>

              {isDarkModeActive ? (
                <LightMode
                  sx={{ marginLeft: "auto", cursor: "pointer" }}
                  onClick={toggleDarkMode}
                  htmlColor="#fff"
                />
              ) : (
                <DarkMode
                  sx={{ marginLeft: "auto", cursor: "pointer" }}
                  onClick={toggleDarkMode}
                  htmlColor="#000"
                />
              )}
            </Stack>

            <Button variant="contained" onClick={navigateTo("/dashboard")}>
              Dashboard
            </Button>
            <Button variant="contained" onClick={navigateTo("/dashboard/chat")}>
              Messages
            </Button>
            <Button
              variant="contained"
              onClick={navigateTo("/dashboard/saved")}
            >
              Saved Properties
            </Button>
            <Button
              variant="contained"
              onClick={navigateTo("/dashboard/settings")}
            >
              Settings
            </Button>
            <Button
              variant="contained"
              onClick={navigateTo("/homeloan/emi-calculator")}
            >
              EMI Calculator
            </Button>
          </Stack>
        )}
        <Stack direction="row" alignItems="center" spacing={2} mt="auto">
          {!isLoggedIn ? (
            <Button fullWidth variant="contained" onClick={toggleAuth}>
              Login or Signup
            </Button>
          ) : (
            <Button fullWidth variant="contained" onClick={logout}>
              Logout
            </Button>
          )}
        </Stack>
      </Stack>
    </SlideDrawer>
  );
}

export default UserSlideDrawer;
