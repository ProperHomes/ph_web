"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";

import SaveIcon from "@mui/icons-material/Save";
import PaidIcon from "@mui/icons-material/Paid";
import PersonIcon from "@mui/icons-material/Person2";
import SettingsIcon from "@mui/icons-material/Settings";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AddIcon from "@mui/icons-material/Add";
import AnalyticsIcon from "@mui/icons-material/Analytics";

import { useAppContext } from "src/appContext";

const BottomNavbar = dynamic(() => import("src/components/BottomNavbar"), {
  ssr: false,
});

let list = [
  {
    label: "Manage Properties",
    href: "/dashboard/manage",
    Icon: PersonIcon,
  },
  {
    label: "Saved Properties",
    href: "/dashboard/saved-properties",
    Icon: SaveIcon,
  },
  // {
  //   label: "Payments",
  //   href: "/dashboard/subscription", // Todo: should be /payments
  //   Icon: CreditCardIcon,
  // },
  {
    label: "Settings",
    href: "/dashboard/settings",
    Icon: SettingsIcon,
  },
];

function Dashboardnav({ toggleDrawer, inDrawer }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const pathname = usePathname();
  const { state } = useAppContext();

  const isBuilderEmployee = state?.user?.builderEmployees?.totalCount >= 1;
  const propertyOwnerOrSeller = state?.user?.properties?.totalCount >= 1;
  const showAnalytics = isBuilderEmployee || propertyOwnerOrSeller;

  let navList = list;
  if (showAnalytics) {
    navList = [
      {
        label: "Analytics",
        href: "/dashboard/analytics",
        Icon: AnalyticsIcon,
      },
      ...navList,
    ];
  }
  if (state?.user?.isSysAdmin) {
    navList = [
      {
        label: "SysAdmin",
        href: "/dashboard/sysadmin",
        Icon: PersonIcon,
      },
      ...navList,
    ];
  }
  if (state?.user?.isAffiliate) {
    navList = [
      {
        label: "Affiliate",
        href: "/dashboard/affiliate",
        Icon: PaidIcon,
      },
      ,
      ...navList,
    ];
  }

  const handleClick = () => {
    if (toggleDrawer) {
      toggleDrawer();
    }
  };

  return (
    <>
      <Stack
        alignItems="flex-start"
        spacing={1}
        mr={2}
        px={1}
        sx={{
          borderRight: inDrawer
            ? "none"
            : isDark
            ? "1px solid #ffffff20"
            : "1px solid #00000020",
          minHeight: "85vh",
          maxHeight: "85vh",
        }}
      >
        {navList.map(({ label, href, Icon }) => {
          let isActive = pathname === href;
          if (label === "Manage Properties") {
            isActive = pathname.includes(href);
          }
          return (
            <Button
              aria-label={label}
              size="large"
              key={href}
              startIcon={<Icon />}
              component={Link}
              href={href}
              onClick={handleClick}
              sx={{
                color: isActive
                  ? theme.palette.info.main
                  : isDark
                  ? theme.palette.text.secondary
                  : "#000",
              }}
            >
              {label}
            </Button>
          );
        })}

        <Stack py={4} spacing={1} alignItems="flex-start">
          {!isBuilderEmployee && (
            <Button
              size="large"
              startIcon={<AddIcon />}
              component={Link}
              href="/dashboard/create-builder"
              sx={{
                color: isDark ? theme.palette.text.secondary : "#000",
              }}
              onClick={handleClick}
            >
              Create Builder Profile
            </Button>
          )}

          <Button
            size="large"
            startIcon={<AddIcon />}
            component={Link}
            href="/dashboard/create-project"
            sx={{
              color: isDark ? theme.palette.text.secondary : "#000",
            }}
            onClick={handleClick}
          >
            Create Project Profile
          </Button>

          <Button
            size="large"
            startIcon={<AddIcon />}
            component={Link}
            href="/dashboard/list-property"
            sx={{
              color: isDark ? theme.palette.text.secondary : "#000",
            }}
            onClick={handleClick}
          >
            Add Your Property
          </Button>
          <Button
            size="large"
            startIcon={<AddIcon />}
            component={Link}
            href="/dashboard/create-rental-agreement"
            sx={{
              color: isDark ? theme.palette.text.secondary : "#000",
            }}
            onClick={handleClick}
          >
            Create Rental Agreement
          </Button>

          <Button
            size="large"
            startIcon={<AddIcon />}
            component={Link}
            href="/dashboard/create-rental-receipt"
            sx={{
              color: isDark ? theme.palette.text.secondary : "#000",
            }}
            onClick={handleClick}
          >
            Generate Rent Receipt
          </Button>
        </Stack>
      </Stack>

      <Stack sx={{ display: { xs: "block", md: "none" } }}>
        <BottomNavbar />
      </Stack>
    </>
  );
}

export default Dashboardnav;
