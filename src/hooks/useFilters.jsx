"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { ALL_CITIES } from "@/utils/constants";

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
  onChangeCity,
  onChangeBedrooms,
  onChangeListedFor,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [city, setCity] = useState(null);
  const [bedrooms, setBedrooms] = useState(0);
  const [listedFor, setListedFor] = useState(null);

  const handleChangeCity = (e) => {
    setCity(e.target.value);
    if (onChangeCity) {
      onChangeCity();
    }
  };

  const handleChangeBedrooms = (e) => {
    setBedrooms(e.target.value);
    if (onChangeBedrooms) {
      onChangeBedrooms();
    }
  };

  const handleChangeListedFor = (e) => {
    setListedFor(e.target.value);
    if (onChangeListedFor) {
      onChangeListedFor();
    }
  };

  const handleReset = () => {
    setCity(null);
    setBedrooms(0);
    setListedFor(null);
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
              <Typography>
                {isMobile ? "City" : "Select a City"}
              </Typography>
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
        value={city ?? ""}
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
            return (
              <Typography>
                {isMobile ? "BHK" : "Select BHK"}
              </Typography>
            );
          }
          return BEDROOMS.find((b) => b.value === selected).label;
        }}
        sx={{
          width: { xs: "100%", md: "150px" },
          height: "55px",
          fontWeight: 500,
          fontSize: "0.8rem",
          ...(sx ?? {}),
        }}
        value={bedrooms ?? ""}
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
              <Typography>
                {isMobile ? "TYPE" : "Listing Type"}
              </Typography>
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
        value={listedFor ?? ""}
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
        {["SALE", "RENT", "LEASE"].map((l) => {
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
