"use client";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";

import PropertyList from "src/app/property/List";
import Loading from "src/components/Loading";
import { useAppContext } from "src/appContext";
import { GET_USER_SAVED_PROPERTIES } from "@/graphql/properties";

function SavedProperties() {
    const [page, setPage] = useState(0);
  const { state } = useAppContext();
  
  const { data, loading } = useQuery(GET_USER_SAVED_PROPERTIES, {
    variables: { first: 10, offset: page * 10, userId: state.user?.id },
    skip: !state.user?.id,
    fetchPolicy: "network-only",
  });
  const savedProperties = (data?.savedProperties?.nodes ?? []).map((s) => {
    return {
      ...s.property,
      currentUserSavedProperties: {
        nodes: [{ id: s.id }],
      },
    };
  });

  const handleFetchNext = () => {
    setPage((prev) => prev + 1);
  };
  return loading ? (
    <Loading />
  ) : (
    <InfiniteScroll
      dataLength={savedProperties.length}
      next={handleFetchNext}
      hasMore={data?.savedProperties?.totalCount > savedProperties.length}
      loader={<></>}
      endMessage={<></>}
    >
      <PropertyList data={savedProperties} />
    </InfiniteScroll>
  );
}

export default SavedProperties;
