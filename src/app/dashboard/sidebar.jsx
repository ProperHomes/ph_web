"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SaveIcon from "@mui/icons-material/Save";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import CreditCardIcon from "@mui/icons-material/CreditCard";

import { useAppContext } from "src/appContext";
import BottomNavbar from "src/components/BottomNavbar";

const tabSections = [
  {
    label: "Dashboard",
    href: "/dashboard",
    Icon: DashboardIcon,
  },
  {
    label: "Manage",
    href: "/dashboard/manage",
    Icon: PersonPinIcon,
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
    label: "Subscriptions",
    href: "/dashboard/subscriptions",
    Icon: CreditCardIcon,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    Icon: SettingsIcon,
  },
];

function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { isBuyer, state } = useAppContext();

  useEffect(() => {
    if (!state.user) {
      router.push("/");
    }
  }, [state.user]);

  const list = tabSections;
  const index = list.findIndex((t) => t.href === pathname);

  return (
    <>
      {!isMobile && (
        <Stack>
          {list.map(({ label, href, Icon }) => (
            <Tab
              key={href}
              icon={<Icon />}
              iconPosition="start"
              label={label}
              component={Link}
              href={href}
            />
          ))}
        </Stack>
      )}
      {isMobile && <BottomNavbar />}
    </>
  );
}

export default DashboardSidebar;
