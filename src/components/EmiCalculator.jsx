import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { calculateEmi, numWords } from "@/utils/helper";

const inputFields = [
  { label: "Principal Amount", name: "principal" },
  { label: "Tenure (in years)", name: "tenure" },
  { label: "Interest Rate % (p.a.)", name: "interest" },
];

function EMICalculator() {
  const theme = useTheme();
  const [finalEmi, setFinalEmi] = useState(null);
  const { control, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        principal: yup.number().required("Principal is required"),
        tenure: yup.number().required("Tenure is required"),
        interest: yup.number().required("Interest is required"),
      })
    ),
    defaultValues: {
      principal: "5000000",
      tenure: "20",
      interest: "6.0",
    },
  });

  const handleCalculate = (data) => {
    setFinalEmi(calculateEmi(data));
    reset();
  };

  return (
    <Stack spacing={2} mx={2} sx={{ maxWidth: "sm" }}>
      <Typography variant="h4" color={theme.palette.primary.main}>
        Calculate your EMI on your home loan!
      </Typography>
      <Paper elevation={2}>
        <Stack p={4} spacing={4}>
          {inputFields.map(({ label, name }) => {
            return (
              <Controller
                key={name}
                name={name}
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    fullWidth
                    variant="standard"
                    label={label}
                    type="number"
                    value={value}
                    onChange={onChange}
                    error={!!error?.message}
                    helperText={error?.message ?? ""}
                  />
                )}
              />
            );
          })}

          {!!finalEmi && (
            <Typography
              fontSize="sm"
              fontWeight="bold"
              textTransform="capitalize"
              color={theme.palette.primary.main}
            >
              {finalEmi.toLocaleString("en-in", {
                style: "currency",
                currency: "INR",
              })}
              <br />
              {numWords(finalEmi)}
            </Typography>
          )}
          <Button
            size="large"
            variant="contained"
            onClick={handleSubmit(handleCalculate)}
          >
            Calculate
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default EMICalculator;
