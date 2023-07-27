import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";

import useToggleAuth from "@/utils/hooks/useToggleAuth";
import useDarkMode from "@/utils/hooks/useDarkMode";

function NavbarRight() {
  const theme = useTheme();
  const { Auth, toggleAuth } = useToggleAuth();
  const { isDarkModeActive, toggleDarkMode } = useDarkMode();

  const handleClickRentOrSell = () => {};

  return (
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
      {Auth}
    </Stack>
  );
}

export default NavbarRight;
