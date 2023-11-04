"use client";

import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import usePagination from "src/hooks/usePagination";
import PropertyList from "src/app/property/List";
import { GET_PROPERTIES_BY_LISTING_STATUS } from "@/graphql/properties";
import { removeDuplicateObjectsFromArray } from "@/utils/helper";
import CreatePropertySaleRentLease from "src/app/list-your-property-for-sale-rent-lease";

export default function SysAdmin() {
  const [properties, setProperties] = useState([]);
  const [showCreateProperty, setShowCreateProperty] = useState(false);
  const [ownerId, setOwnerId] = useState(null);
  const [ownerNumber, setOwnerNumber] = useState(null);

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

  const toggleCreateProperty = () => {
    setShowCreateProperty((prev) => !prev);
  };

  return (
    <Stack>
      <Stack spacing={2} p={2} maxWidth="xl">
        <Button variant="contained" onClick={toggleCreateProperty}>
          Show Create Property
        </Button>
        {showCreateProperty && (
          <Stack spacing={1}>
            <TextField
              type="text"
              placeholder="Enter Owner Id"
              onChange={(e) => {
                setOwnerId(e.target.value);
              }}
              value={ownerId ?? ""}
              required
              error={!ownerId}
            />
            <TextField
              type="number"
              placeholder="Enter Owner Number"
              onChange={(e) => {
                setOwnerNumber(e.target.valueAsNumber);
              }}
              value={ownerNumber ?? ""}
              required
              error={!ownerNumber}
            />
            <CreatePropertySaleRentLease
              ownerId={ownerId}
              ownerNumber={ownerNumber}
              isFromDashboard
            />
          </Stack>
        )}
      </Stack>

      <PropertyList data={properties} title="Properties Awaiting Approval" />
    </Stack>
  );
}
