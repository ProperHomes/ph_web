"use client";
import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import * as yup from "yup";
import "yup-phone-lite";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { MuiOtpInput } from "mui-one-time-password-input";

import SignupForm from "./Signup";
import LoginForm from "./Login";
import Loading from "src/components/Loading";
import { passwordRules } from "@/utils/helper";
import { useAppContext, appActionTypes } from "src/appContext";

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

const LoginWithTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "500",
  color: theme.palette.primary,
  textDecoration: "underline",
  cursor: "pointer",
  fontSize: "0.9rem",
}));

const authResolvers = {
  signup: {
    name: yup.string().required("Name is required"),
    password: passwordRules,
    city: yup.string().required("City is required"),
  },
  loginWithOtp: {
    phoneNumber: yup
      .string()
      .phone("IN", "Must be a valid mobile number")
      .required("Phone number is required"),
  },
  login: {
    phoneNumber: yup
      .string()
      .phone("IN", "Must be a valid phone number")
      .required("Phone number is required"),
    password: yup.string().required("Password is required"),
  },
};

function AuthModal({ open, handleClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpReqSuccessful, setOtpReqSuccesful] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);

  const { dispatch, state, handleFetchUser } = useAppContext();

  const resolverObj =
    authResolvers[
      showSignup ? "signup" : isLoginWithOtp ? "loginWithOtp" : "login"
    ];

  const formValues = useForm({
    resolver: yupResolver(yup.object().shape(resolverObj)),
  });
  const { setError, control, handleSubmit, getValues, reset, formState } =
    formValues;
  const { submitting } = formState;

  const toggleIsLoginWithOtp = () => {
    setIsLoginWithOtp((prev) => !prev);
    reset();
  };

  const toggleSignup = () => {
    setShowSignup((prev) => !prev);
  };

  const handleChangeOtp = (val) => {
    setOtp(val);
  };

  const handleLogin = async (data) => {
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/login/phone`,
        data: { ...data, phoneNumber: `91${data.phoneNumber}` },
        withCredentials: true,
      });
      if (res?.data?.userId) {
        await handleFetchUser(res.data.userId);
        handleClose();
      }
    } catch (err) {
      setError("password", {
        type: "server",
        message: "Incorrect credentials",
      });
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
        message: "Something went wrong with sending OTP. Pls contact support.",
      });
    }
  };

  const handleSubmitOtp = async (otpVal) => {
    setIsLoading(true);
    const inputData = getValues();
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/phonenumber/verifyotplogin`,
        data: {
          phoneNumber: `+91${inputData.phoneNumber}`,
          otp: otpVal,
        },
        withCredentials: true,
      });
      if (res.status === 200 && !!res.data) {
        await handleFetchUser(res.data.userId);
        if (res.data.isSignup) {
          toggleSignup();
        } else {
          handleClose();
        }
      } else {
        setOtpError(true);
      }
    } catch (err) {
      setOtpError(true);
    }
    setIsLoading(false);
  };

  const updateUser = async (data) => {
    setIsLoading(true);
    try {
      await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/update/user`,
        data: {
          ...data,
          userId: state.user?.id,
        },
        withCredentials: true,
      });
      const updatedData = { ...data };
      delete updatedData.password;
      dispatch({
        type: appActionTypes.UPDATE_LOGGED_IN_USER,
        user: { ...(state.user ?? {}), ...updatedData },
      });
      handleClose();
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const handleModalClose = () => {
    if (!otpReqSuccessful) {
      handleClose();
    }
  };

  const onSubmit = (data) => {
    if (showSignup) {
      updateUser(data);
    } else {
      handleLogin(data);
    }
  };

  return (
    <Dialog
      fullScreen={isMobile}
      open={open}
      onClose={handleModalClose}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : "1em",
          maxWidth: { xs: "100%", md: "380px" },
        },
      }}
    >
      <DialogTitle>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon fontSize="12px" />
          </IconButton>
          <Typography
            variant="subtitle1"
            fontWeight={500}
            sx={{ margin: "0 auto" }}
          >
            Log in or sign up
          </Typography>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ minWidth: { xs: "100%", md: "380px" } }}>
        <Stack
          sx={{ position: "relative", borderRadius: "1em" }}
          spacing={2}
          alignItems="center"
        >
          {(submitting || isLoading) && <Loading />}
          <Typography variant="subtitle1" fontWeight="bold">
            Welcome to Proper Homes
          </Typography>
          {showSignup ? (
            <SignupForm control={control} />
          ) : (
            <LoginForm control={control} isLoginWithOtp={isLoginWithOtp} />
          )}
          {isLoginWithOtp && !otpReqSuccessful && (
            <Button
              aria-label="send otp button"
              variant="contained"
              fullWidth
              color="orange"
              onClick={handleSubmit(handleSendOtp)}
            >
              Send OTP
            </Button>
          )}
          {((!isLoginWithOtp && !otpReqSuccessful) || showSignup) && (
            <Button
              color="orange"
              aria-label={`Submit Login button`}
              variant="contained"
              fullWidth
              onClick={handleSubmit(onSubmit)}
            >
              {showSignup ? "FINISH SIGNUP" : "LOGIN"}
            </Button>
          )}
          {!showSignup && otpReqSuccessful && (
            <>
              <OtpInput
                autoFocus
                value={otp}
                length={4}
                onChange={handleChangeOtp}
                onComplete={handleSubmitOtp}
                TextFieldsProps={{
                  error: otpError,
                  type: "tel",
                  inputmode: "tel",
                }}
              />
              <Typography variant="subtitle1" pt={2} gutterBottom>
                Please enter the otp received to your mobile number.
              </Typography>
            </>
          )}
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <LoginWithTypography onClick={toggleIsLoginWithOtp}>
              Login with {isLoginWithOtp ? "Password" : "OTP"}
            </LoginWithTypography>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
