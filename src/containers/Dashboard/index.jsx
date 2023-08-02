import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
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
import Main from "./Main";
import Messages from "./Messages";
import Settings from "./Settings";
import Subscriptions from "./Subscriptions";
import SavedProperties from "./SavedProperties";
import ManageProperties from "./ManageProperties";
import BottomNavbar from "@/components/BottomNavbar";

const tabSections = [
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
    label: "Subscriptions",
    href: "/dashboard/subscriptions",
    Component: Subscriptions,
    Icon: CreditCardIcon,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    Component: Settings,
    Icon: SettingsIcon,
  },
];

function Dashboard() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { isBuyer, state } = useAppContext();

  useEffect(() => {
    if (!state.user) {
      router.push("/");
    }
  }, [state.user]);

  const list = tabSections;
  const index = list.findIndex((t) => t.href === router.pathname);
  const { Component, label } = list[index];

  return (
    <Stack spacing={2}>
      {!isMobile && (
        <>
          <Container maxWidth="lg">
            <AppBar position="static" sx={{ borderRadius: "1em" }}>
              <Tabs
                centered
                variant="fullWidth"
                value={index}
                indicatorColor="secondary"
                textColor="inherit"
                aria-label="dashboard tabs"
              >
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
              </Tabs>
            </AppBar>
          </Container>
        </>
      )}
      {isMobile && <BottomNavbar />}
      <Component />
    </Stack>
  );
}

export default Dashboard;
