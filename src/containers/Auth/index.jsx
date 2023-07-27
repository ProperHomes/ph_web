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
import { useLazyQuery, gql } from "@apollo/client";

import SignupForm from "./Signup";
import LoginForm from "./Login";
import ForgorPasswordForm from "./ForgotPassword";
import Loading from "@/components/Loading";
import { passwordRules } from "@/utils/helper";
import { useAppContext } from "src/appContext";

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
  fontFamily: theme.typography.fontFamily.Manrope,
  fontWeight: "500",
  color: theme.palette.primary,
  textDecoration: "underline",
  cursor: "pointer",
  fontSize: "0.9rem",
}));

const FETCH_USER_BY_PHONE = gql`
  query user($phoneNumber: String!) {
    userByPhoneNumber(phoneNumber: $phoneNumber) {
      id
      phoneNumber
    }
  }
`;

function AuthModal({ open, handleClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpReqSuccessful, setOtpReqSuccesful] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setForgotPassword] = useState(false);

  const [getUserByPhone] = useLazyQuery(FETCH_USER_BY_PHONE);

  const { handleFetchUser } = useAppContext();

  const resolvers = {
    signup: {
      name: yup.string().required("Name is required"),
      password: passwordRules,
    },
    forgotPassword: {
      phoneNumber: yup
        .string()
        .phone("IN", "Must be a valid phone number")
        .required("Phone number is required"),
    },
    login: isLoginWithOtp
      ? {
          phoneNumber: yup
            .string()
            .phone("IN", "Must be a valid phone number")
            .required("Phone number is required"),
        }
      : {
          phoneNumber: yup
            .string()
            .phone("IN", "Must be a valid phone number")
            .required("Phone number is required"),
          password: yup.string().required("Password is required"),
        },
  };

  const resolverObj =
    resolvers[
      showSignup ? "signup" : showForgotPassword ? "forgotPassword" : "login"
    ];

  const formValues = useForm({
    resolver: yupResolver(yup.object().shape(resolverObj)),
  });
  const { setError, control, handleSubmit, getValues, reset, formState } =
    formValues;
  const { isSubmitSuccessful, submitting } = formState;

  const toggleForgotPassword = () => {
    setForgotPassword((prev) => !prev);
    if (showLogin) {
      setShowLogin(false);
    }
    reset();
  };

  const toggleIsLoginWithOtp = () => {
    setIsLoginWithOtp((prev) => !prev);
    reset();
  };

  const toggleLogin = () => {
    setShowLogin((prev) => !prev);
    if (showSignup) {
      setShowSignup(false);
    }
    if (showForgotPassword) {
      setForgotPassword(false);
    }
    reset();
  };

  const toggleSignup = () => {
    setShowSignup((prev) => !prev);
    if (showLogin) {
      setShowLogin(false);
    }
    if (showForgotPassword) {
      setForgotPassword(false);
    }
    reset();
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
      console.log(res);
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

  const handleSignup = (data) => {};

  const handleForgotpassword = (data) => {};

  const handleSendOtp = async (data) => {
    let existsAlready = false;
    try {
      const res = await getUserByPhone({
        variables: {
          phoneNumber: `91${data.phoneNumber}`,
        },
      });
      existsAlready = !!res?.data?.userByPhoneNumber?.id;
    } catch (err) {
      setError("phoneNumber", {
        type: "server",
        message: err?.response?.data?.error ?? "",
      });
    }

    if (existsAlready) {
      try {
        await axios({
          method: "post",
          url: `${process.env.NEXT_PUBLIC_API_URL}/auth/phonenumber/sendotp`,
          data: {
            phoneNumber: `91${data.phoneNumber}`,
            isCandidate,
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
    } else {
      setError("phoneNumber", {
        type: "server",
        message: `Account doesn't exist. Please create an account first.`,
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
          phoneNumber: `91${inputData.phoneNumber}`,
          otp: otpVal,
        },
        withCredentials: true,
      });
      if (res.status === 200 && !!res.data) {
        await handleFetchUser(res.data.userId);
      } else {
        setOtpError(true);
      }
    } catch (err) {
      setOtpError(true);
    }
    setIsLoading(false);
  };

  const onSubmit = (data) => {
    if (showForgotPassword) {
      handleForgotpassword(data);
    } else if (showSignup) {
      handleSignup(data);
    } else {
      handleLogin(data);
    }
  };

  return (
    <Dialog
      fullScreen={isMobile}
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { borderRadius: isMobile ? 0 : "1em" } }}
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
            fontFamily={theme.typography.fontFamily.Manrope}
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
          <Typography
            variant="subtitle1"
            fontFamily={theme.typography.fontFamily.Manrope}
            fontWeight="bold"
          >
            Welcome to Proper Homes
          </Typography>
          {showLogin && (
            <LoginForm control={control} isLoginWithOtp={isLoginWithOtp} />
          )}
          {showSignup && !showForgotPassword && (
            <SignupForm control={control} />
          )}
          {showForgotPassword && <ForgorPasswordForm control={control} />}
          {isLoginWithOtp &&
            (!otpReqSuccessful ? (
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit(handleSendOtp)}
              >
                Send otp
              </Button>
            ) : (
              <OtpInput
                value={otp}
                length={4}
                onChange={handleChangeOtp}
                onComplete={handleSubmitOtp}
                TextFieldsProps={{
                  error: otpError,
                }}
              />
            ))}
          {!isLoginWithOtp && (
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit(onSubmit)}
            >
              {showSignup ? "Signup" : showForgotPassword ? "Submit" : "Login"}
            </Button>
          )}
          {!showForgotPassword && !showSignup && (
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <LoginWithTypography onClick={toggleIsLoginWithOtp}>
                Login with {isLoginWithOtp ? "Password" : "OTP"}
              </LoginWithTypography>
              <LoginWithTypography onClick={toggleForgotPassword}>
                Forgot Password?
              </LoginWithTypography>
            </Stack>
          )}
          <Typography
            sx={{ cursor: "pointer" }}
            onClick={showLogin ? toggleSignup : toggleLogin}
          >
            {showLogin
              ? "Don't have an account yet ? "
              : showForgotPassword
              ? "Back"
              : "Already have an account ?"}
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
