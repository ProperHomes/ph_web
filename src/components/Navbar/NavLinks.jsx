"use client";
import Link from "next/link";
import Chip from "@mui/material/Chip";
import Grow from "@mui/material/Grow";
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
    title: "List your Property",
    path: "/list-your-property-for-sale-rent-lease",
    isListingLink: true,
  },
  {
    title: "Manage Rentals",
    path: "/property-rental-management-for-owners-managers",
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
  const isDarkMode = theme.palette.mode === "dark";
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
      {links.map(({ title, path, showDropdownMenu, isListingLink }) => {
        if (showDropdownMenu) {
          return (
            <Tooltip
              key={path}
              disableFocusListener
              TransitionComponent={Grow}
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
                        prefetch={false}
                        style={{ position: "relative", width: "fit-content" }}
                      >
                        <Typography
                          sx={{
                            color: theme.palette.text.primary,
                            fontWeight: 600,
                            "&:hover": { color: theme.palette.info.main },
                          }}
                        >
                          {l.title}
                        </Typography>
                      </Link>
                    );
                  })}
                </Stack>
              }
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: isDarkMode
                      ? theme.palette.common.black
                      : theme.palette.common.white,
                    boxShadow: theme.shadows[2],
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
          <Link
            href={path}
            key={path}
            style={{ position: "relative" }}
            prefetch={false}
          >
            <TypographyUnderline
              fontWeight={600}
              fontSize={theme.spacing(2)}
              color={theme.palette.text.secondary}
            >
              {title}
            </TypographyUnderline>
            {isListingLink && (
              <Chip
                size="small"
                label="Free"
                color="info"
                sx={{ position: "absolute", top: 20, right: -10 }}
              />
            )}
          </Link>
        );
      })}
    </Stack>
  );
}

export default NavLinks;
