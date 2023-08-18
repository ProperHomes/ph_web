import Stack from "@mui/material/Stack";
import {
  GET_PROPERTY_BY_SLUG,
  GET_ALL_PROPERTIES_FOR_STATIC_PATHS,
} from "@/graphql/properties";
import { client } from "@/graphql/serverClient";

import Profile from "../profile";
import SimilarProperties from "../profile/SimilarProperties";

export default async function Page({ params }) {
  let res = await client.request(GET_PROPERTY_BY_SLUG, { slug: params.slug });
  const data = res?.propertyBySlug;
  const { city, type } = data;
  return (
    <Stack spacing={2} px={{ xs: 1, sm: 3, md: 4 }} py={2}>
      <Profile data={data} />
      <SimilarProperties city={city} type={type} />
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
