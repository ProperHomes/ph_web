"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import useKeyDown from "@/utils/hooks/useKeyDown";
import { convertStringToSlug } from "@/utils/helper";
import useFilters from "@/utils/hooks/useFilters";

function SearchBlock() {
  const ref = useRef(null);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { city, CityDropdown } = useFilters({
    sx: {
      "& fieldset": {
        borderRadius: "8px 0 0 8px",
        borderColor: theme.palette.grey[300],
      },
    },
  });

  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleSubmit = () => {
    if (ref.current.value?.trim()?.length > 0) {
      const searchText = convertStringToSlug(ref.current.value);
      let path = `/search?searchText=${searchText}`;
      if (city) {
        path = `${path}&city=${city}`;
      }
      router.push(path);
    }
  };

  useKeyDown("Enter", handleSubmit);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%" }}
    >
      <CityDropdown />
      <Stack
        direction="row"
        alignItems="center"
        p={1}
        sx={{
          width: { xs: "100%", md: "500px" },
          height: "55px",
          border: "1px solid",
          borderColor: theme.palette.grey[300],
          borderRadius: isMobile ? "0 8px 8px 0" : 0,
          transition: "0.3s ease",
        }}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            fontSize: "1.2rem",
            fontWeight: 600,
            fontFamily: theme.typography.fontFamily.Manrope,
          }}
          inputRef={ref}
          placeholder="Eg: Flats for sale in Delhi"
          inputProps={{ "aria-label": "search properties" }}
        />
      </Stack>
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          display: { xs: "none", sm: "flex" },
          borderRadius: "0px 8px 8px 0px",
          fontSize: "1rem",
          height: "55px",
        }}
        startIcon={<SearchIcon sx={{ fontSize: "28px" }} />}
      >
        Search
      </Button>
    </Stack>
  );
}

export default SearchBlock;
