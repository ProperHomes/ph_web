"use client";
import Button from "@mui/material/Button";
import useImagesModalGallery from "src/hooks/useImagesModalGallery";

export default function ViewAllImages({ btnStyle, btnProps, images }) {
  const { toggleModal, ImageGallery } = useImagesModalGallery({ images });
  return (
    <>
      <Button
        size="small"
        variant="outlined"
        sx={{
          ...(btnStyle ?? {}),
        }}
        {...(btnProps ?? {})}
        onClick={toggleModal}
      >
        View All Photos
      </Button>
      {ImageGallery}
    </>
  );
}
