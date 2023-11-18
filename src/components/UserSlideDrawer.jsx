"use client";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import useToggleAuth from "src/hooks/useToggleAuth";
import SlideDrawer from "./Drawer";
import CalculateOutlined from "@mui/icons-material/CalculateOutlined";
import Dashboard from "@mui/icons-material/Dashboard";
import Login from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/HomeOutlined";

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

function UserSlideDrawer({ showDrawer, toggleDrawer }) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { Auth, loggedInUser, isLoggedIn, toggleAuth } = useToggleAuth();

  const navigateTo = (link) => () => {
    router.push(link);
    toggleDrawer();
  };

  const isSysAdmin = !!loggedInUser?.isSysAdmin;

  return (
    <SlideDrawer
      open={showDrawer}
      handleClose={toggleDrawer}
      title={
        !isLoggedIn
          ? "Welcome to ProperHomes"
          : `Hello ${loggedInUser?.name ?? loggedInUser?.phoneNumber ?? ""}`
      }
      position={isMobile ? "bottom" : "right"}
    >
      <Stack p={2} direction="column" sx={{ height: "100%" }} spacing={8}>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center">
            <Typography
              color={theme.palette.text.primary}
              fontWeight={600}
              fontSize={20}
              textAlign={"center"}
              ml={{ xs: "1rem", md: 0 }}
            >
              {isLoggedIn
                ? `Hello, ${
                    loggedInUser?.name ?? loggedInUser?.phoneNumber ?? ""
                  }`
                : "Welcome to ProperHomes"}
            </Typography>
          </Stack>

          <StyledBtn
            fullWidth
            startIcon={<HomeIcon />}
            onClick={navigateTo("/")}
          >
            Home
          </StyledBtn>
          {isLoggedIn && (
            <>
              <StyledBtn
                startIcon={<Dashboard />}
                onClick={navigateTo("/dashboard/manage")}
              >
                Dashboard
              </StyledBtn>
              <StyledBtn
                startIcon={<Dashboard />}
                onClick={navigateTo("/dashboard/settings")}
              >
                Settings
              </StyledBtn>
            </>
          )}
          {isSysAdmin && (
            <StyledBtn
              startIcon={<Dashboard />}
              onClick={navigateTo("/dashboard/sysadmin")}
            >
              SysAdmin
            </StyledBtn>
          )}
        </Stack>

        <Stack
          direction="column"
          justifyContent="space-between"
          spacing={2}
          sx={{ margin: "0 auto", width: "100%" }}
        >
          <StyledBtn
            startIcon={<CalculateOutlined />}
            onClick={navigateTo("/homeloans/emi-calculator")}
          >
            EMI Calculator
          </StyledBtn>
          <StyledBtn
            startIcon={<CalculateOutlined />}
            onClick={navigateTo(
              "/property-rental-management-for-owners-managers"
            )}
          >
            Manage Rentals
          </StyledBtn>

          <StyledBtn
            startIcon={<CalculateOutlined />}
            onClick={navigateTo("/create-rental-agreement")}
          >
            Generate Rental Agreement
          </StyledBtn>
        </Stack>
      </Stack>
      {!isLoggedIn && (
        <StyledBtn startIcon={<Login />} fullWidth onClick={toggleAuth}>
          Login or Signup
        </StyledBtn>
      )}
      {Auth}
    </SlideDrawer>
  );
}

export default UserSlideDrawer;
