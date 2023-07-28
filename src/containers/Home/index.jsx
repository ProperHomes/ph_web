import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

import PropertyList from "../Properties/List";
import { Typography } from "@mui/material";
import SearchBlock from "@/containers/Home/SearchBlock";

export default function Home({ data }) {
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
        <SearchBlock />
      </Stack>
      <PropertyList
        data={data}
        title="New properties listed in the last 24 hours"
      />
    </>
  );
}
