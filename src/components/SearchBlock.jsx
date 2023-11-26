"use client";
import { Suspense } from "react";
import Stack from "@mui/material/Stack";
import SearchInput from "./SearchInput";

function SearchBlock() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", minHeight: "60px" }}
    >
      <Suspense fallback={null}>
        <SearchInput showSearchBtn />
      </Suspense>
    </Stack>
  );
}

export default SearchBlock;
