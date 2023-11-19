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
        color="orange"
        aria-label="navbar user menu button"
        sx={{
          maxWidth: { xs: "150px", sm: "100%" },
          marginLeft: "auto",
          borderRadius: "2em",
          fontWeight: 600,
          borderColor: theme.palette.orange.main,
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
          alt={loggedInUser?.name ?? loggedInUser?.phoneNumber ?? ""}
          sx={{
            width: 30,
            height: 30,
            marginRight: "0.5em",
            border: `1px solid ${theme.palette.orange.main}`,
          }}
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
            {loggedInUser?.name ?? loggedInUser?.phoneNumber ?? ""}
          </Typography>
        ) : (
          <MenuIcon htmlColor={theme.palette.info.main} />
        )}
      </Button>
      <UserSlideDrawer showDrawer={showDrawer} toggleDrawer={toggleDrawer} />
      <Notifications open={showNotifications} toggle={toggleNotifications} />
    </Stack>
  );
}

export default NavbarRight;
