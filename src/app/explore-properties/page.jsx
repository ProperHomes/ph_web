import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { client } from "@/graphql/serverClient";
import { GET_PROPERTIES } from "@/graphql/properties";
import PropertyList from "src/app/property/List";
import CategoryBoxes from "@/components/CategoryBoxes";

export default async function Page({ searchParams }) {
  const res = await client.request(GET_PROPERTIES, {
    first: 20,
    orderBy: ["CREATED_AT_DESC"],
  });
  const data = res?.properties?.edges?.map((edge) => edge.node) ?? [];
  return (
    <Stack py={2} spacing={4}>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <CategoryBoxes />
      </Box>
      <PropertyList
        data={data}
        infiniteScroll
        count={20}
        showFilters
        title="Explore Properties"
        searchParams={searchParams}
      />
    </Stack>
  );
}
