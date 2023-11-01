import { useState } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "yup-phone-lite";
import { MuiOtpInput } from "mui-one-time-password-input";
import InputAdornment from "@mui/material/InputAdornment";

import { useAppContext } from "src/appContext";
import { passwordRules } from "@/utils/helper";
import Loading from "src/components/Loading";

const OtpInput = styled(MuiOtpInput)({
  "& input": {
    width: "2em",
    height: "2em",
    fontSize: "1rem",
    border: "1px solid #667080",
    background: "#fff",
    color: "#000",
  },
});

const changePasswordFormFields = [
  { label: "*New Password", type: "password", name: "newPass" },
  { label: "*Confirm Password", type: "password", name: "confirmPass" },
];

const verifyPhoneNumberSchema = {
  phoneNumber: yup
    .string()
    .phone("IN", "Must be a valid mobile number")
    .required("Phone number is required"),
};

const schemaObj = {
  newPass: passwordRules,
  confirmPass: passwordRules.test(
    "passwords-match",
    "Passwords must match",
    function (value) {
      return this.parent.newPass === value;
    }
  ),
};

function ChangePasswordModal({ handleClose, open }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [passChanged, setPassChanged] = useState(false);
  const [otpReqSuccessful, setOtpReqSuccesful] = useState(false);
  const [otpError, setOtpError] = useState(false);

  const { control, handleSubmit, setError, getValues, formState } = useForm({
    resolver: yupResolver(
      yup.object().shape(phoneVerified ? schemaObj : verifyPhoneNumberSchema)
    ),
  });

  const { state: appState } = useAppContext();

  const handleChangeOtp = (val) => {
    setOtp(val);
  };

  const handleChangePassword = async (data) => {
    if (data.newPass === data.confirmPass) {
      try {
        await axios({
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API_URL}/change/forgot/password`,
          data: {
            ...data,
            userId: appState.user?.id,
          },
          withCredentials: true,
        });
        setPassChanged(true);
      } catch (err) {
        setError("oldPass", {
          type: "server",
          message: "something went wrong",
        });
      }
    }
  };

  const handleSendOtp = async (data) => {
    try {
      await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/phonenumber/sendotp`,
        data: {
          phoneNumber: `+91${data.phoneNumber}`,
        },
        withCredentials: true,
      });
      setOtpReqSuccesful(true);
    } catch (err) {
      setError("phoneNumber", {
        type: "server",
        message: err?.response?.data?.error ?? "",
      });
    }
  };

  const handleSubmitOtp = async (otpVal) => {
    setIsLoading(true);
    const inputData = getValues();
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/phonenumber/verifyotp`,
        data: {
          phoneNumber: `+91${inputData.phoneNumber}`,
          otp: otpVal,
        },
        withCredentials: true,
      });
      if (res.status === 200) {
        setPhoneVerified(true);
      } else {
        setOtpError(true);
      }
    } catch (err) {
      setOtpError(true);
    }
    setIsLoading(false);
  };

  const onSubmit = (data) => {
    if (phoneVerified) {
      handleChangePassword(data);
    } else {
      handleSendOtp(data);
    }
  };

  return (
    <Dialog
      open={open}
      fullScreen={isMobile}
      onClose={handleClose}
      PaperProps={{
        style: {
          backgroundColor: "#fff",
          backgroundImage: "none",
          borderRadius: "16px",
        },
      }}
    >
      <DialogContent sx={{ minWidth: "390px" }}>
        {(formState.isSubmitting || isLoading) && <Loading />}
        <Stack spacing={2} alignItems="center" justifyContent="center">
          <Typography sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
            {phoneVerified ? "Change Password" : "Verify Phone Number"}
          </Typography>

          {phoneVerified ? (
            passChanged ? (
              <Typography gutterBottom>
                Password changed successfully
              </Typography>
            ) : (
              <>
                <Stack spacing={4} py={2} sx={{ width: "100%" }}>
                  {changePasswordFormFields.map((fieldProps) => (
                    <Controller
                      key={fieldProps.name}
                      name={fieldProps.name}
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          {...fieldProps}
                          fullWidth
                          defaultValue={value}
                          onChange={onChange}
                          error={!!error?.message}
                          helperText={error?.message}
                        />
                      )}
                    />
                  ))}
                </Stack>
              </>
            )
          ) : (
            <>
              {otpReqSuccessful ? (
                <>
                  <OtpInput
                    autoFocus
                    value={otp}
                    length={4}
                    onChange={handleChangeOtp}
                    onComplete={handleSubmitOtp}
                    TextFieldsProps={{
                      error: otpError,
                      inputmode: "decimal",
                    }}
                  />
                  <Typography variant="subtitle1" pt={2} gutterBottom>
                    Please enter the otp received to your mobile number.
                  </Typography>
                </>
              ) : (
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
                      inputMode="tel"
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
              )}
            </>
          )}

          <Stack direction="row" spacing={4} justifyContent="center">
            <Button sx={{ color: "#000" }} onClick={handleClose}>
              Cancel
            </Button>

            {!passChanged && (
              <Button
                variant="contained"
                disabled={formState?.isSubmitting || isLoading}
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            )}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePasswordModal;
