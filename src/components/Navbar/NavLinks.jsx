"use client";
import Link from "next/link";
import Zoom from "@mui/material/Zoom";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import TypographyUnderline from "../TypographyUnderline";

const links = [
  {
    title: "Explore Properties",
    path: "/explore-properties",
    showDropdownMenu: true,
  },
  {
    title: "Manage Rentals",
    path: "/property-rental-management-for-owners-managers",
  },
  {
    title: "List your Property",
    path: "/list-your-property-for-sale-rent-lease",
  },
];

const tooltipLinks = [
  {
    title: "Properties For Sale",
    path: "/properties-for-sale",
    showDropdownMenu: true,
  },
  {
    title: "Properties For Rent",
    path: "/properties-for-rent",
  },
  {
    title: "Properties For Lease",
    path: "/properties-for-lease",
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
      {links.map(({ title, path, showDropdownMenu }) => {
        if (showDropdownMenu) {
          return (
            <Tooltip
              arrow
              key={path}
              disableFocusListener
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 250 }}
              title={
                <Stack
                  p={2}
                  spacing={1}
                  divider={<Divider orientation="vertical" />}
                  sx={{
                    width: "200px",
                    height: "100%",
                  }}
                >
                  {tooltipLinks.map((l) => {
                    return (
                      <Link
                        href={l.path}
                        key={l.path}
                        style={{ position: "relative", width: "fit-content" }}
                      >
                        <Typography
                          sx={{ "&:hover": { color: theme.palette.info.main } }}
                        >
                          {l.title}
                        </Typography>
                      </Link>
                    );
                  })}
                </Stack>
              }
              componentsProps={{
                arrow: {
                  sx: {
                    color: theme.palette.common.black,
                  },
                },
                tooltip: {
                  sx: {
                    backgroundColor: theme.palette.common.black,
                  },
                },
              }}
            >
              <Link href={path} key={path} style={{ position: "relative" }}>
                <TypographyUnderline
                  fontWeight={600}
                  fontSize={theme.spacing(2)}
                  color={theme.palette.text.secondary}
                >
                  {title}
                </TypographyUnderline>
              </Link>
            </Tooltip>
          );
        }
        return (
          <Link href={path} key={path} style={{ position: "relative" }}>
            <TypographyUnderline
              fontWeight={600}
              fontSize={theme.spacing(2)}
              color={theme.palette.text.secondary}
            >
              {title}
            </TypographyUnderline>
          </Link>
        );
      })}
    </Stack>
  );
}

export default NavLinks;
