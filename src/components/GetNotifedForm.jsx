"use client";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Controller, useForm } from "react-hook-form";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Divider from "@mui/material/Divider";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";

import Loading from "src/components/Loading";

function GetNotifiedFormModal({ open, handleClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const formValues = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup.string().email().required("Email is required"),
        // phoneNumber: yup.string().phone("IN", "Must be a valid mobile number"),
      })
    ),
  });
  const { setError, control, handleSubmit, getValues, reset, formState } =
    formValues;
  const { submitting, isSubmitSuccessful } = formState;

  const handleSubmitData = async (data) => {
    try {
      let body = { ...data, listIds: [3] };
      if (data?.phoneNumber) {
        body = {
          ...body,
          attribs: { phoneNumber: `91${data.phoneNumber}` },
        };
      }
      await axios({
        method: "post",
        url: `/api/listmonk`,
        data: body,
        withCredentials: true,
      });
    } catch (err) {
      setError("password", {
        type: "server",
        message: "Incorrect credentials",
      });
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
            fontWeight={500}
            sx={{ margin: "0 auto" }}
          >
            We will remind you when we are live.
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
          {submitting && <Loading />}
          {isSubmitSuccessful ? (
            <>
              <Typography>Thank you.</Typography>
            </>
          ) : (
            <>
              {" "}
              <Controller
                name="name"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Name"
                    type="text"
                    value={value ?? ""}
                    onChange={onChange}
                    error={!!error?.message}
                    helperText={error?.message ?? ""}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Email"
                    type="text"
                    value={value ?? ""}
                    onChange={onChange}
                    error={!!error?.message}
                    helperText={error?.message ?? ""}
                  />
                )}
              />
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
                    label="Mobile Number (optional)"
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
              <Button
                variant="contained"
                fullWidth
                disabled={submitting}
                onClick={handleSubmit(handleSubmitData)}
              >
                Submit
              </Button>
            </>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default GetNotifiedFormModal;
