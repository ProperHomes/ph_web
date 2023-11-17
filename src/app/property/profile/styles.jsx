"use client";
import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";

export const Content = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "4em",
  gridTemplateColumns: "1fr 300px",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const ImageGrid = styled(Box)({
  position: "relative",
  width: "100%",
  height: "auto",
  maxHeight: "560px",
  display: "grid",
  gridGap: "0.25rem",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gridAutoFlow: "row dense",
  overflow: "hidden",
});
