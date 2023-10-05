import { client } from "@/graphql/serverClient";
import { GET_PROPERTIES } from "@/graphql/properties";
import PropertyList from "src/app/property/List";

export default async function Page({ searchParams }) {
  const res = await client.request(GET_PROPERTIES, {
    first: 20,
    orderBy: ["CREATED_AT_DESC"],
  });
  const data = res?.properties?.edges?.map((edge) => edge.node) ?? [];
  return (
    <PropertyList
      data={data}
      infiniteScroll
      count={20}
      showFilters
      searchParams={searchParams}
    />
  );
}
