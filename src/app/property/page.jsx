import { client } from "@/graphql/serverClient";
import { GET_PROPERTIES } from "@/graphql/properties";
import PropertyList from "src/app/property/List";

export default async function Page() {
  const res = await client.request(GET_PROPERTIES, { first: 20, offset: 0 });
  const data = res?.properties?.nodes ?? [];
  return <PropertyList data={data} />;
}
