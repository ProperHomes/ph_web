"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import { useAppContext } from "src/appContext";
import Dashboardnav from "./nav";

const GridBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "225px 1fr",
  padding: "1em",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

function DashboardLayout({ children }) {
  const router = useRouter();
  const { state } = useAppContext();
  const isLoggedIn = !!state?.user;

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
      <GridBox>
        <Dashboardnav />
        {children}
      </GridBox>
    </Paper>
  );
}

export default DashboardLayout;
