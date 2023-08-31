"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import * as yup from "yup";
import "yup-phone-lite";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowForward from "@mui/icons-material/ArrowForward";

const STEP = {
  OWNER: "owner",
  TENANT: "tenant",
  PROPERTY: "property",
};

const SUFFIXES = ["Mr", "Ms", "Mrs"];

const personResolver = {
  suffix: yup.string().oneOf(SUFFIXES),
  name: yup.string().required("name is required"),
  phoneNumber: yup
    .string()
    .phone("IN", "Must be a valid phone number")
    .required("Phone number is required"),
  email: yup
    .string()
    .email("invalid email format")
    .trim()
    .required("Email is required"),
  pincode: yup.number().required("Pin code is required"),
  address: yup.string().required("address is required"),
  state: yup.string().required("state is required"),
  city: yup.string().required("city is required"),
};

const newRentalAgreementResolver = {
  owner: yup.object().shape(personResolver),
  tenant: yup.object().shape(personResolver),
  property: {
    address: yup.string().required("Property address is required"),
    pincode: yup.number().required("Property Pin code is required"),
    state: yup.string().required("state is required"),
    city: yup.string().required("city is required"),
  },
};

const StyledSelect = styled(Select)(({ theme, error }) => ({
  fontWeight: 500,
  fontSize: "0.8rem",
  "& fieldset": {
    borderColor: error ? "red" : theme.palette.grey[300],
  },
}));

export default function RentalAgreementCreator() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down);
  const [currentStep, setCurrentStep] = useState(STEP.OWNER);
  const [showPreview, setShowPreview] = useState(false);
  const formValues = useForm({
    resolver: yupResolver(yup.object().shape(newRentalAgreementResolver)),
  });
  const { setError, control, handleSubmit, getValues, reset, formState } =
    formValues;
  const { submitting } = formState;

  const handleStepChange = (step) => () => {
    setCurrentStep(step);
  };

  const isOwnerStep = currentStep === STEP.OWNER;
  const isTenantStep = currentStep === STEP.TENANT;
  const isPropertyStep = !isOwnerStep && !isTenantStep;

  const handleChangeToNextStep = () => {
    if (isOwnerStep) {
      setCurrentStep(STEP.TENANT);
    } else if (isTenantStep) {
      setCurrentStep(STEP.PROPERTY);
    } else {
      setCurrentStep(STEP.OWNER);
    }
  };

  return (
    <Stack p={4}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          variant="outlined"
          color={isOwnerStep ? "info" : "primary"}
          onClick={handleStepChange(STEP.OWNER)}
        >
          Owner
        </Button>
        <Button
          variant="outlined"
          color={isTenantStep ? "info" : "primary"}
          onClick={handleStepChange(STEP.TENANT)}
        >
          Tenant
        </Button>
      </Stack>

      <Stack py={2} spacing={2} sx={{ maxWidth: "400px" }}>
        {!isPropertyStep && (
          <>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Controller
                name="suffix"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <StyledSelect
                    displayEmpty
                    renderValue={(selected) => selected}
                    value={value ?? SUFFIXES[0]}
                    onChange={onChange}
                    error={!!error?.message}
                    sx={{ maxWidth: "100px" }}
                  >
                    {SUFFIXES.map((city) => {
                      return (
                        <MenuItem
                          key={city}
                          value={city}
                          style={{ fontWeight: 500, fontSize: "0.8rem" }}
                        >
                          {city}
                        </MenuItem>
                      );
                    })}
                  </StyledSelect>
                )}
              />

              <Controller
                name={`${currentStep}.name`}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="text"
                    placeholder={`Enter name of the ${
                      isOwnerStep ? "Owner" : "Tenant"
                    }`}
                    value={value ?? ""}
                    onChange={onChange}
                    error={!!error?.message}
                  />
                )}
              />
            </Stack>

            <Controller
              name="phoneNumber"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Mobile Number"
                  type="text"
                  value={value ?? ""}
                  onChange={onChange}
                  error={!!error?.message}
                  helperText={error?.message ?? ""}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography fontSize={"1.2rem"}>+91</Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name={`${currentStep}.email`}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  placeholder={`Enter email id of the ${
                    isOwnerStep ? "Owner" : "Tenant"
                  }`}
                  value={value ?? ""}
                  onChange={onChange}
                  error={!!error?.message}
                />
              )}
            />

            <Controller
              name={`${currentStep}.address`}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  placeholder={`Enter address of the ${
                    isOwnerStep ? "Owner" : "Tenant"
                  }`}
                  value={value ?? ""}
                  onChange={onChange}
                  error={!!error?.message}
                />
              )}
            />

            <Controller
              name={`${currentStep}.pincode`}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  placeholder={`Enter Pin code ${
                    isOwnerStep ? "Owner" : "Tenant"
                  } address`}
                  value={value ?? ""}
                  onChange={onChange}
                  error={!!error?.message}
                />
              )}
            />

            <Controller
              name={`${currentStep}.city`}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  placeholder={`Enter city of the ${
                    isOwnerStep ? "Owner" : "Tenant"
                  }`}
                  value={value ?? ""}
                  onChange={onChange}
                  error={!!error?.message}
                />
              )}
            />

            <Controller
              name={`${currentStep}.state`}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  type="text"
                  placeholder={`Enter state of the ${
                    isOwnerStep ? "Owner" : "Tenant"
                  }`}
                  value={value ?? ""}
                  onChange={onChange}
                  error={!!error?.message}
                />
              )}
            />
          </>
        )}
        <Button
          variant="contained"
          color="info"
          onClick={handleChangeToNextStep}
          endIcon={<ArrowForward />}
        >
          Next Step
        </Button>
      </Stack>
    </Stack>
  );
}
