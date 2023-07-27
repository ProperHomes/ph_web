import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
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
import { DELETE_SAVED_PROPERTY, SAVE_PROPERTY } from "./graphql";
import { useAppContext } from "src/appContext";

function PropertyCard({ data, isPriority }) {
  const theme = useTheme();
  const { state: appState } = useAppContext();
  const {
    id,
    description,
    slug,
    media,
    title,
    listedFor,
    type,
    price,
    city,
    currentUserSavedProperties,
  } = data;

  const images = media?.nodes ?? [];
  const mainImage = images.find((im) => !!im.isCoverImage) ?? images[0];

  const currentUserSavedPropertyId = currentUserSavedProperties?.nodes[0]?.id;

  const [createSavedProperty] = useMutation(SAVE_PROPERTY);
  const [deleteSavedProperty] = useMutation(DELETE_SAVED_PROPERTY);

  const [savedPropertyId, setSavedPropertyId] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { Auth, isLoggedIn, toggleAuth } = useToggleAuth();

  const formattedPrice = Number(price).toLocaleString("en-in", {
    style: "currency",
    currency: "INR",
  });

  useEffect(() => {
    if (currentUserSavedPropertyId) {
      setSavedPropertyId(currentUserSavedPropertyId);
    }
  }, [currentUserSavedPropertyId]);

  const toggleOnHover = () => {
    setIsHovered((prev) => !prev);
  };

  const toggleSaveProperty = async () => {
    try {
      if (savedPropertyId) {
        await deleteSavedProperty({
          variables: { input: { id: savedPropertyId } },
        });
        setSavedPropertyId(null);
      } else {
        const { data } = await createSavedProperty({
          variables: {
            input: {
              savedProperty: { propertyId: id, userId: appState.user?.id },
            },
          },
        });
        setSavedPropertyId(data?.createSavedProperty?.savedProperty?.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      toggleAuth();
    } else {
      toggleSaveProperty();
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
          overflow: "hidden",
          borderRadius: "1em",
        }}
      >
        <Link href={`/property/${slug}`}>
          <Box
            sx={{
              position: "relative",
              width: { xs: "100%", md: "280px" },
              height: "280px",
              borderRadius: "1em",
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
                transition: "0.4s ease",
                transform: isHovered ? "scale(1.1)" : "scale(1)",
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
              fill: savedPropertyId ? "red" : "rgba(0, 0, 0, 0.5)",
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
          {formattedPrice.slice(0, -3)}
        </Typography>
      </Box>
      {Auth}
    </Stack>
  );
}

export default PropertyCard;
