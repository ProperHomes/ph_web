"use client";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";

import SearchInput from "./SearchInput";

function SearchBlock() {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%" }}
    >
      <SearchInput showSearchBtn />
    </Stack>
  );
}

export default SearchBlock;
