import { memo } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";
import { PROPERTY_TYPE } from "@/utils/constants";

const CardDescription = dynamic(() => import("./CardDescription"));

function CardImage({ data, isPriority, isFullWidth }) {
  const { description, number, slug, media, title, listedFor, type, city } =
    data;

  const images = media?.nodes ?? [];
  const mainImage = images.find((im) => !!im.isCoverImage) ?? images[0];

  const linkHref = `/property/${slug}`;

  const formattedTitle = `${PROPERTY_TYPE[type]?.toLowerCase()} ${
    PROPERTY_TYPE[type] === PROPERTY_TYPE.COMMERCIAL ? "Unit" : ""
  } for ${listedFor?.toLowerCase()} in ${city.toLowerCase()}`;

  return (
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
              transform: "scale(1.2)",
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
          }}
          alt={`image of ${title}`}
        />

        <CardDescription description={description} number={number} />
      </Box>
    </Link>
  );
}

export default memo(CardImage);
