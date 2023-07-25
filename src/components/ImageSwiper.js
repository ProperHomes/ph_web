import { useState } from "react";
import Box from "@mui/material/Box";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";

function ImageSwiper({ images }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveStep((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box pb={2}>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((url) => {
          return (
            <Box
              key={url}
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <img
                src={url}
                alt=""
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "10px",
                }}
              />
            </Box>
          );
        })}
      </SwipeableViews>
    </Box>
  );
}

export default ImageSwiper;
