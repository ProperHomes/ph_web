"use client";
import { Suspense, lazy } from "react";
import { useSearchParams } from "next/navigation";

import useSearch from "src/hooks/useSearch";
import Loading from "@/components/Loading";

const PropertyList = lazy(() => import("../property/List"));

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
    <Suspense fallback={<Loading />}>
      <PropertyList
        showFilters
        isSearch
        count={20}
        searchText={searchText}
        searchResultsTotalCount={totalCount}
        data={results}
        title={title}
      />
    </Suspense>
  );
}
