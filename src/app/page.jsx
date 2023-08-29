import { client } from "@/graphql/serverClient";
import { GET_PROPERTIES } from "@/graphql/properties";
import Home from "./Home";

export default async function Page() {
  const res = await client.request(GET_PROPERTIES, { first: 10 });
  const data = res?.properties?.edges?.map((edge) => edge.node) ?? [];
  return <Home data={data} />;
}
