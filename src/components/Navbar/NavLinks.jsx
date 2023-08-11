"use client";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

const links = [
  { title: "For Sale", path: "/properties-for-sale" },
  { title: "For Rent", path: "/properties-for-rent" },
  { title: "For Property Owners/Managers", path: "/property-management" },
  {
    title: "List your Property For Free",
    path: "/list-your-property-for-sale-rent-lease",
  },
  { title: "Blog", path: "/blog" },
];

function NavLinks() {
  const theme = useTheme();
  return (
    <Stack
      ml={4}
      mr="auto"
      sx={{
        display: { xs: "none", sm: "flex" },
      }}
      direction="row"
      spacing={3}
      alignItems="center"
    >
      {links.map(({ title, path }) => {
        return (
          <Link href={path} key={path}>
            <Typography
              fontWeight={600}
              fontSize={theme.spacing(2)}
              color={theme.palette.text.secondary}
              fontFamily={theme.typography.fontFamily.Manrope}
              sx={{
                transition: "all 0.3s ease",
                "&:hover": {
                  color: theme.palette.text.primary,
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
