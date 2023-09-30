"use client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";

export default function Page() {
  const theme = useTheme();

  const Card = ({ category, value }) => {
    return (
      <Stack
        p={2}
        boxShadow={theme.shadows[2]}
        sx={{
          borderRadius: "1rem",
          maxWidth: { xs: "140px", md: "300px" },
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
      <Stack spacing={3} direction={{ xs: "column", md: "row" }}>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="space-around"
        >
          <Card category="Total Number Of Properties" value={25} />
          <Card category="Total Occupancy Rate" value="92%" />
        </Stack>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="space-around"
        >
          <Card category="Rent Collected This Year" value={34000} />
          <Card category="Rent Collected From The Start" value={25} />
        </Stack>
      </Stack>
    </Box>
  );
}
