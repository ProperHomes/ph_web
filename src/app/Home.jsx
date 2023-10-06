"use client";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";

import PropertyList from "./property/List";
import { GET_PROPERTIES_LOGGED_IN } from "@/graphql/properties";
import usePagination from "src/hooks/usePagination";
import { useAppContext } from "src/appContext";
import SearchBlock from "@/components/SearchBlock";
import CategoryBoxes from "@/components/CategoryBoxes";
import ZeroBoxes from "@/components/ZeroBoxes";

export default function Home({ data }) {
  const theme = useTheme();
  const { state } = useAppContext();
  const loggedInUserId = state.user?.id;

  const { queryData } = usePagination({
    key: "properties",
    QUERY: GET_PROPERTIES_LOGGED_IN,
    querySkip: !loggedInUserId,
    variables: {
      userId: loggedInUserId,
      first: 10,
      orderBy: ["CREATED_AT_DESC"],
    },
    onNewData: () => null,
  });

  const list = !!loggedInUserId
    ? queryData?.properties?.edges?.map((edge) => edge.node) ?? []
    : data;

  return (
    <>
      <Stack spacing={4} py={4} mb={{ xs: 0, md: 1 }} alignItems="center">
        <Stack spacing={1} px={{ xs: 0, md: 4 }} alignItems="center">
          <Typography color="error" gutterBottom>
            We are still under development. Thank you.
          </Typography>
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

        <CategoryBoxes />

        {!loggedInUserId && (
          <Stack display={{ xs: "none", md: "flex" }}>
            <ZeroBoxes />
          </Stack>
        )}
      </Stack>

      <PropertyList
        data={list}
        viewMoreLink="/new-properties-for-sale-rent-lease"
        title="New properties listed in the last 24 hours"
      />
    </>
  );
}
