"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";

import { ALL_CITIES, LISTING_TYPE, PROPERTY_TYPE } from "@/utils/constants";

const BEDROOMS = [
  { label: "1BHK", value: 1 },
  { label: "2BHK", value: 2 },
  { label: "3BHK", value: 3 },
  { label: "4BHK", value: 4 },
  { label: "5BHK", value: 5 },
  { label: "6BHK", value: 6 },
];

const priceSortOptions = [
  { label: "Low To High", sort: "asc" },
  { label: "High To Low", sort: "desc" },
];

export default function useFilters({
  sx,
  onReset,
  isSearch,
  searchVariables,
  onChangeCity,
  onChangeBedrooms,
  onChangeListedFor,
  onChangePriceSort,
  onChangePropertyType,
}) {
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    searchText,
    city: searchCity,
    bedrooms: searchBedrooms,
    listedFor: searchListedFor,
    priceSort,
    type,
  } = searchVariables ?? {};

  const [city, setCity] = useState(searchCity);
  const [bedrooms, setBedrooms] = useState(
    searchBedrooms > 0 ? Number(searchBedrooms) : null
  );
  const [listedFor, setListedFor] = useState(searchListedFor);
  const [selectedPriceSort, setSelectedPriceSort] = useState(priceSort);
  const [propertyType, setPropertyType] = useState(type);

  const navigateToSearch = (key, value) => {
    if (isSearch && searchText?.length > 0) {
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
    setBedrooms(Number(e.target.value));
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

  const handleChangePropertyType = (e) => {
    navigateToSearch("type", e.target.value);
    setPropertyType(e.target.value);
    if (!isSearch && onChangePropertyType) {
      onChangePropertyType();
    }
  };

  const handlePriceSort = (e) => {
    const sortOption = e.target.value;
    navigateToSearch("priceSort", sortOption);
    setSelectedPriceSort(sortOption);
    if (!isSearch && onChangePriceSort) {
      onChangePriceSort();
    }
  };

  const handleReset = () => {
    setCity(null);
    setBedrooms(null);
    setListedFor(null);
    setSelectedPriceSort(null);
    if (onReset) {
      onReset();
    }
  };

  const SortPriceDropdown = () => {
    return (
      <Select
        displayEmpty
        renderValue={(selected) => {
          if (!selected) {
            return <Typography>Sort By Price</Typography>;
          }
          return `Price: ${selected === "asc" ? "Low To High" : "High To Low"}`;
        }}
        sx={{
          width: { xs: "100%", md: "150px" },
          height: "55px",
          fontWeight: 500,
          fontSize: "0.8rem",
          ...(sx ?? {}),
        }}
        value={selectedPriceSort ?? priceSort ?? ""}
        onChange={handlePriceSort}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 250,
              width: 150,
            },
          },
        }}
      >
        {priceSortOptions.map((o) => {
          return (
            <MenuItem
              key={o.label}
              value={o.sort}
              style={{ fontWeight: 500, fontSize: "0.8rem" }}
            >
              {o.label}
            </MenuItem>
          );
        })}
      </Select>
    );
  };

  const CityDropdown = () => {
    return (
      <Select
        displayEmpty
        renderValue={(selected) => {
          if (!selected) {
            return <Typography>{isMobile ? "City" : "Select City"}</Typography>;
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

  const PropertyTypeDropdown = ({ label }) => {
    return (
      <Select
        displayEmpty
        renderValue={(selected) => {
          if (!selected) {
            return (
              <Typography>
                {label ?? (isMobile ? "Type" : "Select Property Type")}
              </Typography>
            );
          }

          return PROPERTY_TYPE[selected];
        }}
        sx={{
          width: { xs: "100%", md: "150px" },
          height: "55px",
          fontWeight: 500,
          fontSize: "0.8rem",
          ...(sx ?? {}),
        }}
        value={propertyType ?? type ?? ""}
        onChange={handleChangePropertyType}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 250,
              width: 150,
            },
          },
        }}
      >
        {Object.keys(PROPERTY_TYPE).map((t) => {
          return (
            <MenuItem
              key={t}
              value={t}
              style={{ fontWeight: 500, fontSize: "0.8rem" }}
            >
              {PROPERTY_TYPE[t]}
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

  const ListedForDropdown = ({ label }) => {
    return (
      <Select
        displayEmpty
        renderValue={(selected) => {
          if (!selected) {
            return <Typography>{label ?? "Listed For"}</Typography>;
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
    SortPriceDropdown,
    PropertyTypeDropdown,
    ResetButton,
    bedrooms: Number(bedrooms),
    city,
    listedFor,
    propertyType,
    selectedPriceSort,
  };
}
