"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SaveIcon from "@mui/icons-material/Save";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person2";

import BottomNavbar from "src/components/BottomNavbar";
import { useAppContext } from "src/appContext";

function Dashboardnav() {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { isBuyer, isSeller, isBuyerAndSeller } = useAppContext();

  let list = [
    {
      label: "Dashboard",
      href: "/dashboard",
      Icon: DashboardIcon,
    },
  ];

  if (!isBuyer) {
    list = [
      ...list,
      {
        label: "Manage",
        href: "/dashboard/manage",
        Icon: PersonIcon,
      },
    ];
  } else {
    list = [
      ...list,
      {
        label: "Saved",
        href: "/dashboard/saved-properties",
        Icon: SaveIcon,
      },
    ];
  }

  const index = list.findIndex((t) => {
    if (t.label === "Manage") {
      return pathname.includes(t.href);
    }
    return t.href === pathname;
  });

  return (
    <Container maxWidth="lg">
      {!isMobile && (
        <Tabs
          value={index}
          textColor="inherit"
          indicatorColor="inherit"
          aria-label="dashboard tabs"
        >
          {list.map(({ label, href, Icon }) => {
            return (
              <Tab
                key={href}
                icon={<Icon />}
                iconPosition="start"
                label={<Typography fontSize="large">{label}</Typography>}
                component={Link}
                href={href}
                sx={{
                  minHeight: "3.5em",
                  maxHeight: "3.5em",
                }}
              />
            );
          })}
        </Tabs>
      )}

      {isMobile && <BottomNavbar />}
    </Container>
  );
}

export default Dashboardnav;
