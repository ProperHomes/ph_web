"use client";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

export default function ManageProperty({ data }) {
  const theme = useTheme();
  return (
    <Stack spacing={2}>
      <Typography>
        Manage your Property: <b>{data.title}</b>
      </Typography>

    </Stack>
  );
}
