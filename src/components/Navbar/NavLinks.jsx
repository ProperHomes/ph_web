import Link from "next/link";
import Grow from "@mui/material/Grow";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import TypographyUnderline from "../TypographyUnderline";

const exploreTooltipLinks = [
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

const homeServicesTooltipLinks = [
  { title: "Home Cleaning Services", path: "/home-cleaning-services" },
  { title: "Home AC Repairs Services", path: "/home-repairs-services" },
  { title: "Home Painting Services", path: "/home-painting-services" },
  { title: "Home Plumbing Services", path: "/home-plumbing-services" },
];

const links = [
  {
    title: "Explore Properties",
    path: "/explore-properties",
    tooltipLinks: exploreTooltipLinks,
  },
  {
    title: "List your Property (Free)",
    path: "/list-your-property-for-sale-rent-lease",
    isListingLink: true,
  },
  // {
  //   title: "Home Services",
  //   path: "/home-services",
  //   tooltipLinks: homeServicesTooltipLinks,
  // },
  // {
  //   title: "Manage Rentals",
  //   path: "/property-rental-management-for-owners-managers",
  // },
];

function NavLinks() {
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
      {links.map(({ title, path, tooltipLinks, isListingLink }) => {
        if (tooltipLinks) {
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
                            color: "info.main",
                            fontWeight: 500,
                            "&:hover": { color: "primary.main" },
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
                    backgroundColor: "#fff",
                    border: "1px solid",
                    borderColor: "secondary.main",
                  },
                },
              }}
            >
              <Link href={path} key={path} style={{ position: "relative" }}>
                <TypographyUnderline fontWeight={500} color="info.main">
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
            title={title}
          >
            <TypographyUnderline fontWeight={500} color="info.main">
              {title}
            </TypographyUnderline>
          </Link>
        );
      })}
    </Stack>
  );
}

export default NavLinks;
