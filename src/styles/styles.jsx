"use client";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import styled from "@mui/material/styles/styled";

export const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff",
  borderRadius: "1em",
  minHeight: "100vh",
}));

export const InfoStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  height: "auto",
  borderRadius: "1rem",
  border: `1px solid ${theme.palette.background.secondary}`,
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.mode === "dark" ? "#0e0e0e" : "#fafafa2c",
}));
