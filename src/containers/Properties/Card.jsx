import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Fade from "@mui/material/Fade";
import Image from "next/image";
import { useTheme } from "@mui/material";
import Link from "next/link";
import { getPropertyUrl } from "@/utils/helper";

function PropertyCard({ data }) {
  const theme = useTheme();
  const { slug, title, description, media, type, price, city } = data;
  const images = media?.nodes ?? [];
  const mainImage = images.find((im) => !!im.isCoverImage) ?? images[0];

  const [showDescription, setShowDescription] = useState(false);

  const formattedPrice = Number(price).toLocaleString("en-in", {
    style: "currency",
    currency: "INR",
  });

  const toggleOnHover = () => {
    setShowDescription((prev) => !prev);
  };

  return (
    <Stack spacing={4} alignItems="center">
      <Box
        onMouseEnter={toggleOnHover}
        onMouseLeave={toggleOnHover}
        sx={{
          position: "relative",
          width: { xs: "100%", md: "280px" },
          height: "300px",
          cursor: "pointer",
        }}
      >
        <Image
          src={mainImage?.media?.signedUrl ?? mainImage?.mediaUrl}
          fill
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

        <Fade in={showDescription}>
          <Box
            sx={{
              position: "absolute",
              zIndex: 1,
              padding: "1.5em",
              borderRadius: "1em",
              backgroundColor: "rgba(0,0,0,0.2)",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Typography
              fontSize="1em"
              color="#fff"
              fontWeight="semibold"
              fontFamily={theme.typography.fontFamily.Manrope}
              mt="30%"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "6",
                WebkitBoxOrient: "vertical",
              }}
            >
              {description}
            </Typography>
          </Box>
        </Fade>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Link
          href={`/property/${slug}`}
          sx={{
            cursor: "pointer",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontWeight: "bold",
            fontFamily: theme.typography.fontFamily.Raleway,
            "&:hover": {
              textDecoration: "underline !important",
            },
          }}
        >
          {title}
        </Link>
        <Typography
          gutterBottom
          fontSize="0.9rem"
          fontWeight="semibold"
          fontFamily={theme.typography.fontFamily.Raleway}
        >
          {type} in <b>{city}</b>
        </Typography>

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
