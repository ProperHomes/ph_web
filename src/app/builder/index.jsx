import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function BuilderProfile({ data }) {
  const { title } = data ?? {};
  return (
    <Stack>
      <Typography>{title}</Typography>
    </Stack>
  );
}
