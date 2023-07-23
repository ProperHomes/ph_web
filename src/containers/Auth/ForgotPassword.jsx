import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import { Controller } from "react-hook-form";

function ForgorPasswordForm({ control }) {
  return (
    <Controller
      name="phoneNumber"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          fullWidth
          variant="outlined"
          label="Mobile Number"
          type="text"
          value={value}
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
  );
}

export default ForgorPasswordForm;
