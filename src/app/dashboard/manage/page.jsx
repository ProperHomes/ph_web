"use client";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";

import { useAppContext } from "src/appContext";
import { GET_OWNER_PROPERTIES } from "@/graphql/properties";
import PropertyList from "src/app/property/List";
import Loading from "src/components/Loading";

function ManageProperties() {
  const [page, setPage] = useState(0);
  const { state } = useAppContext();

  const { data, loading } = useQuery(GET_OWNER_PROPERTIES, {
    variables: { first: 10, offset: page * 10, ownerId: state.user?.id },
    skip: !state.user?.id,
    fetchPolicy: "network-only",
  });
  const properties = data?.properties?.nodes ?? [];

  const handleFetchNext = () => {
    setPage((prev) => prev + 1);
  };

  return loading ? (
    <Loading />
  ) : (
    <InfiniteScroll
      dataLength={properties.length}
      next={handleFetchNext}
      hasMore={data?.properties?.totalCount > properties.length}
      loader={<></>}
      endMessage={<></>}
    >
      <PropertyList data={properties} />
    </InfiniteScroll>
  );
}

export default ManageProperties;
