"use client";

import { useState } from "react";
import Stack from "@mui/material/Stack";

import usePagination from "src/hooks/usePagination";
import PropertyList from "src/app/property/List";
import { GET_PROPERTIES_BY_LISTING_STATUS } from "@/graphql/properties";
import { removeDuplicateObjectsFromArray } from "@/utils/helper";

export default function SysAdmin() {
  const [properties, setProperties] = useState([]);
  usePagination({
    key: "properties",
    QUERY: GET_PROPERTIES_BY_LISTING_STATUS,
    variables: {
      first: 20,
      listingStatus: "IN_REVIEW",
      orderBy: ["CREATED_AT_DESC"],
    },
    onNewData: (data) => {
      setProperties((prev) => {
        return removeDuplicateObjectsFromArray([...prev, ...data]);
      });
    },
  });
  return (
    <Stack>
      <PropertyList
        data={properties}
        showSkeleton={properties.length === 0}
        title="Properties Awaiting Approval"
      />
    </Stack>
  );
}
