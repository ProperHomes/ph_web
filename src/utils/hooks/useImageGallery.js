import { useState } from "react";

import ImageGallery from "@/components/ImageGallery";

function useImageGallery({ images }) {
  const [showImageGallery, setShowImageGallery] = useState(false);
  const toggleGallery = () => {
    setShowImageGallery((prev) => !prev);
  };
  // todo: use thumbnail images
  const formattedImages = images.map((url) => ({
    original: url,
    thumbnail: url,
  }));
  return {
    MediaGallery:
      formattedImages.length > 0 && showImageGallery ? (
        <ImageGallery items={formattedImages} handleClose={toggleGallery} />
      ) : null,
    toggleGallery,
  };
}

export default useImageGallery;
