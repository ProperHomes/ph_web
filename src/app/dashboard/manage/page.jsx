"use client";

import { useQuery } from "@apollo/client";

import { useAppContext } from "src/appContext";
import { GET_OWNER_PROPERTIES } from "@/graphql/properties";
import PropertyList from "src/app/property/List";
import Loading from "src/components/Loading";

function ManageProperties() {
  const { state } = useAppContext();
  const { data, loading } = useQuery(GET_OWNER_PROPERTIES, {
    variables: { first: 10, offset: 0, ownerId: state.user?.id },
    skip: !state.user?.id,
    fetchPolicy: "network-only",
  });
  const properties = data?.properties?.nodes ?? [];
  return loading ? <Loading /> : <PropertyList data={properties} />;
}

export default ManageProperties;
