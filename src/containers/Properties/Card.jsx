import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Fade from "@mui/material/Fade";
import Image from "next/image";
import { useTheme } from "@mui/material";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useToggleAuth from "@/utils/hooks/useToggleAuth";
import { PROPERTY_TYPE } from "@/utils/constants";

function PropertyCard({ data, isPriority }) {
  const theme = useTheme();
  const { description, slug, media, title, listedFor, type, price, city } =
    data;
  const images = media?.nodes ?? [];
  const mainImage = images.find((im) => !!im.isCoverImage) ?? images[0];

  const [isHovered, setIsHovered] = useState(false);
  const { Auth, isLoggedIn, toggleAuth } = useToggleAuth();

  const formattedPrice = Number(price).toLocaleString("en-in", {
    style: "currency",
    currency: "INR",
  });

  const toggleOnHover = () => {
    setIsHovered((prev) => !prev);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      toggleAuth();
    } else {
      // Todo: save/remove as favorite
    }
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
          <Box
            sx={{
              position: "relative",
              width: { xs: "100%", md: "280px" },
              height: "280px",
            }}
          >
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
            <Fade in={isHovered}>
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 1,
                  bottom: 0,
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
                  mt="50%"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "5",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {description}
                </Typography>
              </Box>
            </Fade>
          </Box>
        </Link>

        <Fade in={isHovered}>
          <FavoriteIcon
            onClick={handleToggleFavorite}
            sx={{
              color: "rgba(0, 0, 0, 0.5)",
              stroke: "#fff",
              strokeWidth: 2,
              position: "absolute",
              right: 10,
              top: 10,
              zIndex: 1,
            }}
          />
        </Fade>
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
              width: "100%",
              maxWidth: { xs: "100%", md: "280px" },
              color: theme.palette.text.primary,
              fontWeight: 600,
              fontFamily: theme.typography.fontFamily.Raleway,
              textTransform: "capitalize",
              "&:hover": {
                textDecoration: "underline !important",
              },
            }}
          >
            {PROPERTY_TYPE[type].toLowerCase()} for {listedFor.toLowerCase()} in{" "}
            {city}
          </Typography>
        </Link>

        <Typography
          fontSize="1rem"
          fontWeight="bold"
          color={theme.palette.text.primary}
          fontFamily={theme.typography.fontFamily.Roboto}
        >
          {formattedPrice}
        </Typography>
      </Box>
      {Auth}
    </Stack>
  );
}

export default PropertyCard;
