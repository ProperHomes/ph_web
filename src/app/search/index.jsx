"use client";
import { useSearchParams } from "next/navigation";

import PropertyList from "../property/List";
import useSearch from "@/utils/hooks/useSearch";

export default function SearchMain() {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("searchText");
  const city = searchParams.get("city");
  const locality = searchParams.get("locality");
  const { results, totalCount } = useSearch({
    searchText,
    city,
    locality,
    enabled: true,
  });
  const title =
    results.length > 0
      ? `Properties for search "${searchText ?? ""}"`
      : `No properties found within that search`;
  return (
    <PropertyList
      showFilters
      isSearch
      count={20}
      searchText={searchText}
      searchResultsTotalCount={totalCount}
      data={results}
      title={title}
    />
  );
}
