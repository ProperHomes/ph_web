"use client";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import ArrowBack from "@mui/icons-material/ArrowBack";
import CurrencyRupee from "@mui/icons-material/CurrencyRupee";
import MoneyOff from "@mui/icons-material/MoneyOff";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DocumentScannerOutlined from "@mui/icons-material/DocumentScannerOutlined";

import { LISTING_TYPE, PROPERTY_STATUS } from "@/utils/constants";
import Analytics from "./analytics";
import PropertyPayments from "src/app/dashboard/payments";
import { useAppContext } from "src/appContext";
import RentalAgreements from "src/app/dashboard/rentalAgreements";
import CreateRentalAgreement from "src/app/create-rental-agreement";
import { GET_PROPERTY_BY_SLUG } from "@/graphql/properties";

function getItems(isRentalProperty, isRentalOccupied, isOwner) {
  let list = [];
  if (isRentalProperty) {
    if (isOwner) {
      list = [
        { label: "Analytics", id: "analytics", Icon: AnalyticsIcon },
        {
          label: "Rental Agreements",
          id: "rentalAgreements",
          Icon: DocumentScannerOutlined,
        },
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
          label: "Rental Agreements",
          id: "rentalAgreements",
          Icon: DocumentScannerOutlined,
        },
        {
          label: "Rent payments",
          id: "rentPayments",
          Icon: CurrencyRupee,
        },

        {
          label: "Raised Complaints",
          id: "raisedComplaints",
          Icon: MoneyOff,
        },
      ];
    }
  } else {
    if (isOwner) {
      list = [
        { label: "Analytics", id: "analytics", Icon: AnalyticsIcon },
        { label: "Interests", id: "interests", Icon: AnalyticsIcon },
      ];
    }
  }
  return list;
}

export default function ManageProperty({ slug }) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { state } = useAppContext();

  const { data: propertyData } = useQuery(GET_PROPERTY_BY_SLUG, {
    variables: { slug },
    fetchPolicy: "network-only",
  });

  const data = propertyData?.propertyBySlug ?? {};
  const { ownerId, tenantId, listedFor, status } = data;
  const isTenant = tenantId && tenantId === state?.user?.id;
  const isOwner = ownerId && ownerId === state?.user?.id;
  const isRentalProperty =
    listedFor === LISTING_TYPE.RENT && status === PROPERTY_STATUS.RENTED;
  const isRentalOccupied = !!tenantId;

  // Todo: why Set is used here ?
  const list = [
    ...(new Set(getItems(isRentalProperty, isRentalOccupied, isOwner)) ?? []),
  ];

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [showRentalAgreementCreator, setShowRentalAgreementCreator] =
    useState(false);

  const handleChange = (_event, value) => {
    setActiveTabIndex(value);
  };

  const toggleRentalAgreementCreator = () => {
    setShowRentalAgreementCreator((prev) => !prev);
  };

  const isAnalytics = list[activeTabIndex]?.id === "analytics";

  return (
    <>
      {!showRentalAgreementCreator && (
        <Stack spacing={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <IconButton onClick={router.back}>
                <ArrowBack />
              </IconButton>
              <Typography fontWeight={600}>{data.title}</Typography>
            </Stack>
            {isTenant && (
              <Button size="medium" variant="contained" color="error">
                Raise a Complaint
              </Button>
            )}
          </Stack>

          <Stack sx={{ maxWidth: "100vw" }}>
            <Tabs
              value={activeTabIndex}
              onChange={handleChange}
              textColor="inherit"
              indicatorColor="secondary"
              aria-label="manage property tabs"
              sx={{
                "& .MuiTabs-flexContainer": {
                  flexWrap: "wrap",
                },
              }}
            >
              {list.map(({ label, id, Icon }) => {
                return (
                  <Tab
                    key={id}
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

            {isAnalytics && <Analytics propertyPath={`/property/${slug}`} />}

            {activeTabIndex === "rentPayments" && (
              <PropertyPayments propertyId={data?.id} paymentFor="RENT" />
            )}

            {activeTabIndex === "rentalAgreements" && (
              <RentalAgreements
                propertyId={data?.id}
                ownerId={ownerId}
                tenantId={tenantId}
                toggleRentalAgreementCreator={toggleRentalAgreementCreator}
              />
            )}
          </Stack>
        </Stack>
      )}
      {showRentalAgreementCreator && (
        <CreateRentalAgreement handleGoBack={toggleRentalAgreementCreator} />
      )}
    </>
  );
}
