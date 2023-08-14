"use client";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

export default function ManageProperty({ data }) {
  const theme = useTheme();
  return <Typography>Manage you single proerty here: {data.title}</Typography>;
}
