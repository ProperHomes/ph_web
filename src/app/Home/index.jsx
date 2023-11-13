"use client";
import { useQuery } from "@apollo/client";

import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";

import { GET_PROPERTIES_LOGGED_IN } from "@/graphql/properties";
import { useAppContext } from "src/appContext";
import PropertyList from "src/app/property/List";
import SearchBlock from "@/components/SearchBlock";
import CategoryBoxes from "@/components/CategoryBoxes";
import ZeroBoxes from "@/components/ZeroBoxes";

export default function Home({ data }) {
  const theme = useTheme();
  const { state } = useAppContext();
  const loggedInUserId = state.user?.id;
  const { data: properties } = useQuery(GET_PROPERTIES_LOGGED_IN, {
    variables: {
      userId: loggedInUserId,
      first: 10,
      orderBy: ["CREATED_AT_DESC"],
    },
    skip: !loggedInUserId,
  });
  const list = !!loggedInUserId
    ? properties?.properties?.edges?.map((edge) => edge.node) ?? data
    : data;

  return (
    <>
      <Stack spacing={4} py={4} alignItems="center">
        <Stack spacing={1} px={{ xs: 0, md: 4 }} alignItems="center">
          <Typography variant="h2">
            Find a home that{" "}
            <span
              style={{
                fontSize: "2.5rem",
                fontFamily: theme.typography.fontFamily.Damion,
                color: theme.palette.info.main,
              }}
            >
              loves you
            </span>
          </Typography>
          <SearchBlock />
        </Stack>
        <CategoryBoxes />
        <Stack display={{ xs: "none", md: "flex" }}>
          <ZeroBoxes />
        </Stack>
      </Stack>
      <PropertyList
        data={list}
        showSkeleton={list.length === 0}
        viewMoreLink="/new-properties-for-sale-rent-lease"
        title="Recently Added Properties"
      />
    </>
  );
}
