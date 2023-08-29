"use client";
import { Suspense, lazy, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { useAppContext } from "src/appContext";
import usePagination from "src/hooks/usePagination";
import { GET_USER_SAVED_PROPERTIES } from "@/graphql/properties";
import { removeDuplicateObjectsFromArray } from "@/utils/helper";
import Loading from "src/components/Loading";

const PropertyList = lazy(() => import("src/app/property/List"));

function SavedProperties() {
  const { state } = useAppContext();

  const [savedProperties, setSavedProperties] = useState([]);

  const { paginationObj, handleChangePage, loading } = usePagination({
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

  const handleFetchNext = () => {
    handleChangePage(paginationObj.currentPage + 1);
  };

  return loading ? (
    <Loading />
  ) : (
    <InfiniteScroll
      dataLength={savedProperties.length}
      next={handleFetchNext}
      hasMore={paginationObj.pageInfo?.hasNextPage}
      loader={<></>}
      endMessage={<></>}
    >
      <Suspense fallback={<Loading />}>
        <PropertyList data={savedProperties} />
      </Suspense>
    </InfiniteScroll>
  );
}

export default SavedProperties;
