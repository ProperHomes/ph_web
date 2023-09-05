"use client";
import { useState, Suspense, lazy } from "react";
import { useQuery } from "@apollo/client";
import Pagination from "@mui/material/Pagination";

import { useAppContext } from "src/appContext";
import {
  GET_OWNER_PROPERTIES,
  GET_TENANT_PROPERTY,
} from "@/graphql/properties";
import Loading from "src/components/Loading";

const PropertyList = lazy(() => import("src/app/property/List"));

function ManageProperties() {
  const [page, setPage] = useState(0);
  const { state } = useAppContext();

  const {
    data: ownerProperties,
    loading,
    refetch,
  } = useQuery(GET_OWNER_PROPERTIES, {
    variables: { first: 10, offset: page * 10, ownerId: state.user?.id },
    skip: !state.user?.id,
    fetchPolicy: "network-only",
  });

  const { data } = useQuery(GET_TENANT_PROPERTY, {
    variables: { first: 1, tenantId: state.user?.id },
    skip: !state.user?.id,
    fetchPolicy: "network-only",
  });

  let properties = ownerProperties?.properties?.nodes ?? [];
  const tenantProperty = data?.properties?.nodes?.[0];
  properties = [...properties, tenantProperty].filter((x) => x);

  const handleFetchNext = (_e, newPage) => {
    setPage(newPage);
  };

  const totalCount = ownerProperties?.properties?.totalCount;

  return loading ? (
    <Loading />
  ) : (
    <Suspense fallback={<Loading />}>
      <PropertyList data={properties} onCloseEditor={refetch} />
      {totalCount > 10 && (
        <Stack alignItems="center" justifyContent="center">
          <Pagination
            page={page + 1}
            onChange={handleFetchNext}
            count={Math.floor(totalCount / 10)}
          />
        </Stack>
      )}
    </Suspense>
  );
}

export default ManageProperties;
