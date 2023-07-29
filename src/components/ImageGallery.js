import { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Close from "@mui/icons-material/Close";

function ImageModal({ images, open, handleClose, activeIndex }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

  return (
    <Dialog
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      }}
      open={open}
      onClose={handleClose}
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
                width: "100%",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                id="fullScreenModalImage"
                src={url}
                alt=""
                style={{
                  width: isMobile ? "100%" : "60%",
                  height: "auto",
                  objectFit: "contain",
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  borderRadius: "10px",
                }}
              />
            </Box>
          );
        })}
      </SwipeableViews>
      <IconButton
        onClick={handleClose}
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
  );
}

export default ImageModal;
