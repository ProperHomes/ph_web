"use client";
import { useState, memo } from "react";
import { useRouter, usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Fade from "@mui/material/Fade";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import useTheme from "@mui/material/styles/useTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AREA_UNITS, LISTING_TYPE, PROPERTY_TYPE } from "@/utils/constants";
import { useAppContext } from "src/appContext";
import CardOptionsTooltip from "./CardOptions";
import useToggleFavoriteProperty from "src/hooks/useToggleFavoriteProperty";

function PropertyCard({
  data,
  isPriority,
  isFullWidth,
  toggleAuth,
  showFavorite = true,
  togglePropertyEditor,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isDarkMode = theme.palette.mode === "dark";
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
    area,
    areaUnit,
    bedrooms,
    ownerId,
    tenantId,
    currentUserSavedProperties,
  } = data;

  const isDashboardManage = pathname.includes("/dashboard/manage");

  const images = media?.nodes ?? [];
  const mainImage = images.find((im) => !!im.isCoverImage) ?? images[0];

  const currentUserSavedPropertyId = currentUserSavedProperties?.nodes[0]?.id;

  const { handleToggleFavorite, isSaved } = useToggleFavoriteProperty({
    data: { id, ownerId },
    currentUserSavedPropertyId,
    toggleAuth,
  });

  const [isHovered, setIsHovered] = useState(false);
  const [showOwnerActions, setShowOwnerActions] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const onImageLoadComplete = () => {
    setIsImageLoaded(true);
  };

  const formattedPrice = Number(price).toLocaleString("en-in", {
    style: "currency",
    currency: "INR",
  });

  const handleChangePropertyStatus = () => {};

  const handleEditProperty = () => {
    togglePropertyEditor();
  };
  const handleViewPropertyAsPublic = () => {
    router.push(`/property/${slug}`);
  };

  const ownerActionList = [
    { title: "Edit Property", onClick: handleEditProperty },
    { title: "Change Status", onClick: handleChangePropertyStatus },
    { title: "View Property as Public", onClick: handleViewPropertyAsPublic },
  ];

  const toggleOnHover = () => {
    if (!isMobile) {
      setIsHovered((prev) => !prev);
    }
  };

  const toggleOwnerActions = () => {
    setShowOwnerActions((prev) => !prev);
  };

  const isOwner = ownerId === appState.user?.id;

  const linkHref = isDashboardManage
    ? `/dashboard/manage/property/${slug}`
    : `/property/${slug}`;

  const formattedTitle = `${PROPERTY_TYPE[type]?.toLowerCase()} ${
    PROPERTY_TYPE[type] === PROPERTY_TYPE.COMMERCIAL ? "Unit" : ""
  } for ${listedFor?.toLowerCase()} in ${city.toLowerCase()}`;

  return (
    <Stack spacing={1}>
      <Box
        onMouseEnter={toggleOnHover}
        onMouseLeave={toggleOnHover}
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
            }}
          >
            <Skeleton
              variant="rounded"
              sx={{
                "&.MuiSkeleton-root": {
                  borderRadius: "1em",
                  transition: "1s ease",
                  opacity: !isImageLoaded ? 1 : 0,
                },
              }}
              width={"100%"}
              height={280}
            />

            <Image
              src={mainImage?.media?.signedUrl ?? mainImage?.mediaUrl}
              fill
              priority={isPriority}
              quality={100}
              onLoadingComplete={onImageLoadComplete}
              sizes="(max-width: 324px) 80vw, (max-width: 1200px) 280px, 280px"
              style={{
                opacity: isImageLoaded ? 1 : 0,
                backgroundColor: "#000",
                borderRadius: "1em",
                objectFit: "cover",
                objectPosition: "center",
                transition: "0.4s ease-out",
                transform: isHovered && !isMobile ? "scale(1.1)" : "scale(1)",
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
                  fontWeight="regular"
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

        {!isOwner && !tenantId && showFavorite && (
          <Tooltip
            enterDelay={0}
            title={isSaved ? "Remove Saved Property" : "Save Property"}
          >
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
                fill: isSaved ? "red" : "rgba(0, 0, 0, 0.5)",
              }}
            />
          </Tooltip>
        )}

        {isOwner && isDashboardManage && (
          <Box
            sx={{
              position: "absolute",
              right: 10,
              top: 10,
              zIndex: 1,
              backgroundColor: "rgba(0,0,0, 0.6)",
              borderRadius: "50%",
            }}
          >
            <CardOptionsTooltip
              open={showOwnerActions}
              toggleOptions={toggleOwnerActions}
              listItems={ownerActionList}
            />
          </Box>
        )}

        {bedrooms > 0 && (
          <Box
            sx={{
              position: "absolute",
              left: 10,
              top: 15,
              zIndex: 1,
              fontWeight: "medium",
            }}
          >
            <Chip
              sx={{
                backgroundColor: "#00000050",
                "& .MuiChip-label": {
                  fontWeight: 800,
                },
              }}
              color={isDarkMode ? "default" : "secondary"}
              label={`${bedrooms} BHK`}
            />
          </Box>
        )}

        {!!tenantId && (
          <Box
            sx={{
              position: "absolute",
              right: bedrooms > 0 ? 60 : "unset",
              left: bedrooms > 0 ? "unset" : 10,
              top: 15,
              zIndex: 1,
              fontWeight: "medium",
            }}
          >
            <Chip
              sx={{
                backgroundColor: "#00000050",
                "& .MuiChip-label": {
                  fontWeight: 800,
                },
              }}
              color={isDarkMode ? "default" : "secondary"}
              label="Occupied"
            />
          </Box>
        )}
      </Box>

      <Typography
        variant="h2"
        sx={{
          fontSize: "1rem !important",
          width: "100%",
          maxWidth: { xs: "100%", md: "280px" },
          fontWeight: "medium",
          textTransform: "capitalize",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <Link
          href={`/property/${slug}`}
          prefetch={false}
          title={formattedTitle}
        >
          {PROPERTY_TYPE[type]?.toLowerCase()}{" "}
          {PROPERTY_TYPE[type] === PROPERTY_TYPE.COMMERCIAL ? "Unit" : ""} for{" "}
          {listedFor?.toLowerCase()} in {city.toLowerCase()}
        </Link>
      </Typography>

      <Link href={`/property/${slug}`} prefetch={false} title={formattedTitle}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontWeight="bold" color="primary.main">
            {formattedPrice.slice(0, -3)}{" "}
            {listedFor === LISTING_TYPE.RENT ? " monthly " : ""}
          </Typography>
        </Stack>
        <Typography fontWeight={500} fontSize="0.9rem" color="primary.main">
          {area} {AREA_UNITS[areaUnit]}
        </Typography>
      </Link>
    </Stack>
  );
}

export default memo(PropertyCard);
