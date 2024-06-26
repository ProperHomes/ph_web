"use client";
import { useEffect, useState, memo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import useTheme from "@mui/material/styles/useTheme";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import SaveIcon from "@mui/icons-material/Save";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyIcon from "@mui/icons-material/Key";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person2";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const dashboardTabList = [
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    Icon: AnalyticsIcon,
  },
  {
    label: "Manage",
    href: "/dashboard/manage",
    Icon: PersonIcon,
  },
  {
    label: "Saved",
    href: "/dashboard/saved-properties",
    Icon: SaveIcon,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    Icon: SettingsIcon,
  },
];

const homeList = [
  {
    label: "Home",
    href: "/",
    Icon: HomeIcon,
  },
  {
    label: "For Sale",
    href: "/properties-for-sale",
    Icon: LoyaltyIcon,
  },
  {
    label: "For Rent",
    href: "/properties-for-rent",
    Icon: KeyIcon,
  },
  {
    label: "Sell/Rent",
    href: "/list-your-property-for-sale-rent-lease",
    Icon: AddIcon,
  },
];

function BottomNavbar() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const pathname = usePathname();
  const isDashboardOrSettings =
    pathname.includes("/dashboard") || pathname.includes("/settings");
  const [value, setValue] = useState("/home");

  useEffect(() => {
    setValue(pathname);
  }, [pathname]);

  const list = isDashboardOrSettings ? dashboardTabList : homeList;

  return (
    <Paper
      sx={{
        position: "fixed",
        zIndex: 99,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: "2rem 2rem 0 0",
        display: { xs: "flex", md: "none" },
        backgroundColor: theme.palette.background.paper,
      }}
      elevation={8}
    >
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          borderRadius: "2rem 2rem 0 0",
          height: "4.5em",
          width: "100%",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {list.map(({ label, Icon, href }) => {
          return (
            <BottomNavigationAction
              key={href}
              label={label}
              aria-label={label}
              value={href}
              icon={<Icon />}
              component={Link}
              href={href}
              sx={{
                fontWeight: 700,
                "&.MuiButtonBase-root.Mui-selected": {
                  fontWeight: 800,
                  color: theme.palette.orange.main,
                  svg: {
                    fill: theme.palette.orange.main,
                  },
                },
              }}
            />
          );
        })}
      </BottomNavigation>
    </Paper>
  );
}

export default memo(BottomNavbar);
