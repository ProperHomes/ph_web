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
      <Stack px={{ xs: 0, md: 4 }} pb={4} alignItems="center">
        <Typography
          color={theme.palette.text.primary}
          fontSize={{ xs: "1.25rem", sm: "1.5rem" }}
          fontFamily={theme.typography.fontFamily.Manrope}
        >
          Find a home that{" "}
          <span
            style={{
              fontWeight: "700",
              fontStyle: "italic",
              fontFamily: theme.typography.fontFamily.Raleway,
              color: theme.palette.info.main,
            }}
          >
            loves
          </span>{" "}
          you
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
