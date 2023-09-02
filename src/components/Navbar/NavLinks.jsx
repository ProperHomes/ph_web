"use client";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

const links = [
  { title: "For Sale", path: "/properties-for-sale" },
  { title: "For Rent", path: "/properties-for-rent" },
  {
    title: "Manage Rentals",
    path: "/property-rental-management-for-owners-managers",
  },
  {
    title: "List your Property",
    path: "/list-your-property-for-sale-rent-lease",
  },
  {
    title: "Create Rental Agreement",
    path: "/create-rental-agreement",
  },
];

function NavLinks() {
  const theme = useTheme();
  return (
    <Stack
      ml={4}
      mr="auto"
      sx={{
        display: { xs: "none", md: "flex" },
      }}
      direction="row"
      spacing={3}
      alignItems="center"
    >
      {links.map(({ title, path }) => {
        return (
          <Link href={path} key={path} style={{ position: "relative" }}>
            <Typography
              fontWeight={600}
              fontSize={theme.spacing(2)}
              color={theme.palette.text.secondary}
              sx={{
                transition: "all 0.3s ease",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  width: "100%",
                  transform: "scaleX(0)",
                  height: "2px",
                  bottom: 0,
                  left: 0,
                  backgroundColor: theme.palette.info.main,
                  transformOrigin: "bottom right",
                  transition: "transform 0.25s ease-out",
                },
                "&:hover": {
                  color: theme.palette.text.primary,
                  ":after": {
                    transform: " scaleX(1)",
                    transformOrigin: "bottom left",
                  },
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
