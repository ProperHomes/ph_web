"use client";
import Stack from "@mui/material/Stack";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";

import { GET_PROPERTIES, GET_PROPERTIES_LOGGED_IN } from "@/graphql/properties";
import { useAppContext } from "src/appContext";
import SearchBlock from "@/components/SearchBlock";
import CategoryBoxes from "@/components/CategoryBoxes";
import ZeroBoxes from "@/components/ZeroBoxes";
import { useQuery } from "@apollo/client";
import dynamic from "next/dynamic";

const PropertyList = dynamic(() => import("../property/List"), { ssr: false });

export default function Home() {
  const theme = useTheme();
  const { state } = useAppContext();
  const loggedInUserId = state.user?.id;
  const { data } = useQuery(
    loggedInUserId ? GET_PROPERTIES_LOGGED_IN : GET_PROPERTIES,
    {
      variables: {
        userId: loggedInUserId,
        first: 10,
        orderBy: ["CREATED_AT_DESC"],
      },
    }
  );
  const list = data?.properties?.edges?.map((edge) => edge.node) ?? [];
  return (
    <>
      <Stack spacing={4} py={4} alignItems="center">
        <Stack spacing={1} px={{ xs: 0, md: 4 }} alignItems="center">
          <Typography variant="h4">
            Find a home that{" "}
            <span
              style={{
                fontSize: "2.5rem",
                fontFamily: theme.typography.fontFamily.Damion,
                color: theme.palette.info.main,
              }}
            >
              loves you
            </span>{" "}
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
