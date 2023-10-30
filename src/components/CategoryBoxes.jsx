"use client";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import Villa from "@mui/icons-material/VillaOutlined";
import HouseOutlined from "@mui/icons-material/HouseOutlined";
import LocationCityOutlined from "@mui/icons-material/LocationCityOutlined";
import WarehouseOutlined from "@mui/icons-material/WarehouseOutlined";
import CabinOutlined from "@mui/icons-material/CabinOutlined";

const forSaleLinks = [
  {
    label: "Flats For Sale",
    link: "/flats-for-sale",
    Icon: LocationCityOutlined,
  },
  { label: "Villas For Sale", link: "/villas-for-sale", Icon: Villa },
  {
    label: "Houses For Sale",
    link: "/houses-for-sale",
    Icon: HouseOutlined,
  },
  {
    label: "FarmHouses For Sale",
    link: "/farm-houses-for-sale",
    Icon: CabinOutlined,
  },
  {
    label: "Commercial For Sale",
    link: "/commercial-properties-for-sale",
    Icon: WarehouseOutlined,
  },
];

const forRentlinks = [
  {
    label: "Paying Guests (PG)",
    link: "/paying-guests-accommodation",
    Icon: CabinOutlined,
  },
  {
    label: "Flats For Rent",
    link: "/flats-for-rent",
    Icon: LocationCityOutlined,
  },
  { label: "Villas For Rent", link: "/villas-for-rent", Icon: Villa },
  {
    label: "Houses For Rent",
    link: "/houses-for-rent",
    Icon: HouseOutlined,
  },
  {
    label: "Commercial For Rent",
    link: "/commercial-properties-for-rent",
    Icon: WarehouseOutlined,
  },
];

const allLinks = [...forRentlinks, ...forSaleLinks];

function CategoryBoxes() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const pathname = usePathname();
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gap: "1em",
        gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
      }}
    >
      {allLinks.map(({ link, Icon, label }) => {
        const isActive = link === pathname;
        return (
          <Link href={link} key={link} aria-label={label}>
            <Stack
              spacing={1}
              direction="column"
              alignItems="center"
              justifyContent="center"
              boxShadow={theme.shadows[2]}
              p={1}
              sx={{
                width: { xs: "100%", md: "100px" },
                height: "100%",
                border: isActive
                  ? `2px solid ${theme.palette.info.main}`
                  : "none",
                borderRadius: "0.5rem",
                transition: "0.3s ease",
                backgroundColor: isDarkMode ? "#000" : "#fff",
                "&: hover": {
                  boxShadow: theme.shadows[4],
                  "& svg": {
                    color: theme.palette.info.main,
                  },
                  "& p": {
                    color: theme.palette.info.main,
                  },
                },
              }}
            >
              <Icon
                htmlColor={
                  isActive
                    ? theme.palette.info.main
                    : theme.palette.primary.main
                }
              />
              <Typography
                textAlign="center"
                color={theme.palette.text[isActive ? "primary" : "secondary"]}
                fontSize="0.8rem"
                fontWeight={isActive ? 800 : 700}
                sx={{
                  transition: "all 0.3s ease",
                  color: isActive
                    ? theme.palette.info.main
                    : theme.palette.primary.main,
                }}
              >
                {label}
              </Typography>
            </Stack>
          </Link>
        );
      })}
    </Box>
  );
}

export default CategoryBoxes;
