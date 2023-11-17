"use client";
import Image from "next/image";
import SwipeableViews from "react-swipeable-views";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import useTheme from "@mui/material/styles/useTheme";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Close from "@mui/icons-material/Close";

function ImageGallery({
  open,
  imageUrls,
  toggleModal,
  activeStep,
  handleStepChange,
  handleNext,
  handlePrev,
}) {
  const theme = useTheme();
  return (
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
                borderRadius: "1rem",
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
                  width: "fit-content",
                  height: "80%",
                  objectFit: "contain",
                  objectPosition: "center",
                  borderRadius: "1rem",
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
  );
}

export default ImageGallery;
