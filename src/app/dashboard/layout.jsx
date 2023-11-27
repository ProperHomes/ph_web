"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import styled from "@mui/material/styles/styled";
import MenuIcon from "@mui/icons-material/Menu";

import { useAppContext } from "src/appContext";
import Dashboardnav from "./nav";
import SlideDrawer from "@/components/Drawer";

const GridBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "225px 1fr",
  padding: "1em",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

function DashboardLayout({ children }) {
  const router = useRouter();
  const { state } = useAppContext();
  const isLoggedIn = !!state?.user;

  const [showDrawer, setShowDrawer] = useState(false);
  const toggleDrawer = () => {
    setShowDrawer((prev) => !prev);
  };

  // Todo: use middleware ?
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isLoggedIn) {
        router.push("/");
      }
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [isLoggedIn, router]);

  return (
    <Paper sx={{ borderRadius: "1em", minHeight: "85vh" }}>
      <Stack
        sx={{ display: { xs: "flex", sm: "none" } }}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          size="large"
          variant="contained"
          color="info"
          onClick={toggleDrawer}
          startIcon={<MenuIcon />}
          sx={{ maxWidth: "300px" }}
        >
          View Dashboard Menu
        </Button>
      </Stack>
      <GridBox>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Dashboardnav />
        </Box>
        {children}
      </GridBox>

      <Box sx={{ display: { xs: "flex", sm: "none" } }}>
        <SlideDrawer open={showDrawer} handleClose={toggleDrawer} title={""}>
          <Dashboardnav toggleDrawer={toggleDrawer} />
        </SlideDrawer>
      </Box>
    </Paper>
  );
}

export default DashboardLayout;
