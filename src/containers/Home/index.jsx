import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

import SearchInput from "@/components/Navbar/SearchInput";
import PropertyList from "../Properties/List";
import { Typography } from "@mui/material";

export default function Home() {
  const theme = useTheme();
  return (
    <>
      <Stack px={{ xs: 0, md: 4 }} pb={4} alignItems="center">
        <Typography
          gutterBottom
          fontSize={{ xs: "1.25rem", sm: "1.5rem" }}
          fontFamily={theme.typography.fontFamily.Manrope}
        >
          India&apos;s authentic real estate platform
        </Typography>
        <SearchInput />
      </Stack>
      <PropertyList title="New properties listed in the last 24 hours" />
    </>
  );
}
