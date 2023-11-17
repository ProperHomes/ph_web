import { memo } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import Link from "next/link";
import { PROPERTY_TYPE } from "@/utils/constants";

const Description = dynamic(() => import("../profile/Description"));
const CardActions = dynamic(() => import("./CardActions"));
const CardChips = dynamic(() => import("./CardChips"));
const CardTitle = dynamic(() => import("./CardTitle"));

function PropertyCard({
  data,
  isPriority,
  isFullWidth,
  showFavorite = true,
  togglePropertyEditor,
}) {
  const { description, number, slug, media, title, listedFor, type, city } =
    data;

  const images = media?.nodes ?? [];
  const mainImage = images.find((im) => !!im.isCoverImage) ?? images[0];

  const linkHref = `/property/${slug}`;

  const formattedTitle = `${PROPERTY_TYPE[type]?.toLowerCase()} ${
    PROPERTY_TYPE[type] === PROPERTY_TYPE.COMMERCIAL ? "Unit" : ""
  } for ${listedFor?.toLowerCase()} in ${city.toLowerCase()}`;

  return (
    <Stack spacing={1}>
      <Box
        sx={{
          position: "relative",
          width: isFullWidth ? "100%" : "280px",
          height: "280px",
          cursor: "pointer",
          overflow: "hidden",
          borderRadius: "1em",
        }}
      >
        <Link href={linkHref} prefetch={false} title={formattedTitle}>
          <Box
            sx={{
              position: "relative",
              width: isFullWidth ? "100%" : "280px",
              height: "280px",
              borderRadius: "1em",
              [`.property-card-description-${number}`]: {
                visibility: "hidden",
              },
              "&:hover": {
                [`.property-card-img-${number}`]: {
                  transform: "scale(1.1)",
                },
                [`.property-card-description-${number}`]: {
                  visibility: "visible",
                },
              },
            }}
          >
            <Image
              src={mainImage?.media?.signedUrl ?? mainImage?.mediaUrl}
              fill
              priority={isPriority}
              quality={100}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8v3z5JgAHOwLRlUgOqwAAAABJRU5ErkJggg=="
              className={`property-card-img-${number}`}
              sizes="(max-width: 324px) 80vw, (max-width: 1200px) 20vw, 20vw"
              style={{
                transition: "0.4s ease-out",
                backgroundColor: "#000",
                borderRadius: "1em",
                objectFit: "cover",
                objectPosition: "center",
              }}
              alt={`image of ${title}`}
            />

            <Box
              className={`property-card-description-${number}`}
              sx={{
                position: "absolute",
                zIndex: 1,
                bottom: 0,
                padding: "1.5em",
                borderRadius: "1em",
                backgroundColor: "rgba(0,0,0,0.2)",
                height: "100%",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <Description
                content={description}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "5",
                  WebkitBoxOrient: "vertical",
                  marginTop: "50%",
                  color: "#fff",
                  fontSize: "1rem",
                }}
              />
            </Box>
          </Box>
        </Link>

        <CardActions
          data={data}
          showFavorite={showFavorite}
          togglePropertyEditor={togglePropertyEditor}
        />
        <CardChips data={data} />
      </Box>
      <CardTitle data={data} />
    </Stack>
  );
}

export default memo(PropertyCard);
