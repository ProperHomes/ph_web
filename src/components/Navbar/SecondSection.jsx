import Link from "next/link";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Villa from "@mui/icons-material/VillaOutlined";
import HouseOutlined from "@mui/icons-material/HouseOutlined";
import LocationCityOutlined from "@mui/icons-material/LocationCityOutlined";
import WarehouseOutlined from "@mui/icons-material/WarehouseOutlined";
import CabinOutlined from "@mui/icons-material/CabinOutlined";

const links = [
  {
    label: "Flats",
    link: "flats-for-sale-and-rent",
    Icon: LocationCityOutlined,
  },
  { label: "Villas", link: "villas-for-sale-and-rent", Icon: Villa },
  {
    label: "Independent Houses",
    link: "independent-houses-for-sale-and-rent",
    Icon: HouseOutlined,
  },
  {
    label: "Farm Houses",
    link: "flats-for-sale-and-rent",
    Icon: CabinOutlined,
  },
  {
    label: "Commercial Properties",
    link: "commercial-properties-for-sale-and-rent",
    Icon: WarehouseOutlined,
  },
];
function SecondSection() {
  const theme = useTheme();
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
        return (
          <Link
            href={link}
            key={link}
            style={{
              fontSize: "0.9rem",
              fontWeight: 500,
              fontFamily: theme.typography.fontFamily.Monsterrat,
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon sx={{ marginRight: "4px" }} />
            {label}
          </Link>
        );
      })}
    </Stack>
  );
}

export default SecondSection;
