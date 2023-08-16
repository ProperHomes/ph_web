"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import ImageModal from "./ImageGallery";

const Grid = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "auto",
  maxHeight: "560px",
  display: "grid",
  gridGap: "0.25rem",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gridAutoFlow: "row dense",
}));

function ImageGrid({ children, images }) {
  const [showImageGallery, setShowImageGallery] = useState(false);
  const toggleGallery = () => {
    setShowImageGallery((prev) => !prev);
  };
  return (
    <>
      <Grid>{children}</Grid>
      <ImageModal
        images={images}
        open={showImageGallery}
        handleClose={toggleGallery}
      />
    </>
  );
}

export default ImageGrid;
