import { client } from "@/graphql/serverClient";
import { GET_ALL_PROPERTIES_FOR_STATIC_PATHS } from "@/graphql/properties";
import ManageProperty from "./index";

export default async function Page({ params }) {
  return <ManageProperty slug={params.slug} />;
}

export async function generateStaticParams() {
  let res = await client.request(GET_ALL_PROPERTIES_FOR_STATIC_PATHS);
  const properties = res?.properties?.nodes ?? [];
  return properties.map(({ slug }) => {
    return { slug };
  });
}
