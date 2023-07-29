import Link from "next/link";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Villa from "@mui/icons-material/VillaOutlined";
import HouseOutlined from "@mui/icons-material/HouseOutlined";
import LocationCityOutlined from "@mui/icons-material/LocationCityOutlined";
import WarehouseOutlined from "@mui/icons-material/WarehouseOutlined";
import CabinOutlined from "@mui/icons-material/CabinOutlined";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";

const links = [
  {
    label: "Flats",
    link: "/flats-for-sale",
    Icon: LocationCityOutlined,
  },
  { label: "Villas", link: "/villas-for-sale", Icon: Villa },
  {
    label: "Independent Houses",
    link: "/houses-for-sale",
    Icon: HouseOutlined,
  },
  {
    label: "Farm Houses",
    link: "/farm-houses-for-sale",
    Icon: CabinOutlined,
  },
  {
    label: "Pent Houses",
    link: "/pent-houses-for-sale",
    Icon: WarehouseOutlined,
  },
  {
    label: "Commercial Properties",
    link: "/commercial-properties-for-sale",
    Icon: WarehouseOutlined,
  },
];

function SecondSection() {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Stack
      spacing={4}
      py={1}
      direction="row"
      alignItems="center"
      sx={{
        overflow: "scroll",
        maxWidth: "100%",
      }}
    >
      {links.map(({ label, link, Icon }) => {
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
}

export default SecondSection;
