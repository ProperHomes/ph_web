"use client";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const Content = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "2em",
  gridTemplateColumns: "1fr 300px",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));
