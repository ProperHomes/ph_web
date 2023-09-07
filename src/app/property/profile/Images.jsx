"use client";
import { useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";

import { ImageGrid } from "./styles";

import Swiper from "@/components/Swiper";
import useImagesModalGallery from "src/hooks/useImagesModalGallery";

function PropertyImages({ images }) {
  const { toggleModal, ImageGallery } = useImagesModalGallery({ images });
  const [imagesLoaded, setImagesLoaded] = useState([]);

  const handleLoadingComplete = (index) => () => {
    setImagesLoaded((prev) => [...prev, index]);
  };

  return (
    <>
      {ImageGallery}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "relative",
          borderRadius: "10px",
          maxHeight: "280px",
          overflow: "hidden",
        }}
      >
        <Swiper images={images}>
          {images.map((url, i) => {
            const isLoaded = imagesLoaded.includes(i);
            return (
              <Box key={i}>
                {!isLoaded && (
                  <Skeleton
                    variant="rounded"
                    width={450}
                    height={280}
                    animation={false}
                  />
                )}
                <Image
                  src={url}
                  onClick={toggleModal}
                  alt=""
                  priority
                  quality={100}
                  width={450}
                  height={280}
                  onLoadingComplete={handleLoadingComplete(i)}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    cursor: "pointer",
                  }}
                />
              </Box>
            );
          })}
        </Swiper>
        <Button
          size="small"
          variant="outlined"
          sx={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "#fff",
            borderColor: "#fafafa4d",
            borderRadius: "1em",
            transform: "translate(-50%, -50%)",
          }}
          onClick={toggleModal}
        >
          View All Photos
        </Button>
      </Box>

      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <ImageGrid images={images}>
          {images.map((url, i) => {
            const isLoaded = imagesLoaded.includes(i);
            return (
              <Box
                key={url}
                sx={{
                  gridColumn: `${i === 0 ? "span 2 / span 2" : "auto"}`,
                  gridRow: `${i === 0 ? "span 2 / span 2" : "auto"}`,
                  cursor: "pointer",
                }}
              >
                {!isLoaded && (
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height="100%"
                    animation={false}
                    sx={{
                      "&.MuiSkeleton-root": {
                        width: i === 0 ? 560 : 400,
                        height: i === 0 ? 560 : 280,
                        borderRadius:
                          i === 0
                            ? "1em 0 0 1em"
                            : i === 2
                            ? "0 1em 0 0"
                            : i === 4
                            ? "0 0 1em 0"
                            : 0,
                      },
                    }}
                  />
                )}
                <Image
                  alt=""
                  onClick={toggleModal}
                  src={url}
                  priority
                  quality={100}
                  width={i === 0 ? 560 : 400}
                  height={i === 0 ? 560 : 280}
                  onLoadingComplete={handleLoadingComplete(i)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: isLoaded ? 1 : 0,
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
            );
          })}
        </ImageGrid>
      </Box>
    </>
  );
}

export default PropertyImages;
