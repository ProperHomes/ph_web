import Link from "next/link";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

const links = [
  { title: "For Sale", path: "/list/properties-for-sale" },
  { title: "For Rent", path: "/list/properties-for-rent" },
  { title: "EMI Calculator", path: "/homeloan/emi-calculator" },
  { title: "Rent your property", path: "/rent-your-property" },
  { title: "Sell your property", path: "/sell-your-property" },
];

function NavLinks() {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        display: { xs: "none", md: "flex" },
        marginRight: "auto",
        marginLeft: "5em",
      }}
      direction="row"
      spacing={2}
      alignItems="center"
    >
      {links.map(({ title, path }) => {
        return (
          <Link href={path} key={path}>
            <Typography
              fontWeight={600}
              color={theme.palette.text.primary}
              fontFamily={theme.typography.fontFamily.Manrope}
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {title}
            </Typography>
          </Link>
        );
      })}
    </Stack>
  );
}

export default NavLinks;
