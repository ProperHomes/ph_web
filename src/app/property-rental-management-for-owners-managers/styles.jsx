"use client";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff",
  borderRadius: "1em",
}));

export const InfoStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  height: "auto",
  borderRadius: "1rem",
  border: "1px solid #3c27b012",
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.mode === 'dark' ? "#0e0e0e" : "#fafafa2c"
}));
