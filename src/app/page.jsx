import Home from "./Home";
import { client } from "@/graphql/serverClient";
import { GET_PROPERTIES } from "@/graphql/properties";

export default async function Page({ searchParams }) {
  const res = await client.request(GET_PROPERTIES, {
    first: 10,
    orderBy: ["CREATED_AT_DESC"],
  });
  const data = res?.properties?.edges?.map((edge) => edge.node) ?? [];
  return <Home data={data} searchParams={searchParams} />;
}
