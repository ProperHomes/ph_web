"use client";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Phone from "@mui/icons-material/Phone";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { CHECK_IF_PAID_TO_VIEW_PROPERTY_CONTACT_DETAILS } from "@/graphql/properties";
import { LISTING_TYPE } from "@/utils/constants";
import useToggleAuth from "src/hooks/useToggleAuth";

function SellerInfoCard({ createdAt, listedFor, propertyId }) {
  const theme = useTheme();

  const { Auth, isLoggedIn, loggedInUser, toggleAuth } = useToggleAuth();

  const hasMembership = loggedInUser?.memberships?.totalCount > 0;

  const { data } = useQuery(CHECK_IF_PAID_TO_VIEW_PROPERTY_CONTACT_DETAILS, {
    variables: { userId: loggedInUser?.id, propertyId },
    skip: !isLoggedIn || !propertyId || hasMembership,
  });

  const hasPaidAlready =
    !!data?.propertyPaymentByUserIdAndPropertyId?.id || hasMembership;

  const isForSale = listedFor === LISTING_TYPE.SALE;
  const isForLease = listedFor === LISTING_TYPE.LEASE;

  const toggleContactDetails = () => {
    // Todo: open a dialog that shows property contact details
  };

  const togglePaymentModal = () => {
    // Todo: open a dialog that shows payment to make and membershoip plans
  };

  const handleClickContactView = () => {
    if (isLoggedIn) {
      if (hasPaidAlready) {
        toggleContactDetails();
      } else {
        togglePaymentModal();
      }
    } else {
      toggleAuth();
    }
  };

  return (
    <Stack
      px={2}
      py={2}
      spacing={2}
      sx={{
        boxShadow: 2,
        borderRadius: "1rem",
        backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fafafa2c",
      }}
    >
      <Typography fontSize="large" color={theme.palette.text.secondary}>
        Interested in{" "}
        {isForSale ? "buying" : isForLease ? "leasing" : "renting"} this
        property ?
      </Typography>
      <Button
        variant="contained"
        color="info"
        onClick={handleClickContactView}
        startIcon={hasPaidAlready ? <VisibilityIcon /> : <Phone />}
        sx={{
          fontSize: "large",
        }}
      >
        {hasPaidAlready ? "View Contact Details" : "Get  Contact Details"}
      </Button>

      <Stack
        spacing={1}
        mt={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <DateRangeIcon htmlColor={theme.palette.text.secondary} />
        <Typography color={theme.palette.text.secondary}>
          Listed on: {dayjs(createdAt).format("MMMM D, YYYY")}
        </Typography>
      </Stack>
      {Auth}
    </Stack>
  );
}

export default SellerInfoCard;
