"use client";
import { useQuery } from "@apollo/client";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";

import { GET_PROPERTY_RENTAL_AGREEMENTS } from "@/graphql/properties";
import CollapsibleTable from "@/components/Table";
import EmptyContainer from "@/components/EmptyContainer";

const columns = [
  { name: "Owner Name" },
  { name: "Tenant Name" },
  { name: "File Url" },
  { name: "Created At" },
];

export default function RentalAgreements({
  propertyId,
  tenantId,
  ownerId,
  toggleRentalAgreementCreator,
}) {
  const { data } = useQuery(GET_PROPERTY_RENTAL_AGREEMENTS, {
    variables: { propertyId, ownerId, tenantId },
    fetchPolicy: "network-only",
  });

  const formatRows = (data) => {
    if (data.length > 0) {
      return data.map((d) => ({
        id: d.id,
        "Owner Name": d?.owner?.name,
        "Tenant Name": d?.tenant?.name,
        "File Url": d?.file?.signedUrl ?? d?.signedUrl,
        "Created At": dayjs(d?.createdAt).format("ddd, MMM D, YYYY h:mm A	"),
      }));
    } else {
      return data;
    }
  };

  const agreements = formatRows(data?.rentalAgreements?.nodes ?? []);

  return (
    <Stack p={4}>
      {agreements.length > 0 && (
        <CollapsibleTable columns={columns} rows={agreements} />
      )}
      {agreements.length === 0 && (
        <EmptyContainer
          title="No Rental Agreements Made So Far...!"
          btnTitle="Create Rental Agreement"
          btnClick={toggleRentalAgreementCreator}
        />
      )}
    </Stack>
  );
}
