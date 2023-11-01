"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Controller } from "react-hook-form";

function LoginForm({ control, isLoginWithOtp }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
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
      {!isLoginWithOtp && (
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={value ?? ""}
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
      )}
    </>
  );
}

export default LoginForm;
