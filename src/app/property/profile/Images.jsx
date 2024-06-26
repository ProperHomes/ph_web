import Image from "next/image";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";

import { ImageGrid } from "./styles";

const Swiper = dynamic(() => import("../../../components/Swiper"));
const ImageShadowCover = dynamic(() => import("./ImageShadowCover"), {
  ssr: false,
});
const ViewAllImages = dynamic(() => import("./ViewAllImages"), {
  ssr: false,
});

function PropertyImages({ images }) {
  let coverImage = images.find((im) => !!im.isCoverImage);
  let otherImages = images.slice(1);
  if (!!coverImage) {
    otherImages = images.filter((im) => !im.isCoverImage);
  } else {
    coverImage = images[0];
  }

  const imagesToLoad = [coverImage, ...otherImages];

  return (
    <>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "relative",
          borderRadius: "10px",
          maxHeight: "280px",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <Swiper>
          {imagesToLoad.map(({ url }, i) => {
            return (
              <Image
                key={i}
                src={url}
                alt=""
                priority={i === 0}
                quality={100}
                width={280}
                height={280}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8v3z5JgAHOwLRlUgOqwAAAABJRU5ErkJggg=="
                style={{
                  width: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  cursor: "pointer",
                }}
              />
            );
          })}
        </Swiper>
        <ViewAllImages
          images={imagesToLoad}
          btnProps={{ variant: "contained", size: "medium" }}
          btnStyle={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "#fff",
            borderColor: "#fafafa4d",
            borderRadius: "1em",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Box>

      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <ImageGrid>
          {imagesToLoad.map(({ url }, i) => {
            const isLastImage = i === 4;
            return (
              <Box
                key={url}
                sx={{
                  gridColumn: `${i === 0 ? "span 2 / span 2" : "auto"}`,
                  gridRow: `${i === 0 ? "span 2 / span 2" : "auto"}`,
                  cursor: "pointer",
                  position: "relative",
                  height: i === 0 ? "560px" : "280px",
                }}
              >
                <Image
                  alt="property image"
                  src={url}
                  priority
                  quality={100}
                  fill
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8v3z5JgAHOwLRlUgOqwAAAABJRU5ErkJggg=="
                  sizes={
                    i === 0
                      ? "(max-width: 324px) 80vw, (min-width: 1200px) 40vw, 40vw"
                      : "(max-width: 324px) 80vw, (min-width: 1200px) 20vw, 20vw"
                  }
                  style={{
                    objectFit: "cover",
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

                <ImageShadowCover
                  images={imagesToLoad}
                  noToggle={isLastImage}
                />

                {isLastImage && (
                  <ViewAllImages
                    images={imagesToLoad}
                    btnProps={{ variant: "contained", size: "large" }}
                    btnStyle={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "#fff",
                      fontWeight: 800,
                      borderColor: "#fafafa4d",
                      borderRadius: "1em",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )}
              </Box>
            );
          })}
        </ImageGrid>
      </Box>
    </>
  );
}

export default PropertyImages;
