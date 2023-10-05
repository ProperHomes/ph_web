"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";
import Place from "@mui/icons-material/Place";

import useKeyDown from "src/hooks/useKeyDown";
import Filters from "./Filters";

function SearchInput({ showSearchBtn }) {
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const listedFor = searchParams.get("listedFor");
  const type = searchParams.get("type");

  const handleSubmit = () => {
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
  };

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
        minWidth: { xs: "100%", md: "600px" },
        height: "60px",
        border: isMobile ? "0.5px solid" : "1px solid",
        borderColor: theme.palette.grey[300],
        borderRadius: "2rem",
        transition: "0.3s ease",
      }}
    >
      {!isMobile && (
        <Filters
          hideBedrooms
          hidePriceSort
          hideReset
          hasCityDivider
          hasTypeDivider
          listedForLabel="Sale/Rent"
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
      )}

      {isMobile && (
        <Stack direction="row" spacing={1} alignItems="center">
          <Place
            sx={{ fontSize: "28px" }}
            htmlColor={isDark ? "#fff" : "#000"}
          />
          <Typography>Search By City, Type, Price...</Typography>
        </Stack>
      )}

      {showSearchBtn && !isMobile && (
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            borderRadius: "2rem",
            fontSize: "1rem",
            width: "100%",
            height: "40px",
          }}
          startIcon={<SearchIcon sx={{ fontSize: "28px" }} />}
        >
          Search
        </Button>
      )}
      {isMobile && (
        <IconButton
          onClick={handleSubmit}
          sx={{
            fontSize: "1rem",
            backgroundColor: isDark ? "#fff" : "#000",
          }}
        >
          <SearchIcon
            sx={{ fontSize: "28px" }}
            htmlColor={isDark ? "#000" : "#fff"}
          />
        </IconButton>
      )}
    </Stack>
  );
}

export default SearchInput;
