import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Fade from "@mui/material/Fade";
import Image from "next/image";
import { useTheme } from "@mui/material";
import Link from "next/link";
import { getPropertyUrl } from "@/utils/helper";

function PropertyCard({ data, isPriority }) {
  const theme = useTheme();
  const { slug, description, media, title, listedFor, type, price, city } =
    data;
  const images = media?.nodes ?? [];
  const mainImage = images.find((im) => !!im.isCoverImage) ?? images[0];

  const [isHovered, setIsHovered] = useState(false);

  const formattedPrice = Number(price).toLocaleString("en-in", {
    style: "currency",
    currency: "INR",
  });

  const toggleOnHover = () => {
    setIsHovered((prev) => !prev);
  };

  return (
    <Stack spacing={1}>
      <Box
        onMouseEnter={toggleOnHover}
        onMouseLeave={toggleOnHover}
        sx={{
          position: "relative",
          width: { xs: "100%", md: "280px" },
          height: "280px",
          cursor: "pointer",
        }}
      >
        <Link href={`/property/${slug}`}>
          <Image
            src={mainImage?.media?.signedUrl ?? mainImage?.mediaUrl}
            fill
            priority={isPriority}
            quality={100}
            sizes="(max-width: 324px) 80vw, (max-width: 1200px) 20vw, 10vw"
            style={{
              backgroundColor: "#000",
              borderRadius: "1em",
              objectFit: "cover",
              objectPosition: "center",
            }}
            alt={`image of ${title}`}
          />
        </Link>
      </Box>

      <Box>
        <Link
          href={`/property/${slug}`}
          sx={{
            cursor: "pointer",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontWeight: "bold",
          }}
        >
          <Typography
            sx={{
              fontFamily: theme.typography.fontFamily.Raleway,
              textTransform: "capitalize",
              "&:hover": {
                textDecoration: "underline !important",
              },
            }}
          >
            {type.toLowerCase()} for {listedFor.toLowerCase()} in {city}
          </Typography>
        </Link>

        <Typography
          fontSize="1rem"
          fontWeight="bold"
          fontFamily={theme.typography.fontFamily.Roboto}
        >
          {formattedPrice}
        </Typography>
      </Box>
    </Stack>
  );
}

export default PropertyCard;
