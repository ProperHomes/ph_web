"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import SaveIcon from "@mui/icons-material/Save";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person2";
import SettingsIcon from "@mui/icons-material/Settings";
import CreditCardIcon from "@mui/icons-material/CreditCard";

import BottomNavbar from "src/components/BottomNavbar";
import { useAppContext } from "src/appContext";

let list = [
  {
    label: "Dashboard",
    href: "/dashboard",
    Icon: DashboardIcon,
  },
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
  {
    label: "Membership",
    href: "/dashboard/membership",
    Icon: CreditCardIcon,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    Icon: SettingsIcon,
  },
];

function Dashboardnav() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const pathname = usePathname();
  const { isBuyer, isSeller, isBuyerAndSeller } = useAppContext();
  return (
    <>
      <Stack
        alignItems="flex-start"
        display={{ xs: "none", md: "flex" }}
        spacing={1}
        mr={2}
        px={1}
        sx={{
          borderRight: isDark ? "1px solid #ffffff20" : "1px solid #00000020",
          minHeight: "85vh",
          maxHeight: "85vh",
        }}
      >
        {list.map(({ label, href, Icon }) => {
          let isActive = pathname === href;
          if (label === "Manage Properties") {
            isActive = pathname.includes(href);
          }
          return (
            <Button
              size="large"
              key={href}
              startIcon={<Icon />}
              component={Link}
              href={href}
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
      </Stack>

      <Stack sx={{ display: { xs: "block", md: "none" } }}>
        <BottomNavbar />
      </Stack>
    </>
  );
}

export default Dashboardnav;
