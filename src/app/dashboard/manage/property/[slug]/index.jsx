"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

const items = [];

export default function ManageProperty({ data }) {
  const router = useRouter();
  const theme = useTheme();
  const isRentalProperty =
    data.listedFor === LISTING_TYPE.RENT &&
    data.status === PROPERTY_STATUS.RENTED;
  const [activeTabId, setActiveTabId] = useState("interests");
  const [list, setList] = useState(items);

  useEffect(() => {
    if (isRentalProperty) {
      setList((prev) => [
        ...prev,
        {
          label: "Pending Rent Payments",
          id: "pendingrents",
          Icon: MoneyOff,
        },
        {
          label: "Completed Rent payments",
          id: "rentpayments",
          Icon: CurrencyRupee,
        },
        {
          label: "Rental Agreements",
          id: "rentalagreements",
          Icon: DocumentScannerOutlined,
        },
      ]);
    }
  }, [isRentalProperty]);

  const handleChange = (_event, value) => {
    setActiveTabId(value);
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <IconButton onClick={router.back}>
          <ArrowBack />
        </IconButton>

        <Typography fontWeight={600}>{data.title}</Typography>
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
