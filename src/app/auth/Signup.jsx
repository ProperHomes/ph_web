"use client";
import { useState } from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import styled from "@mui/material/styles/styled";
import { ALL_CITIES } from "@/utils/constants";

const StyledSelect = styled(Select)(({ theme, error }) => ({
  fontWeight: 500,
  fontSize: "0.8rem",
  "& fieldset": {
    borderColor: error ? "red" : theme.palette.grey[300],
  },
}));

function SignupForm({ control }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            fullWidth
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
        name="phoneNumber"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <TextField
              fullWidth
              variant="outlined"
              label="Mobile Number"
              inputMode="tel"
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
          );
        }}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            error={!!error?.message}
            helperText={error?.message ?? ""}
            InputProps={{
              style: { padding: 0 },
              endAdornment: (
                <IconButton onClick={toggleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
        )}
      />

      <Controller
        name="city"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <StyledSelect
            displayEmpty
            fullWidth
            renderValue={(selected) => {
              if (!selected) {
                return <Typography>Select Your City</Typography>;
              }
              return selected;
            }}
            value={value ?? ""}
            onChange={onChange}
            error={!!error?.message}
          >
            <MenuItem value="" disabled>
              Select one from below
            </MenuItem>

            {ALL_CITIES.map((city) => {
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
    </>
  );
}

export default SignupForm;
