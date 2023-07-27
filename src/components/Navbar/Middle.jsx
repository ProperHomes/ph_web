import Link from "next/link";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

const links = [
  { title: "For Sale", path: "/list/properties-for-sale" },
  { title: "For Rent", path: "/list/properties-for-rent" },
  { title: "EMI Calculator", path: "/homeloan/emi-calculator" },
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
              color={theme.palette.text.secondary}
              fontFamily={theme.typography.fontFamily.Manrope}
              sx={{
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
