"use client";
import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";
import Place from "@mui/icons-material/Place";

import Filters from "./Filters";
import useKeyDown from "src/hooks/useKeyDown";

function SearchInput({ showSearchBtn }) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const listedFor = searchParams.get("listedFor");
  const type = searchParams.get("type");

  const handleSubmit = useCallback(() => {
    if (!city && !type && !listedFor) {
      router.push("/search");
    } else {
      let path = "/search?";
      const filters = {};
      if (city) filters.city = city;
      if (listedFor) filters.listedFor = listedFor;
      if (type) filters.type = type;
      let count = 0;
      Object.keys(filters).forEach((k) => {
        if (filters[k]) {
          count += 1;
          path = `${path}${k}=${filters[k]}${
            count !== Object.keys(filters).length ? "&" : ""
          }`;
        }
      });
      router.push(path);
    }
  }, [city, type, listedFor]);

  const handleClick = () => {
    if (isMobile) {
      router.push("/search");
    }
  };

  useKeyDown("Enter", handleSubmit);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      p={1}
      spacing={2}
      onClick={handleClick}
      sx={{
        width: "100%",
        maxWidth: "650px",
        height: "60px",
        border: { xs: "0.5px solid", md: "1px solid" },
        borderColor: {
          xs: theme.palette.grey[300],
          md: theme.palette.grey[300],
        },
        borderRadius: "2rem",
        transition: "0.3s ease",
      }}
    >
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <Filters
          hideBedrooms
          hidePriceSort
          hideReset
          hasCityDivider
          hasTypeDivider
          listedForLabel="Sale/Rent"
          rootSx={{
            width: { xs: "100%", md: "600px" },
          }}
          sx={{
            width: { xs: "100px", md: "100%" },
            height: "60px",
            "& fieldset": {
              borderRadius: "16px",
              border: 0,
              borderColor: "transparent !important",
            },
          }}
        />
      </Box>

      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        <Place sx={{ fontSize: "28px" }} color="orange" />
        <Typography color="info.main">
          Search By City, Type, Price...
        </Typography>
      </Stack>

      {showSearchBtn && (
        <Button
          variant="contained"
          onClick={handleSubmit}
          color="orange"
          sx={{
            display: { xs: "none", md: "flex" },
            borderRadius: "2rem",
            fontSize: "1rem",
            width: "100%",
            maxWidth: "120px",
            height: "40px",
          }}
          startIcon={<SearchIcon sx={{ fontSize: "28px" }} />}
        >
          Search
        </Button>
      )}

      <IconButton
        aria-label="search button icon"
        onClick={handleSubmit}
        sx={{
          display: { xs: "flex", md: "none" },
          fontSize: "1rem",
        }}
      >
        <SearchIcon sx={{ fontSize: "28px" }} color="orange" />
      </IconButton>
    </Stack>
  );
}

export default SearchInput;
