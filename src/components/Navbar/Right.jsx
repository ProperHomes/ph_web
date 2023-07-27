import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ReorderOutlined from "@mui/icons-material/ReorderOutlined";
import { useTheme } from "@mui/material/styles";

import useToggleAuth from "@/utils/hooks/useToggleAuth";
import useDarkMode from "@/utils/hooks/useDarkMode";
import { useState } from "react";
import UserSlideDrawer from "../UserSlideDrawer";

function NavbarRight() {
  const theme = useTheme();
  const { Auth, loggedInUser } = useToggleAuth();
  const [showDrawer, setShowDrawer] = useState(false);
  const { isDarkModeActive } = useDarkMode();

  const toggleDrawer = () => {
    setShowDrawer((prev) => !prev);
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
          border: "1px solid",
          borderColor: theme.palette.info.main,
          backgroundColor: isDarkModeActive
            ? "transparent"
            : theme.palette.secondary.main,
          "&:hover": {
            backgroundColor: theme.palette.secondary.contrastText,
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
            fontWeight="bold"
            color={theme.palette.info.main}
            fontFamily={theme.typography.fontFamily.Manrope}
          >
            {loggedInUser?.name}
          </Typography>
        ) : (
          <ReorderOutlined htmlColor={theme.palette.text.secondary} />
        )}
      </Button>
      {Auth}
      <UserSlideDrawer showDrawer={showDrawer} toggleDrawer={toggleDrawer} />
    </Stack>
  );
}

export default NavbarRight;
