"use client";
import Box from "@mui/material/Box";
import useImagesModalGallery from "src/hooks/useImagesModalGallery";

export default function ImageShadowCover({ images }) {
  const { toggleModal, ImageGallery } = useImagesModalGallery({ images });
  return (
    <>
      <Box
        onClick={toggleModal}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          transition: "0.3s ease",
          borderRadius: "1em",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "#00000050",
          },
        }}
      />
      {ImageGallery}
    </>
  );
}
