"use client";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useToggleAuth from "src/hooks/useToggleAuth";
import useDarkMode from "src/hooks/useDarkMode";
import SlideDrawer from "./Drawer";
import CalculateOutlined from "@mui/icons-material/CalculateOutlined";
import Dashboard from "@mui/icons-material/Dashboard";
import Login from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import SettingsIcon from "@mui/icons-material/Settings";
import CurrencyRupeeOutlined from "@mui/icons-material/CurrencyRupeeOutlined";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Save } from "@mui/icons-material";

const StyledBtn = styled(Button)(({ theme }) => ({
  maxWidth: { xs: "150px", sm: "100%" },
  marginLeft: "auto",
  borderRadius: "1em",
  fontWeight: 600,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  borderColor: theme.palette.grey[200],
  transition: "0.3s ease",
  boxShadow: theme.shadows[2],
  transition: "0.3s ease",
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
}));

function UserSlideDrawer({ showDrawer, toggleDrawer, showNotifications }) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { Auth, loggedInUser, isLoggedIn, toggleAuth, logout } =
    useToggleAuth();
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
      <Stack
        p={2}
        direction="column"
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center">
            <Typography
              color={theme.palette.text.primary}
              fontWeight={600}
              fontSize={20}
              textAlign={"center"}
              mt={1}
              ml={{ xs: "1rem", md: 0 }}
            >
              {isLoggedIn
                ? showNotifications
                  ? "New Notifications"
                  : `Hello, ${loggedInUser?.name}`
                : "Welcome to ProperHomes"}
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

          {!showNotifications && isLoggedIn && (
            <>
              <StyledBtn
                startIcon={<Dashboard />}
                onClick={navigateTo("/dashboard")}
              >
                Dashboard
              </StyledBtn>
              <StyledBtn
                startIcon={<CreditCardIcon />}
                onClick={navigateTo("/dashboard/membership")}
              >
                Membership
              </StyledBtn>
              <StyledBtn
                startIcon={<Save />}
                onClick={navigateTo("/dashboard/saved-properties")}
              >
                Saved Properties
              </StyledBtn>
              <StyledBtn
                startIcon={<SettingsIcon />}
                onClick={navigateTo("/settings")}
              >
                Settings
              </StyledBtn>
            </>
          )}
        </Stack>

        {!showNotifications && (
          <Stack
            direction="column"
            justifyContent="space-between"
            spacing={2}
            sx={{ margin: "0 auto", width: "100%" }}
          >
            <StyledBtn
              fullWidth
              startIcon={<HomeIcon />}
              onClick={navigateTo("/")}
            >
              Home
            </StyledBtn>
            <StyledBtn
              fullWidth
              startIcon={<CurrencyRupeeOutlined />}
              onClick={navigateTo("/pay-rent-online")}
            >
              Pay Rent
            </StyledBtn>
            <StyledBtn
              startIcon={<CalculateOutlined />}
              onClick={navigateTo("/homeloans/emi-calculator")}
            >
              EMI Calculator
            </StyledBtn>
            <StyledBtn
              startIcon={<CalculateOutlined />}
              onClick={navigateTo("/rent-reciept-generator-online")}
            >
              Generate Rent Receipt
            </StyledBtn>
            <StyledBtn
              startIcon={<CalculateOutlined />}
              onClick={navigateTo("/rental-agreement")}
            >
              Generate Rental Agreement
            </StyledBtn>
          </Stack>
        )}

        {!showNotifications && (
          <Stack direction="row" alignItems="center" spacing={2}>
            {!isLoggedIn ? (
              <StyledBtn startIcon={<Login />} fullWidth onClick={toggleAuth}>
                Login or Signup
              </StyledBtn>
            ) : (
              <StyledBtn startIcon={<Logout />} fullWidth onClick={logout}>
                Logout
              </StyledBtn>
            )}
          </Stack>
        )}

        {/* {showNotifications && <Typography>Hello</Typography>} */}
      </Stack>

      {Auth}
    </SlideDrawer>
  );
}

export default UserSlideDrawer;
