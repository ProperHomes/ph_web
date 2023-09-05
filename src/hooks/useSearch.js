"use client";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import { SEARCH_PROPERTIES } from "@/graphql/properties";
import { removeDuplicateObjectsFromArray } from "../utils/helper";

function useSearch({
  searchText = "",
  enabled,
  city,
  locality,
  currentPage = 0,
  count = 20,
  filtered = false,
}) {
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  let alteredText = searchText;
  if (searchText && city) {
    alteredText = `${searchText.toLowerCase()} ${city.toLowerCase()}`;
    if (locality) {
      alteredText = `${alteredText} ${locality.toLowerCase()}`;
    }
  }
  alteredText = alteredText
    .split(" ")
    .filter((x) => x.length > 0)
    .join(" | "); // needed for postgres fts for text with multiple words

  const [searchProperties] = useLazyQuery(SEARCH_PROPERTIES);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const { data } = await searchProperties({
          variables: {
            searchText: alteredText,
            city,
            locality,
            first: count,
            offset: currentPage * count,
          },
          fetchPolicy: "network-only",
        });
        const newProperties = data?.searchProperties?.nodes ?? [];
        setTotalCount(data?.searchProperties?.totalCount);
        if (filtered) {
          setResults(newProperties);
        } else {
          setResults((prev) => {
            return removeDuplicateObjectsFromArray([...prev, ...newProperties]);
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (enabled && alteredText.length > 0) {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [alteredText, enabled, filtered, currentPage]);

  return { results, totalCount };
}

export default useSearch;
