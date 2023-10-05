"use client";
import { Suspense } from "react";
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
      <Suspense fallback={<></>}>
        <SearchInput showSearchBtn />
      </Suspense>
    </Stack>
  );
}

export default SearchBlock;
