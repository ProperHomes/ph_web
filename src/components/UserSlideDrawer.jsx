"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import useToggleAuth from "src/hooks/useToggleAuth";
import SlideDrawer from "./Drawer";
import CalculateOutlined from "@mui/icons-material/CalculateOutlined";
import Dashboard from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import Login from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Logout from "@mui/icons-material/Logout";

const StyledBtn = styled(Button)(({ theme }) => ({
  maxWidth: { xs: "150px", sm: "100%" },
  marginLeft: "auto",
  borderRadius: "1em",
  fontWeight: 600,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.secondary.main,
  borderColor: theme.palette.grey[200],
  transition: "0.3s ease",
  boxShadow: theme.shadows[2],
  transition: "0.3s ease",
  "&:hover": {
    boxShadow: theme.shadows[4],
    backgroundColor: theme.palette.secondary.light,
  },
}));

function UserSlideDrawer({ showDrawer, toggleDrawer }) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { Auth, loggedInUser, isLoggedIn, toggleAuth, logout } =
    useToggleAuth();

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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
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
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
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
                LinkComponent={Link}
                prefetch={false}
                href="/dashboard/manage"
                onClick={toggleDrawer}
              >
                Dashboard
              </StyledBtn>
              <StyledBtn
                startIcon={<SettingsIcon />}
                LinkComponent={Link}
                prefetch={false}
                href="/dashboard/settings"
                onClick={toggleDrawer}
              >
                Settings
              </StyledBtn>
            </>
          )}
          {isSysAdmin && (
            <StyledBtn
              startIcon={<Dashboard />}
              LinkComponent={Link}
              prefetch={false}
              href="/dashboard/sysadmin"
              onClick={toggleDrawer}
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
            LinkComponent={Link}
            prefetch={false}
            href="/homeloans/emi-calculator"
            onClick={toggleDrawer}
          >
            EMI Calculator
          </StyledBtn>
          <StyledBtn
            startIcon={<CalculateOutlined />}
            LinkComponent={Link}
            prefetch={false}
            onClick={toggleDrawer}
            href="/property-rental-management-for-owners-managers"
          >
            Manage Rentals
          </StyledBtn>

          <StyledBtn
            startIcon={<CalculateOutlined />}
            LinkComponent={Link}
            prefetch={false}
            onClick={toggleDrawer}
            href="/create-rental-agreement"
          >
            Generate Rental Agreement
          </StyledBtn>
        </Stack>
        <StyledBtn
          startIcon={isLoggedIn ? <Logout /> : <Login />}
          fullWidth
          onClick={isLoggedIn ? logout : toggleAuth}
        >
          {isLoggedIn ? "Logout" : "Login or Signup"}
        </StyledBtn>
      </Stack>

      {Auth}
    </SlideDrawer>
  );
}

export default UserSlideDrawer;
