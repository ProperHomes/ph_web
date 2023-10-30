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
      <CategoryBoxes />
      <PropertyList
        showFilters
        data={data}
        infiniteScroll
        count={20}
        searchParams={searchParams}
        title="Properties Listed Recently"
      />
    </Stack>
  );
}
