"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import { useAppContext } from "src/appContext";
import { useNotificationsContext } from "src/app/notifications/context";
import useToggleAuth from "src/hooks/useToggleAuth";

const UserSlideDrawer = dynamic(() => import("../UserSlideDrawer"), {
  ssr: false,
});
const Notifications = dynamic(() => import("../../app/notifications"), {
  ssr: false,
});

function NavbarRight() {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { state: appState } = useAppContext();
  const loggedInUser = appState.user;
  const [showDrawer, setShowDrawer] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { toggleAuth, Auth } = useToggleAuth();

  const { state: notifState } = useNotificationsContext();

  const toggleDrawer = () => {
    setShowDrawer((prev) => !prev);
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const isDashboard = pathname.includes("/dashboard");

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {!loggedInUser && (
        <Button
          size="large"
          aria-label="login or signup button"
          onClick={toggleAuth}
        >
          Login / Signup
        </Button>
      )}
      {!!loggedInUser && !isDashboard && !isMobile && (
        <Button
          size="large"
          LinkComponent={Link}
          href="/dashboard/manage"
          aria-label="dashboard link"
        >
          Dashboard
        </Button>
      )}
      {!!loggedInUser && !isMobile && (
        <IconButton onClick={toggleNotifications}>
          <Badge invisible={!notifState.hasUnread} variant="dot" color="error">
            <NotificationsNoneIcon fontSize="medium" />
          </Badge>
        </IconButton>
      )}
      <Button
        component="div"
        size="large"
        aria-label="navbar user menu button"
        sx={{
          maxWidth: { xs: "150px", sm: "100%" },
          marginLeft: "auto",
          borderRadius: "1em",
          fontWeight: 600,
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.default,
          borderColor: theme.palette.grey[200],
          transition: "0.3s ease",
          boxShadow: theme.shadows[1],
          transition: "0.3s ease",
          "&:hover": {
            boxShadow: theme.shadows[4],
          },
        }}
        onClick={toggleDrawer}
      >
        <Avatar
          alt={loggedInUser?.name ?? ""}
          sx={{ width: 30, height: 30, marginRight: "0.5em" }}
        />
        {!!loggedInUser ? (
          <Typography
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
            fontWeight={theme.typography.fontWeightMedium}
          >
            {loggedInUser?.name}
          </Typography>
        ) : (
          <MenuIcon htmlColor={theme.palette.text.secondary} />
        )}
      </Button>
      <UserSlideDrawer showDrawer={showDrawer} toggleDrawer={toggleDrawer} />
      <Notifications open={showNotifications} toggle={toggleNotifications} />
      {Auth}
    </Stack>
  );
}

export default NavbarRight;
