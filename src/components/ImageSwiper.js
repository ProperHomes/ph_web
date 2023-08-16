"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";

import ImageModal from "./ImageGallery";

function ImageSwiper({ images, children }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [showImageGallery, setShowImageGallery] = useState(false);

  const toggleGallery = () => {
    setShowImageGallery((prev) => !prev);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      <Box pb={2} onClick={toggleGallery}>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {children}
        </SwipeableViews>
      </Box>
      <ImageModal
        images={images}
        open={showImageGallery}
        handleClose={toggleGallery}
      />
    </>
  );
}

export default ImageSwiper;
