"use client";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchBlock from "@/components/SearchBlock";
import PropertyList from "src/app/property/List";
import { useQuery } from "@apollo/client";
import { GET_PROPERTIES_LOGGED_IN } from "@/graphql/properties";
import { useAppContext } from "src/appContext";

export default function Home({ data }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { state } = useAppContext();
  const loggedInUserId = state.user?.id;
  const { data: propertiesData } = useQuery(GET_PROPERTIES_LOGGED_IN, {
    variables: { userId: loggedInUserId, first: 20, offset: 0 },
    skip: !loggedInUserId,
    fetchPolicy: "network-only",
  });

  const list = !!loggedInUserId
    ? propertiesData?.properties?.nodes ?? []
    : data;

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
        data={list}
        title="New properties listed in the last 24 hours"
      />
    </>
  );
}
