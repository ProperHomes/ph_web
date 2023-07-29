import { useRouter } from "next/router";

import PropertyList from "./Properties/List";
import useSearch from "@/utils/hooks/useSearch";

function Search() {
  const router = useRouter();

  const { searchText, city, locality } = router.query;

  const { results } = useSearch({ searchText, city, locality, enabled: true });

  const title =
    results.length > 0
      ? `Properties for search "${router.query.searchText ?? ""}"`
      : `No properties found within that search`;
  return <PropertyList data={results} title={title} />;
}

export default Search;
