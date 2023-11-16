"use client";
import { useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Phone from "@mui/icons-material/Phone";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  CREATE_PROPERTY_CREDIT_EXPENSE,
  GET_PROPERTY_CREDIT_EXPENSE_OF_USER,
} from "@/graphql/properties";
import { LISTING_TYPE } from "@/utils/constants";
import useToggleAuth from "src/hooks/useToggleAuth";
import { UPDATE_USER } from "@/graphql/user";
import { useAppContext } from "src/appContext";
import ContactDetailDialog from "../../ContactDetailsDialog";

function SellerInfoCard({ data }) {
  const theme = useTheme();
  const { createdAt, listedFor, id: propertyId } = data;
  const { state } = useAppContext();
  const { user } = state;
  const { Auth, isLoggedIn, loggedInUser, toggleAuth } = useToggleAuth();

  const userCredits = user?.credits ?? 0;
  const hasCredits = userCredits > 0;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const { data: expenseData, refetch } = useQuery(
    GET_PROPERTY_CREDIT_EXPENSE_OF_USER,
    {
      variables: { userId: loggedInUser?.id, propertyId },
      skip: true, // !isLoggedIn || !propertyId,
      fetchPolicy: "network-only",
    }
  );

  const [addPropertyCreditExpense] = useMutation(
    CREATE_PROPERTY_CREDIT_EXPENSE
  );
  const [updateUser] = useMutation(UPDATE_USER);

  const hasPaidAlready =
    !!expenseData?.propertyCreditExpenseByUserIdAndPropertyId?.id;

  const isForSale = listedFor === LISTING_TYPE.SALE;
  const isForLease = listedFor === LISTING_TYPE.LEASE;

  const toggleContactDetails = () => {
    setShowContactDetails((prev) => !prev);
  };

  const togglePaymentModal = () => {
    setShowPaymentDialog((prev) => !prev);
  };

  const handleClickContactView = async () => {
    if (!isLoggedIn) {
      return toggleAuth();
    }
    toggleContactDetails();
    // if (hasPaidAlready) {
    //   return toggleContactDetails();
    // }
    // if (hasCredits) {
    //   setIsSubmitting(true);
    //   toggleContactDetails();
    //   await addPropertyCreditExpense({
    //     variables: {
    //       input: {
    //         propertyCreditExpense: { userId: loggedInUser?.id, propertyId },
    //       },
    //     },
    //   });
    //   refetch();
    //   await updateUser({
    //     variables: {
    //       input: {
    //         id: loggedInUser?.id,
    //         patch: { credits: userCredits - 1 },
    //       },
    //     },
    //   });
    //   dispatch({
    //     type: appActionTypes.UPDATE_LOGGED_IN_USER,
    //     user: { ...state.user, credits: userCredits - 1 },
    //   });
    //   setIsSubmitting(false);
    // }
    // togglePaymentModal();
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

      {/* {isLoggedIn && !hasPaidAlready && (
        <Typography fontSize="1rem">
          You have {userCredits} {userCredits === 1 ? "credit" : "credits"}{" "}
          {userCredits !== 0 ? "remaining" : ""}
        </Typography>
      )} */}
      <Button
        variant="contained"
        color="info"
        disabled={isSubmitting}
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
      {showContactDetails && (
        <ContactDetailDialog
          data={data}
          open={showContactDetails}
          handleClose={toggleContactDetails}
        />
      )}
    </Stack>
  );
}

export default SellerInfoCard;
