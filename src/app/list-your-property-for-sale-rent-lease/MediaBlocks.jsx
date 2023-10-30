"use client";
import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";

const Container = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "1em",
  gridTemplateColumns: "repeat(3, 1fr)",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
  },
}));

const AddPicture = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "118px",
  height: "118px",
  borderRadius: "8px",
  cursor: "pointer",
  position: "relative",
  border: "1px solid #fff",
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.common.white
      : theme.palette.common.black,
}));

function MediaBlocks({ handleUpdateMedia, media }) {
  const MAX_LIMIT = 10;
  const inputRef = useRef();

  const [imagesLoaded, setImagesLoaded] = useState([]);

  const existingMedia = media?.nodes?.map((m) => ({
    id: m?.id,
    mediaId: m?.mediaId,
    preview: m?.mediaUrl ?? m?.media?.signedUrl,
  }));

  useEffect(() => {
    if (existingMedia?.length > 0) {
      setImagesLoaded(existingMedia);
      handleUpdateMedia(existingMedia);
    }
  }, [existingMedia?.length]);

  const handleClickChangePic = () => {
    inputRef?.current?.click();
  };
  const handleInputImages = (e) => {
    const images = e.target.files;
    if (images && images.length > 0) {
      setImagesLoaded((prev) => {
        const updatedImages = [...prev];
        for (const img of images) {
          updatedImages.push({
            preview: URL.createObjectURL(img),
            file: img,
          });
        }
        if (handleUpdateMedia) {
          handleUpdateMedia(updatedImages);
        }
        return updatedImages;
      });
    }
  };

  const handleRemoveImg = (index) => () => {
    const updatedImages = [...(imagesLoaded ?? [])];
    updatedImages.splice(index, 1);
    setImagesLoaded(() => {
      if (handleUpdateMedia) {
        handleUpdateMedia(updatedImages);
      }
      return updatedImages;
    });
  };

  return (
    <Container>
      {imagesLoaded.map((img, i) => (
        <AddPicture key={i}>
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              cursor: "pointer",
              backgroundColor: "#626262",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              zIndex: 1,
            }}
            onClick={handleRemoveImg(i)}
          >
            <Close sx={{ fontSize: "1em", margin: "0 auto" }} />
          </Box>

          <img
            alt=""
            src={img.preview ?? img.url}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: img ? 1 : 0,
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </AddPicture>
      ))}

      {imagesLoaded?.length <= MAX_LIMIT && (
        <AddPicture onClick={handleClickChangePic}>
          <Add sx={{ color: "#515050" }} />
          <input
            ref={inputRef}
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={handleInputImages}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
            }}
          />
        </AddPicture>
      )}
    </Container>
  );
}

export default MediaBlocks;
