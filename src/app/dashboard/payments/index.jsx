"use client";
import { useQuery } from "@apollo/client";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";

import { GET_PROPERTY_PAYMENTS } from "@/graphql/properties";
import { useState } from "react";
import CollapsibleTable from "@/components/Table";
import EmptyContainer from "@/components/EmptyContainer";

const columns = [
  { name: "Payment Type" },
  { name: "Payment Mode" },
  { name: "Amount Paid" },
  { name: "Property Id" },
  { name: "Payment Made at" },
];

export default function PropertyPayments({ propertyId, userId, paymentFor }) {
  const [page, setPage] = useState(0);
  const { data } = useQuery(GET_PROPERTY_PAYMENTS, {
    variables: { propertyId, userId, first: 10, offset: page * 10, paymentFor },
    fetchPolicy: "network-only",
  });

  const formatRows = (data) => {
    if (data.length > 0) {
      return data.map((d) => ({
        id: d.id,
        "Amount Paid": d?.amount,
        "Payment Type": d?.paymentFor,
        "Payment Mode": d?.paymentMode,
        "Payment Made at": dayjs(d?.createdAt).format(
          "ddd, MMM D, YYYY h:mm A	"
        ),
        "Property Id": d.property?.number,
      }));
    } else {
      return data;
    }
  };

  const payments = formatRows(data?.propertyPayments?.nodes ?? []);

  const handleChangePage = (_e, page) => {
    setPage(page);
  };

  return (
    <Stack p={4}>
      {payments.length > 0 && (
        <CollapsibleTable columns={columns} rows={payments} />
      )}
      {payments.length === 0 && (
        <EmptyContainer title="No Payments Made So Far...!" />
      )}
    </Stack>
  );
}
