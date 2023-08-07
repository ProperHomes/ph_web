"use client";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Villa from "@mui/icons-material/VillaOutlined";
import HouseOutlined from "@mui/icons-material/HouseOutlined";
import LocationCityOutlined from "@mui/icons-material/LocationCityOutlined";
import WarehouseOutlined from "@mui/icons-material/WarehouseOutlined";
import CabinOutlined from "@mui/icons-material/CabinOutlined";

const links = [
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
    label: "FarmHouses For Rent",
    link: "/farm-houses-for-rent",
    Icon: CabinOutlined,
  },
  {
    label: "Commercial For Rent",
    link: "/commercial-properties-for-rent",
    Icon: WarehouseOutlined,
  },
  {
    label: "Pent Houses For Rent",
    link: "/pent-houses-for-rent",
    Icon: WarehouseOutlined,
  },
];

function SecondSection({ lineView }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up("xs"));
  const router = useRouter();

  const LineView = () => {
    return (
      <Stack
        spacing={2}
        py={1}
        direction="row"
        alignItems="center"
        sx={{
          overflow: "scroll",
          maxWidth: "100%",
        }}
      >
        {links.map(({ link, Icon, label }) => {
          const isActive = link === router.asPath;
          return (
            <Link href={link} key={link}>
              <Stack spacing={1} direction="row" alignItems="center">
                <Icon htmlColor={theme.palette.text.secondary} />
                <Typography
                  color={theme.palette.text[isActive ? "primary" : "secondary"]}
                  fontFamily={theme.typography.fontFamily.Monsterrat}
                  fontSize="0.9rem"
                  fontWeight={isActive ? 600 : 500}
                  sx={{
                    whiteSpace: "nowrap",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: theme.palette.text.primary,
                    },
                  }}
                >
                  {label}
                </Typography>
              </Stack>
            </Link>
          );
        })}
      </Stack>
    );
  };

  const BoxView = () => {
    return (
      <Box
        sx={{
          display: "grid",
          gap: "1em",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        }}
      >
        {links.map(({ link, Icon, label }) => {
          const isActive = link === router.asPath;
          return (
            <Link href={link} key={link}>
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
                  border: "0.5px",
                  borderRadius: "0.5rem",
                  transition: "0.3s ease",
                  "&: hover": {
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                <Icon htmlColor={theme.palette.text.secondary} />
                <Typography
                  textAlign="center"
                  color={theme.palette.text[isActive ? "primary" : "secondary"]}
                  fontFamily={theme.typography.fontFamily.Monsterrat}
                  fontSize="0.8rem"
                  fontWeight={isActive ? 600 : 500}
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: theme.palette.text.primary,
                    },
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
  };

  return lineView ? <LineView /> : <BoxView />;
}

export default SecondSection;
