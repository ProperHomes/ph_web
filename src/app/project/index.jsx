import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

export default function ProjectProfile({ data }) {
  const { title } = data ?? {};
  return (
    <Stack>
      <Typography>{title}</Typography>
    </Stack>
  );
}
