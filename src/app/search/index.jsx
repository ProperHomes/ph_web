"use client";
import { Suspense, lazy } from "react";
import { useSearchParams } from "next/navigation";

import ListSkeleton from "../../components/ListSkeleton";

const PropertyList = lazy(() => import("../property/List"));

export default function SearchMain() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  // const locality = searchParams.get("locality");
  const bedrooms = searchParams.get("bedrooms");
  const listedFor = searchParams.get("listedFor");
  const priceSort = searchParams.get("priceSort");
  const type = searchParams.get("type");

  const searchVariables = {};
  if (city) {
    searchVariables.city = city;
  }

  if (bedrooms) {
    searchVariables.bedrooms = bedrooms;
  }
  if (listedFor) {
    searchVariables.listedFor = listedFor;
  }

  if (type) {
    searchVariables.type = type;
  }

  if (priceSort) {
    searchVariables.orderBy = [
      priceSort === "asc" ? "PRICE_ASC" : "PRICE_DESC",
      "CREATED_AT_DESC",
    ];
  } else {
    searchVariables.orderBy = ["CREATED_AT_DESC"];
  }

  const title = `Properties Returned`;

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
