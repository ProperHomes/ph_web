import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Card from "../Card";
import { capitalizeFirstLetter } from "@/utils/helper";

export default function SimilarProperties({ properties, city }) {
  return (
    <Stack spacing={2}>
      <Typography fontWeight={600} fontSize="1.5rem" color="info.main">
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
          return <Card key={p.id} data={p} isFullWidth showFavorite={false} />;
        })}
      </Box>
    </Stack>
  );
}
