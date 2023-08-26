"use client";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

import useFilters from "src/hooks/useFilters";
import SearchInput from "./SearchInput";

function SearchBlock() {
  const theme = useTheme();

  const { city, CityDropdown } = useFilters({
    sx: {
      width: { xs: "100px", md: "150px" },
      "& fieldset": {
        borderRadius: "8px 0 0 8px",
        borderColor: theme.palette.grey[300],
      },
    },
  });

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%" }}
    >
      <CityDropdown />
      <SearchInput city={city} showSearchBtn />
    </Stack>
  );
}

export default SearchBlock;
