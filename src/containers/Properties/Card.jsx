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

function PropertyCard({ data, isPriority }) {
  const theme = useTheme();
  const { slug, media, title, listedFor, type, price, city } = data;
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

  const handleToggleFavorite = () => {
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

        <Fade in={isHovered}>
          <Box
            onClick={handleToggleFavorite}
            sx={{
              position: "absolute",
              right: 10,
              top: 10,
              zIndex: 1,
            }}
          >
            <FavoriteIcon
              sx={{
                color: "rgba(0, 0, 0, 0.5)",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </Box>
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
              color: theme.palette.text.primary,
              fontWeight: 600,
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
