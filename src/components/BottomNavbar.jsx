"use client";
import { useState } from "react";
import Link from "next/link";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import SaveIcon from "@mui/icons-material/Save";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyIcon from "@mui/icons-material/Key";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import AddIcon from "@mui/icons-material/Add";

import { usePathname, useRouter } from "next/navigation";
import useToggleAuth from "src/hooks/useToggleAuth";

const dashboardTabList = [
  {
    label: "Home",
    href: "/",
    Icon: HomeIcon,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    Icon: DashboardIcon,
  },
  {
    label: "Messages",
    href: "/dashboard/messages",
    Icon: MessageIcon,
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

const homeListLoggedIn = [
  {
    label: "Home",
    href: "/",
    Icon: HomeIcon,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    Icon: DashboardIcon,
  },
  {
    label: "Sell/Rent",
    href: "/list-your-property-for-sale-rent-lease",
    Icon: AddIcon,
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
];

function BottomNavbar() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const pathname = usePathname();
  const { isLoggedIn } = useToggleAuth();
  const isDashboard = pathname.includes("dashboard");
  const [value, setValue] = useState("/home");
  const handleChangeValue = (_event, value) => {
    setValue(value);
  };

  const list = isDashboard
    ? dashboardTabList
    : isLoggedIn
    ? homeListLoggedIn
    : homeList;

  return (
    <Paper
      sx={{
        position: "fixed",
        zIndex: 99,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: "2rem 2rem 0 0",
        display: { xs: "flex", sm: "none" },
        backgroundColor: theme.palette.background.paper,
      }}
      elevation={8}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChangeValue}
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
              value={href}
              icon={<Icon />}
              component={Link}
              href={href}
              sx={{
                fontWeight: 700,
                "&.MuiButtonBase-root.Mui-selected": {
                  fontWeight: 800,
                  color: isDark
                    ? theme.palette.info.main
                    : theme.palette.info.dark,
                  svg: {
                    fill: isDark
                      ? theme.palette.info.main
                      : theme.palette.info.dark,
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

export default BottomNavbar;
