"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import usePagination from "src/hooks/usePagination";
import { GET_PROPERTIES_BY_LISTING_STATUS } from "@/graphql/properties";
import { removeDuplicateObjectsFromArray } from "@/utils/helper";

const CreateBuilder = dynamic(() => import("./CreateBuilder"), { ssr: false });
const CreateProject = dynamic(() => import("./CreateProject"), { ssr: false });
const CreatePropertySaleRentLease = dynamic(
  () => import("../../list-your-property-for-sale-rent-lease"),
  { ssr: false }
);
const PropertyList = dynamic(() => import("../../property/List"), {
  ssr: false,
});

export default function SysAdmin() {
  const [properties, setProperties] = useState([]);

  const [showCreateProperty, setShowCreateProperty] = useState(false);
  const [showCreateBuilder, setShowCreateBuilder] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);

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

  const toggleCreateBuilder = () => {
    setShowCreateBuilder((prev) => !prev);
  };

  const toggleCreateProject = () => {
    setShowCreateProject((prev) => !prev);
  };

  return (
    <Stack spacing={2}>
      <Stack spacing={2} p={2}>
        <Button
          sx={{ maxWidth: "300px" }}
          variant="contained"
          onClick={toggleCreateProperty}
        >
          Show Create Property
        </Button>
        <Button
          sx={{ maxWidth: "300px" }}
          variant="contained"
          onClick={toggleCreateBuilder}
        >
          Show Create Builder
        </Button>
        <Button
          sx={{ maxWidth: "300px" }}
          variant="contained"
          onClick={toggleCreateProject}
        >
          Show Create Project
        </Button>

        {showCreateBuilder && (
          <CreateBuilder handleCancel={toggleCreateBuilder} />
        )}
        {showCreateProject && (
          <CreateProject handleCancel={toggleCreateProject} />
        )}
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
