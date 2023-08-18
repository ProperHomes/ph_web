"use client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

export default function Page() {
  const theme = useTheme();

  const Card = ({ category, value, caption }) => {
    return (
      <Stack
        p={2}
        boxShadow={theme.shadows[2]}
        sx={{
          borderRadius: "1rem",
          maxWidth: "300px",
          color: theme.palette.primary.main,
        }}
      >
        <Typography variant="subtitle2">{category}</Typography>
        <Typography
          fontSize="2rem"
          fontWeight={theme.typography.fontWeightBold}
        >
          {value}
        </Typography>
      </Stack>
    );
  };
  return (
    <Box>
      <Stack spacing={3} direction="row">
        <Card category="Total Number Of Properties" value={25} />
        <Card category="Occupancy Rate" value="92%" />
        <Card category="Rent Collected This Year" value={34000} />
        <Card category="Rent Collected From The Start" value={25} />
      </Stack>
    </Box>
  );
}
