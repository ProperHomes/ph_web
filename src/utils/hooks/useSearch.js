import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import { SEARCH_PROPERTIES } from "@/containers/Properties/graphql";

function useSearch({ searchText = "", enabled, city, locality }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);

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
            first: 20,
            offset: page * 20,
          },
        });
        setResults(() => {
          return data?.searchProperties?.nodes ?? [];
        });
        setPage((p) => p + 1);
      } catch (err) {
        console.log(err);
      }
    };

    if (enabled) {
      if (alteredText.length === 0) {
        setResults([]);
        setPage(0);
      } else {
        handleSearch();
      }
    }
  }, [alteredText, enabled]);

  return { results };
}

export default useSearch;
