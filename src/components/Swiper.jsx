"use client";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import useTheme from "@mui/material/styles/useTheme";

function Swiper({ children }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <SwipeableViews
      axis={theme.direction === "rtl" ? "x-reverse" : "x"}
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
    >
      {children}
    </SwipeableViews>
  );
}

export default Swiper;
