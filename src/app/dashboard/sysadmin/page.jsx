"use client";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import usePagination from "src/hooks/usePagination";
import { GET_PROPERTIES_BY_LISTING_STATUS } from "@/graphql/properties";
import { GET_IN_ACTIVE_BUILDERS } from "@/graphql/builders";
import { GET_IN_ACTIVE_PROJECTS } from "@/graphql/projects";
import { removeDuplicateObjectsFromArray } from "@/utils/helper";

const CreateBuilder = dynamic(() => import("../../builder/CreateBuilder"), {
  ssr: false,
});
const CreateProject = dynamic(() => import("../../project/CreateProject"), {
  ssr: false,
});
const CreatePropertySaleRentLease = dynamic(
  () => import("../../list-your-property-for-sale-rent-lease"),
  { ssr: false }
);
const PropertyList = dynamic(() => import("../../property/List/index"), {
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

  const { data: buildersData } = useQuery(GET_IN_ACTIVE_BUILDERS, {
    fetchPolicy: "network-only",
  });
  const { data: projectsData } = useQuery(GET_IN_ACTIVE_PROJECTS, {
    fetchPolicy: "network-only",
  });

  const inActiveBuilders = buildersData?.builders?.nodes ?? [];
  const inActiveProjects = projectsData?.projects?.nodes ?? [];

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
          <CreateBuilder isSysAdmin handleCancel={toggleCreateBuilder} />
        )}
        {showCreateProject && (
          <CreateProject isSysAdmin handleCancel={toggleCreateProject} />
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

      {properties.length > 0 && (
        <PropertyList data={properties} title="Properties Awaiting Approval" />
      )}

      {inActiveBuilders.length > 0 && (
        <Stack spacing={2} my={2}>
          <Typography fontWeight={600}>Builders To Review</Typography>
          {inActiveBuilders.map((b) => {
            return (
              <Stack spacing={2} key={b.id}>
                <Typography>
                  {b.name}: {b.slug}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      )}

      {inActiveProjects.length > 0 && (
        <Stack spacing={2} my={2}>
          <Typography fontWeight={600}>Projects To Review</Typography>
          {inActiveProjects.map((p) => {
            return (
              <Stack spacing={2} key={p.id}>
                <Typography>
                  {p.name}: {p.slug}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}
