import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { GET_PROPERTIES } from "@/graphql/properties";
import { client } from "@/graphql/serverClient";

import Card from "../Card";
import { capitalizeFirstLetter } from "@/utils/helper";

export default async function SimilarProperties({ city, type }) {
  const similarRes = await client.request(GET_PROPERTIES, {
    first: 4,
    offset: 0,
    city,
    type,
  });
  const properties = similarRes?.properties?.nodes ?? [];
  return (
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
        {properties.map((p) => {
          return <Card key={p.id} data={p} showFavorite={false} />;
        })}
      </Box>
    </Stack>
  );
}
