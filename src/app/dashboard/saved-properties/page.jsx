"use client";

import { useQuery } from "@apollo/client";
import PropertyList from "src/app/property/List";
import Loading from "src/components/Loading";
import { useAppContext } from "src/appContext";
import { GET_USER_SAVED_PROPERTIES } from "@/graphql/properties";

function SavedProperties() {
  const { state } = useAppContext();
  const { data, loading } = useQuery(GET_USER_SAVED_PROPERTIES, {
    variables: { first: 10, offset: 0, userId: state.user?.id },
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
  return loading ? <Loading /> : <PropertyList data={savedProperties} />;
}

export default SavedProperties;
