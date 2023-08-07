"use client";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

import { useState } from "react";
import UserSlideDrawer from "../UserSlideDrawer";
import { useAppContext } from "src/appContext";

function NavbarRight() {
  const theme = useTheme();
  const { state: appState } = useAppContext();
  const loggedInUser = appState.user;
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer((prev) => !prev);
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button
        size="large"
        sx={{
          maxWidth: { xs: "150px", sm: "100%" },
          marginLeft: "auto",
          borderRadius: "1em",
          fontWeight: 600,
          color: theme.palette.text.primary,
          fontFamily: theme.typography.fontFamily.Manrope,
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
            fontFamily={theme.typography.fontFamily.Manrope}
          >
            {loggedInUser?.name}
          </Typography>
        ) : (
          <MenuIcon htmlColor={theme.palette.text.secondary} />
        )}
      </Button>
      <UserSlideDrawer showDrawer={showDrawer} toggleDrawer={toggleDrawer} />
    </Stack>
  );
}

export default NavbarRight;
