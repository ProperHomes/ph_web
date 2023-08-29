"use client";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import PropertyList from "./property/List";
import { useQuery } from "@apollo/client";
import { GET_PROPERTIES_LOGGED_IN } from "@/graphql/properties";
import { useAppContext } from "src/appContext";
import SearchBlock from "@/components/SearchBlock";

export default function Home({ data }) {
  const theme = useTheme();
  const { state } = useAppContext();
  const loggedInUserId = state.user?.id;

  const { data: propertiesData } = useQuery(GET_PROPERTIES_LOGGED_IN, {
    variables: { userId: loggedInUserId, first: 10 },
    skip: !loggedInUserId,
    fetchPolicy: "network-only",
  });

  const list = !!loggedInUserId
    ? propertiesData?.properties?.nodes ?? []
    : data;

  return (
    <>
      <Stack spacing={1} px={{ xs: 0, md: 4 }} py={2} alignItems="center">
        <Typography color={theme.palette.text.primary} variant="h4">
          Find a home that{" "}
          <span
            style={{
              fontWeight: "700",
              fontStyle: "italic",
              fontFamily: theme.typography.fontFamily.Raleway,
              color: theme.palette.info.main,
            }}
          >
            loves you
          </span>{" "}
        </Typography>

        <SearchBlock />
      </Stack>

      <PropertyList
        data={list}
        viewAllLink="/new-properties-for-sale-rent-lease"
        title="New properties listed in the last 24 hours"
      />
    </>
  );
}
