"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
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

export default function Filters({
  sx,
  typeLabel,
  listedForLabel,
  hideCity,
  hideType,
  hideBedrooms,
  hideListedFor,
  hidePriceSort,
  hideReset,
  hasCityDivider,
  hasTypeDivider,
  onReset,
  onChangeCity,
  onChangeBedrooms,
  onChangeListedFor,
  onChangePriceSort,
  onChangePropertyType,
}) {
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const bedrooms = searchParams.get("bedrooms");
  const listedFor = searchParams.get("listedFor");
  const priceSort = searchParams.get("priceSort");
  const type = searchParams.get("type");

  const addUrlParam = (key, value) => {
    if (key && value) {
      const url = new URL(window.location.href);
      const currentVal = url.searchParams.get(key);
      if (currentVal !== value) {
        url.searchParams.set(key, value);
        router.push(url.toString());
      }
    }
  };

  const handleChangeCity = (e) => {
    addUrlParam("city", e.target.value);
    if (onChangeCity) {
      onChangeCity();
    }
  };

  const handleChangeBedrooms = (e) => {
    addUrlParam("bedrooms", e.target.value);
    if (onChangeBedrooms) {
      onChangeBedrooms();
    }
  };

  const handleChangeListedFor = (e) => {
    addUrlParam("listedFor", e.target.value);
    if (onChangeListedFor) {
      onChangeListedFor();
    }
  };

  const handleChangePropertyType = (e) => {
    addUrlParam("type", e.target.value);
    if (onChangePropertyType) {
      onChangePropertyType();
    }
  };

  const handlePriceSort = (e) => {
    addUrlParam("priceSort", e.target.value);
    if (onChangePriceSort) {
      onChangePriceSort();
    }
  };

  const handleReset = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("city");
    url.searchParams.delete("bedrooms");
    url.searchParams.delete("listedFor");
    url.searchParams.delete("type");
    url.searchParams.delete("priceSort");
    router.push(url.toString());
    onReset();
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
        value={priceSort ?? ""}
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
        value={type ?? ""}
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
      disabled={!city && !bedrooms && !listedFor && !priceSort && !type}
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

  return (
    <>
      {!hideCity && <CityDropdown />}
      {hasCityDivider && <Divider orientation="vertical" />}
      {!hideType && <PropertyTypeDropdown label={typeLabel} />}
      {hasTypeDivider && <Divider orientation="vertical" />}
      {!hideBedrooms && <BedroomsDropdown />}
      {!hideListedFor && <ListedForDropdown label={listedForLabel} />}
      {!hidePriceSort && <SortPriceDropdown />}
      {!hideReset && <ResetButton />}
    </>
  );
}
