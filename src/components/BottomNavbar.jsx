import { useState } from "react";
import Link from "next/link";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

import HomeIcon from "@mui/icons-material/HomeOutlined";
import SaveIcon from "@mui/icons-material/Save";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyIcon from "@mui/icons-material/Key";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import AddIcon from "@mui/icons-material/Add";

import { useRouter } from "next/router";
import useToggleAuth from "@/utils/hooks/useToggleAuth";

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
  const router = useRouter();
  const { isLoggedIn } = useToggleAuth();
  const isDashboard = router.pathname.includes("dashboard");
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
      sx={{ position: "fixed", zIndex: 99, bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels value={value} onChange={handleChangeValue}>
        {list.map(({ label, Icon, href }) => {
          return (
            <BottomNavigationAction
              key={href}
              label={label}
              value={href}
              icon={<Icon />}
              component={Link}
              href={href}
            />
          );
        })}
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNavbar;
