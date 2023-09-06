"use client";
import { Suspense, lazy } from "react";
import { useSearchParams } from "next/navigation";

import ListSkeleton from "../../components/ListSkeleton";

const PropertyList = lazy(() => import("../property/List"));

export default function SearchMain() {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("searchText");
  const city = searchParams.get("city");
  const locality = searchParams.get("locality");
  const bedrooms = searchParams.get("bedrooms");
  const listedFor = searchParams.get("listedFor");

  const searchVariables = { city, locality, searchText, bedrooms, listedFor };
  const title = `Properties for search "${searchText ?? ""}"`;

  return (
    <Suspense fallback={<ListSkeleton />}>
      <PropertyList
        showFilters
        isSearch
        infiniteScroll
        count={20}
        searchVariables={searchVariables}
        title={title}
      />
    </Suspense>
  );
}
