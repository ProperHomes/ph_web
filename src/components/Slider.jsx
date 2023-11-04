"use client";

import { numWords } from "@/utils/helper";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const SliderComponent = ({
  defaultValue,
  min,
  max,
  label,
  unit,
  onChange,
  amount,
  value,
  steps,
}) => {
  return (
    <Stack my={1.4}>
      <Stack gap={1}>
        <Typography variant="subtitle2">{label}</Typography>
        <Typography variant="h5">
          {unit} {amount}
        </Typography>
      </Stack>
      <Slider
        min={min}
        max={max}
        defaultValue={defaultValue}
        aria-label="Default"
        valueLabelDisplay="auto"
        onChange={onChange}
        value={value}
        step={steps}
        marks
      />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="caption" color="text.secondary">
          {unit} {min} ({numWords(min)})
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {unit} {max} ({numWords(max)})
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SliderComponent;
