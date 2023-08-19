"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import SwipeableViews from "react-swipeable-views";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Close from "@mui/icons-material/Close";

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
    ImageGallery: open ? (
      <Dialog
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
        open={open}
        onClose={toggleModal}
        fullScreen
      >
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {imageUrls.map((url) => {
            return (
              <Box
                key={url}
                sx={{
                  position: "relative",
                  width: "100vw",
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  id="fullScreenModalImage"
                  src={url}
                  alt=""
                  quality={100}
                  width={500}
                  height={500}
                  style={{
                    width: "80%",
                    height: "80%",
                    objectFit: "contain",
                    objectPosition: "center",
                    borderRadius: "10px",
                  }}
                />
              </Box>
            );
          })}
        </SwipeableViews>
        <IconButton
          onClick={toggleModal}
          sx={{
            border: "1px solid",
            borderRadius: "50%",
            borderColor: theme.palette.background.default,
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        >
          <Close htmlColor="#fff" />
        </IconButton>
        {imageUrls.length > 1 && (
          <Stack>
            <IconButton
              id="fullscreenModalPrevBtn"
              onClick={handlePrev}
              sx={{
                border: "1px solid",
                borderRadius: "50%",
                borderColor: theme.palette.background.default,
                position: "absolute",
                top: "50%",
                left: 10,
                transform: "translateY(-50%)",
              }}
            >
              <KeyboardArrowLeft htmlColor="#fff" />
            </IconButton>
            <IconButton
              id="fullscreenModalNextBtn"
              onClick={handleNext}
              sx={{
                border: "1px solid",
                borderRadius: "50%",
                borderColor: theme.palette.background.default,
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                right: 10,
              }}
            >
              <KeyboardArrowRight htmlColor="#fff" />
            </IconButton>
          </Stack>
        )}
      </Dialog>
    ) : null,
  };
}

export default useImagesModalGallery;
