"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { ALL_CITIES, LISTING_TYPE } from "@/utils/constants";

const BEDROOMS = [
  { label: "1BHK", value: 1 },
  { label: "2BHK", value: 2 },
  { label: "3BHK", value: 3 },
  { label: "4BHK", value: 4 },
  { label: "5BHK", value: 5 },
  { label: "6BHK", value: 6 },
];

export default function useFilters({
  sx,
  onReset,
  isSearch,
  searchVariables,
  onChangeCity,
  onChangeBedrooms,
  onChangeListedFor,
}) {
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    searchText,
    city: searchCity,
    bedrooms: searchBedrooms,
    listedFor: searchListedFor,
  } = searchVariables ?? {};

  const [city, setCity] = useState(searchCity);
  const [bedrooms, setBedrooms] = useState(searchBedrooms);
  const [listedFor, setListedFor] = useState(searchListedFor);

  const navigateToSearch = (key, value) => {
    if (isSearch && searchText.length > 0) {
      const url = new URL(window.location.href);
      url.searchParams.set(key, value);
      router.push(url.toString());
    }
  };

  const handleChangeCity = (e) => {
    navigateToSearch("city", e.target.value);
    setCity(e.target.value);
    if (!isSearch && onChangeCity) {
      onChangeCity();
    }
  };

  const handleChangeBedrooms = (e) => {
    navigateToSearch("bedrooms", e.target.value);
    setBedrooms(e.target.value);
    if (!isSearch && onChangeBedrooms) {
      onChangeBedrooms();
    }
  };

  const handleChangeListedFor = (e) => {
    navigateToSearch("listedFor", e.target.value);
    setListedFor(e.target.value);
    if (!isSearch && onChangeListedFor) {
      onChangeListedFor();
    }
  };

  const handleReset = () => {
    setCity(null);
    setBedrooms(null);
    setListedFor(null);
    if (isSearch) {
      router.replace(`search?searchText=${searchText}`);
    }
    if (onReset) {
      onReset();
    }
  };

  const CityDropdown = () => {
    return (
      <Select
        displayEmpty
        renderValue={(selected) => {
          if (!selected) {
            return (
              <Typography>{isMobile ? "City" : "Select a City"}</Typography>
            );
          }

          return selected;
        }}
        sx={{
          width: { xs: "100%", md: "150px" },
          height: "55px",
          fontWeight: 500,
          fontSize: "0.8rem",
          ...(sx ?? {}),
        }}
        value={city ?? searchCity ?? ""}
        onChange={handleChangeCity}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 250,
              width: 150,
            },
          },
        }}
      >
        {ALL_CITIES.map((city) => {
          return (
            <MenuItem
              key={city}
              value={city}
              style={{ fontWeight: 500, fontSize: "0.8rem" }}
            >
              {city}
            </MenuItem>
          );
        })}
      </Select>
    );
  };

  const BedroomsDropdown = () => {
    return (
      <Select
        displayEmpty
        renderValue={(selected) => {
          if (!selected) {
            return <Typography>{isMobile ? "BHK" : "Select BHK"}</Typography>;
          }
          return BEDROOMS.find((b) => b.value == selected).label;
        }}
        sx={{
          width: { xs: "100%", md: "150px" },
          height: "55px",
          fontWeight: 500,
          fontSize: "0.8rem",
          ...(sx ?? {}),
        }}
        value={bedrooms ?? searchBedrooms ?? ""}
        onChange={handleChangeBedrooms}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 250,
              width: 150,
            },
          },
        }}
      >
        {BEDROOMS.map((l) => {
          return (
            <MenuItem
              key={l.label}
              value={l.value}
              style={{ fontWeight: 500, fontSize: "0.8rem" }}
            >
              {l.label}
            </MenuItem>
          );
        })}
      </Select>
    );
  };

  const ListedForDropdown = () => {
    return (
      <Select
        displayEmpty
        renderValue={(selected) => {
          if (!selected) {
            return (
              <Typography>{isMobile ? "TYPE" : "Listing Type"}</Typography>
            );
          }
          return selected;
        }}
        sx={{
          width: { xs: "100%", md: "150px" },
          height: "55px",
          fontWeight: 500,
          fontSize: "0.8rem",
          ...(sx ?? {}),
        }}
        value={listedFor ?? searchListedFor ?? ""}
        onChange={handleChangeListedFor}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 250,
              width: 150,
            },
          },
        }}
      >
        {Object.keys(LISTING_TYPE).map((l) => {
          return (
            <MenuItem
              key={l}
              value={l}
              style={{ fontWeight: 500, fontSize: "0.8rem" }}
            >
              {l}
            </MenuItem>
          );
        })}
      </Select>
    );
  };

  const ResetButton = () => (
    <Button
      variant="outlined"
      size="large"
      onClick={handleReset}
      disabled={!city && !bedrooms && !listedFor}
      sx={{
        width: { xs: "100%", md: "150px" },
        height: "55px",
        borderRadius: "8px",
      }}
      aria-label="reset"
    >
      RESET
    </Button>
  );

  return {
    CityDropdown,
    BedroomsDropdown,
    ListedForDropdown,
    ResetButton,
    bedrooms,
    city,
    listedFor,
  };
}
