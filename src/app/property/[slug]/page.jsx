import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  GET_PROPERTIES,
  GET_PROPERTY_BY_SLUG,
  GET_ALL_PROPERTIES_FOR_STATIC_PATHS,
} from "@/graphql/properties";
import { client } from "@/graphql/serverClient";

import Profile from "../profile";
import Card from "../Card";
import { capitalizeFirstLetter } from "@/utils/helper";

export default async function Page({ params }) {
  let res = await client.request(GET_PROPERTY_BY_SLUG, { slug: params.slug });
  const data = res?.propertyBySlug;
  const { city, type } = data;
  const similarRes = await client.request(GET_PROPERTIES, {
    first: 4,
    offset: 0,
    city,
    type,
  });
  const similarProperties = similarRes?.properties?.nodes ?? [];
  return (
    <Stack spacing={2}>
      <Profile data={data} similarProperties={similarProperties} />
      <Stack spacing={2} p={2}>
        <Typography fontWeight={600} fontSize="1.5rem">
          Similar Properties in the city of {capitalizeFirstLetter(city)}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gap: "1.2rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          }}
        >
          {similarProperties.map((p) => {
            return <Card key={p.id} data={p} showFavorite={false} />;
          })}
        </Box>
      </Stack>
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
