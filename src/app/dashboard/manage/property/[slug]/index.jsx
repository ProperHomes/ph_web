"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { LISTING_TYPE, PROPERTY_STATUS } from "@/utils/constants";
import ArrowBack from "@mui/icons-material/ArrowBack";
import CurrencyRupee from "@mui/icons-material/CurrencyRupee";
import MoneyOff from "@mui/icons-material/MoneyOff";
import { DocumentScannerOutlined } from "@mui/icons-material";
import PropertyPayments from "src/app/dashboard/PropertyPayments";
import { useAppContext } from "src/appContext";

function getItems(isRentalProperty, isRentalOccupied, isOwner) {
  let list = [];
  if (isRentalProperty) {
    if (isOwner) {
      list = [
        {
          label: "Rent payments",
          id: "rentPayments",
          Icon: CurrencyRupee,
        },
        {
          label: "Complaints Received",
          id: "tenantRequests",
          Icon: CurrencyRupee,
        },
        {
          label: "Rental Agreements",
          id: "rentalAgreements",
          Icon: DocumentScannerOutlined,
        },
      ];
      if (!isRentalOccupied) {
        list.splice(0, 0, {
          label: "Interested Tenants",
          id: "tenantInterests",
          Icon: CurrencyRupee,
        });
      }
    } else {
      list = [
        {
          label: "Rent payments",
          id: "rentPayments",
          Icon: CurrencyRupee,
        },
        {
          label: "Rental Agreements",
          id: "rentalAgreements",
          Icon: DocumentScannerOutlined,
        },
        {
          label: "Raised Complaints",
          id: "raisedComplaints",
          Icon: MoneyOff,
        },
      ];
    }
  }
  return list;
}

export default function ManageProperty({ data }) {
  const router = useRouter();
  const theme = useTheme();
  const { state } = useAppContext();

  const [activeTabId, setActiveTabId] = useState("interests");

  const { ownerId, tenantId, listedFor, status } = data;
  const isTenant = tenantId && tenantId === state?.user?.id;
  const isOwner = ownerId && ownerId === state?.user?.id;
  const isRentalProperty =
    listedFor === LISTING_TYPE.RENT && status === PROPERTY_STATUS.RENTED;
  const isRentalOccupied = !!tenantId;

  const list = getItems(isRentalProperty, isRentalOccupied, isOwner);

  const handleChange = (_event, value) => {
    setActiveTabId(value);
  };
  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          <IconButton onClick={router.back}>
            <ArrowBack />
          </IconButton>
          <Typography fontWeight={600}>{data.title}</Typography>
        </Stack>
        <Button size="medium" variant="contained" color="error">
          Raise a Complaint
        </Button>
      </Stack>

      <Stack>
        <Tabs
          value={activeTabId}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          aria-label="manage property tabs"
        >
          {list.map(({ label, id, Icon }) => {
            return (
              <Tab
                key={id}
                value={id}
                icon={<Icon />}
                iconPosition="start"
                label={<Typography fontSize="large">{label}</Typography>}
                sx={{
                  minHeight: "3.5em",
                  maxHeight: "3.5em",
                }}
              />
            );
          })}
        </Tabs>

        {activeTabId === "rentpayments" && (
          <PropertyPayments propertyId={data?.id} paymentFor="RENT" />
        )}
      </Stack>
    </Stack>
  );
}
