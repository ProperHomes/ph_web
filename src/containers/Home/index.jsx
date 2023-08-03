import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchBlock from "@/containers/Home/SearchBlock";
import PropertyList from "../Properties/List";

export default function Home({ data }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {!isMobile && (
        <Stack px={{ xs: 0, md: 4 }} pb={4} alignItems="center">
          <Typography
            gutterBottom
            color={theme.palette.text.primary}
            fontSize={{ xs: "1.25rem", sm: "1.5rem" }}
            fontFamily={theme.typography.fontFamily.Manrope}
          >
            Find a home that loves you
          </Typography>

          <SearchBlock />
        </Stack>
      )}
      <PropertyList
        data={data}
        title="New properties listed in the last 24 hours"
      />
    </>
  );
}
