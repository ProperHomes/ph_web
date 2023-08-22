"use client";
import { useState, Suspense, lazy } from "react";
import { useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import Typography from "@mui/material/Typography";

import { useAppContext } from "src/appContext";
import { GET_OWNER_PROPERTIES } from "@/graphql/properties";
import Loading from "src/components/Loading";

const PropertyList = lazy(() => import("src/app/property/List"));

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
    <>
      <Typography fontWeight={600} gutterBottom fontSize="1.2rem">
        Manage your properties
      </Typography>
      <br />
      <InfiniteScroll
        dataLength={properties.length}
        next={handleFetchNext}
        hasMore={data?.properties?.totalCount > properties.length}
        loader={<></>}
        endMessage={<></>}
      >
        <Suspense fallback={<Loading />}>
          <PropertyList data={properties} />
        </Suspense>
      </InfiniteScroll>
    </>
  );
}

export default ManageProperties;
