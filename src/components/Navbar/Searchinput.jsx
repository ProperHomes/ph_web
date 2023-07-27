import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

import { useTheme, styled } from "@mui/material/styles";

function SearchInput() {
  const theme = useTheme();
  return (
    <Stack
      component="form"
      direction="row"
      alignItems="center"
      sx={{
        width: "400px",
        border: "1px solid",
        borderColor: theme.palette.grey[400],
        borderRadius: "2rem",
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Properties"
        inputProps={{ "aria-label": "search properties" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Stack>
  );
}

export default SearchInput;
