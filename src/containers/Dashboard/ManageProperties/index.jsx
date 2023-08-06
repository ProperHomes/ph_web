import { useQuery } from "@apollo/client";

import { useAppContext } from "src/appContext";
import { GET_OWNER_PROPERTIES } from "@/containers/Properties/graphql";
import PropertyList from "@/containers/Properties/List";
import Loading from "@/components/Loading";

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
