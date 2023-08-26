"use client";
import { Suspense, lazy, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

import Loading from "@/components/Loading";

const ImageGallery = lazy(() => import("../components/ImageGallery"));

function useImagesModalGallery({ images }) {
  const theme = useTheme();
  const [open, setIsOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  let imageUrls = images.map((i) => i.url ?? i);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveStep((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") handleNext();
      if (event.key === "ArrowLeft") handlePrev();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (imageUrls.length === 0) {
    return null;
  }

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    toggleModal,
    ImageGallery: (
      <Suspense fallback={<Loading />}>
        <ImageGallery
          open={open}
          activeStep={activeStep}
          toggleModal={toggleModal}
          imageUrls={imageUrls}
          handlePrev={handlePrev}
          handleNext={handleNext}
          handleStepChange={handleStepChange}
        />
      </Suspense>
    ),
  };
}

export default useImagesModalGallery;
