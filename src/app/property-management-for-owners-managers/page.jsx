"use client";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";



export default function PropertyManagement() {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h1"
        fontSize={{ xs: "1.5rem", md: "3rem" }}
        textAlign="center"
      >
        Easiest way to manage your Properties
      </Typography>
    </Box>
  );
}
