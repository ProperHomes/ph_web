"use client";
import { Suspense, lazy, useState } from "react";
import Stack from "@mui/material/Stack";
import InfiniteScroll from "react-infinite-scroll-component";

import { useAppContext } from "src/appContext";
import usePagination from "src/hooks/usePagination";
import { GET_USER_SAVED_PROPERTIES } from "@/graphql/properties";
import { removeDuplicateObjectsFromArray } from "@/utils/helper";
import ListSkeleton from "@/components/ListSkeleton";

const PropertyList = lazy(() => import("src/app/property/List/index"));

function SavedProperties() {
  const { state } = useAppContext();

  const [savedProperties, setSavedProperties] = useState([]);

  const { paginationObj, handleLoadNext } = usePagination({
    key: "savedProperties",
    QUERY: GET_USER_SAVED_PROPERTIES,
    querySkip: !state.user?.id,
    variables: { first: 10, userId: state.user?.id },
    onNewData: (data) => {
      const list = data.map((s) => {
        return {
          ...s.property,
          currentUserSavedProperties: {
            nodes: [{ id: s.id }],
          },
        };
      });
      setSavedProperties((prev) =>
        removeDuplicateObjectsFromArray([...prev, ...list])
      );
    },
  });

  return (
    <InfiniteScroll
      dataLength={savedProperties.length}
      next={handleLoadNext}
      hasMore={paginationObj.pageInfo?.hasNextPage}
      loader={<ListSkeleton n={8} />}
      endMessage={<></>}
    >
      <Suspense fallback={<></>}>
        <Stack spacing={4} sx={{ overflow: "hidden" }}>
          <PropertyList data={savedProperties} />
        </Stack>
      </Suspense>
    </InfiniteScroll>
  );
}

export default SavedProperties;
