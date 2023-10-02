import Stack from "@mui/material/Stack";
import {
  GET_PROPERTIES,
  GET_PROPERTY_BY_SLUG,
  GET_ALL_PROPERTIES_FOR_STATIC_PATHS,
} from "@/graphql/properties";
import { client } from "@/graphql/serverClient";

import Profile from "../profile";

export const dynamicParams = true;

export default async function Page({ params }) {
  let res = await client.request(GET_PROPERTY_BY_SLUG, { slug: params.slug });
  const data = res?.propertyBySlug;
  const { id, city, type } = data;
  const similarRes = await client.request(GET_PROPERTIES, {
    first: 3,
    city,
    type,
    propertyId: id,
    orderBy: ["CREATED_AT_DESC"],
  });
  const properties =
    similarRes?.properties?.edges?.map((edge) => edge.node) ?? [];
  return (
    <Stack spacing={2} px={{ xs: 1, sm: 3, md: 4 }} py={2}>
      <Profile data={data} similarProperties={properties} />
    </Stack>
  );
}

export async function generateStaticParams() {
  let res = await client.request(GET_ALL_PROPERTIES_FOR_STATIC_PATHS);
  const properties = res?.properties?.nodes ?? [];
  return properties.map(({ slug }) => {
    return { slug };
  });
}
