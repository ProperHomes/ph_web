import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import SaveIcon from "@mui/icons-material/Save";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonPinIcon from "@mui/icons-material/PersonPin";

import Main from "@/containers/Dashboard/Main";
import Messages from "@/containers/Dashboard/Messages";
import Settings from "@/containers/Dashboard/Settings";
import SavedProperties from "@/containers/Dashboard/SavedProperties";
import ManageProperties from "@/containers/Dashboard/ManageProperties";

const mobileTabList = [
  {
    label: "Dashboard",
    href: "/dashboard",
    Component: Main,
    Icon: DashboardIcon,
  },
  {
    label: "Manage",
    href: "/dashboard/manage-properties",
    Component: ManageProperties,
    Icon: PersonPinIcon,
  },
  {
    label: "Messages",
    href: "/dashboard/messages",
    Component: Messages,
    Icon: MessageIcon,
  },
  {
    label: "Saved",
    href: "/dashboard/saved-properties",
    Component: SavedProperties,
    Icon: SaveIcon,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    Component: Settings,
    Icon: SettingsIcon,
  },
];

function BottomNavbar() {
  const [value, setValue] = useState("/dashboard");
  const handleChangeValue = (_event, value) => {
    setValue(value);
  };
  return (
    <Paper
      sx={{ position: "fixed", zIndex: 99, bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChangeValue}>
        {mobileTabList.map(({ label, Icon, href }) => {
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
