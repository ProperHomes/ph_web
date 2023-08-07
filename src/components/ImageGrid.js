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

function ImageGrid({ images }) {
  const [showImageGallery, setShowImageGallery] = useState(false);
  const toggleGallery = () => {
    setShowImageGallery((prev) => !prev);
  };
  return (
    <>
      <Grid>
        {images.map((url, i) => (
          <Box
            key={url}
            onClick={toggleGallery}
            sx={{
              gridColumn: `${i === 0 ? "span 2 / span 2" : "auto"}`,
              gridRow: `${i === 0 ? "span 2 / span 2" : "auto"}`,
              cursor: "pointer",
              objectFit: "cover",
            }}
          >
            <img
              alt=""
              src={url}
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                borderRadius:
                  i === 0
                    ? "1em 0 0 1em"
                    : i === 2
                    ? "0 1em 0 0"
                    : i === 4
                    ? "0 0 1em 0"
                    : 0,
              }}
            />
          </Box>
        ))}
      </Grid>
      <ImageModal
        images={images}
        open={showImageGallery}
        handleClose={toggleGallery}
      />
    </>
  );
}

export default ImageGrid;
