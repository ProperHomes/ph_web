"use client";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { calculateEmi, getRupees, numWords } from "@/utils/helper";
import SliderComponent from "@/components/Slider";

const inputFields = [
  {
    label: "Loan Amount",
    name: "loanAmount",
    min: 100000,
    max: 10000000,
    unit: "₹",
    steps: 50000,
  },
  {
    label: "Interest Rate % (p.a.)",
    name: "interest",
    min: 5,
    max: 15,
    steps: 0.1,
    unit: "%",
  },
  { label: "Tenure (in years)", name: "tenure" },
];

function EMICalculator() {
  const theme = useTheme();
  const [finalEmi, setFinalEmi] = useState(null);
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        loanAmount: yup.number().required("Loan Amount is required"),
        interest: yup.number().required("Interest Rate is required"),
        tenure: yup.number().required("Tenure is required"),
      })
    ),
    defaultValues: {
      loanAmount: 5000000,
      interest: 8,
      tenure: 30,
    },
  });

  const handleCalculate = (data) => {
    setFinalEmi(calculateEmi(data));
  };

  return (
    <Stack spacing={2} p={4}>
      <Typography
        variant="h1"
        textAlign="center"
        gutterBottom
        sx={{ fontSize: "2rem !important", fontWeight: 700 }}
        color={theme.palette.primary.main}
      >
        Calculate EMI on your home loan!
      </Typography>
      <Paper elevation={2} sx={{ maxWidth: "sm", borderRadius: "1rem" }}>
        <Stack p={4} spacing={4}>
          {inputFields
            .slice(0, 2)
            .map(({ label, name, min, max, steps, unit }) => {
              return (
                <Controller
                  key={name}
                  name={name}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <SliderComponent
                      min={min}
                      max={max}
                      unit={name === "loanAmount" ? "" : unit}
                      amount={
                        name === "loanAmount" ? getRupees(value) : Number(value)
                      }
                      defaultValue={Number(value)}
                      onChange={onChange}
                      value={Number(value)}
                      steps={steps}
                      label={label}
                    />
                  )}
                />
              );
            })}

          <Controller
            name="tenure"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                defaultValue={20}
                value={value}
                onChange={onChange}
                renderValue={(s) => `${s} years`}
              >
                <MenuItem value={5}>5 years</MenuItem>
                <MenuItem value={10}>10 years</MenuItem>
                <MenuItem value={15}>15 years</MenuItem>
                <MenuItem value={20}>20 years</MenuItem>
                <MenuItem value={25}>25 years</MenuItem>
                <MenuItem value={30}>30 years</MenuItem>
              </Select>
            )}
          />

          {!!finalEmi && (
            <Typography
              fontSize="sm"
              fontWeight="bold"
              textTransform="capitalize"
              color={theme.palette.primary.main}
            >
              {getRupees(finalEmi)}
              <br />
              {numWords(finalEmi)} Rupees
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
