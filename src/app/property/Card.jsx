"use client";
import { useEffect, useState, memo, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Fade from "@mui/material/Fade";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { useMediaQuery, useTheme } from "@mui/material";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { PROPERTY_TYPE } from "@/utils/constants";
import { DELETE_SAVED_PROPERTY, SAVE_PROPERTY } from "@/graphql/properties";
import { useAppContext } from "src/appContext";
import CustomTooltip from "src/components/CustomTooltip";

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
  const isLoggedIn = !!appState.user?.id;
  const {
    id,
    number,
    description,
    slug,
    media,
    title,
    listedFor,
    type,
    price,
    city,
    bedrooms,
    ownerId,
    tenantId,
    currentUserSavedProperties,
  } = data;

  const isDashboardManage = pathname.includes("/dashboard/manage");

  const images = media?.nodes ?? [];
  const mainImage = images.find((im) => !!im.isCoverImage) ?? images[0];

  const currentUserSavedPropertyId = currentUserSavedProperties?.nodes[0]?.id;

  const [createSavedProperty] = useMutation(SAVE_PROPERTY);
  const [deleteSavedProperty] = useMutation(DELETE_SAVED_PROPERTY);

  const [savedPropertyId, setSavedPropertyId] = useState(false);
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
    { title: "Mark Property", onClick: handleChangePropertyStatus },
    { title: "View Property as Public", onClick: handleViewPropertyAsPublic },
  ];

  useEffect(() => {
    if (currentUserSavedPropertyId) {
      setSavedPropertyId(currentUserSavedPropertyId);
    }
  }, [currentUserSavedPropertyId]);

  const toggleOnHover = () => {
    if (!isMobile) {
      setIsHovered((prev) => !prev);
    }
  };

  const toggleOwnerActions = () => {
    setShowOwnerActions((prev) => !prev);
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

  const isOwner = ownerId === appState.user?.id;

  const linkHref = isDashboardManage
    ? `/dashboard/manage/property/${slug}`
    : `/property/${slug}`;

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
        <Link href={linkHref}>
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
            title={savedPropertyId ? "Remove Saved Property" : "Save Property"}
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
                fill: savedPropertyId ? "red" : "rgba(0, 0, 0, 0.5)",
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
            <CustomTooltip
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

      <Link href={`/property/${slug}`}>
        <Typography
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", md: "280px" },
            fontWeight: "medium",
            textTransform: "capitalize",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {PROPERTY_TYPE[type]?.toLowerCase()} for {listedFor?.toLowerCase()} in{" "}
          {city.toLowerCase()}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            fontWeight="bold"
            color="primary.main"
            suppressHydrationWarning
          >
            {formattedPrice.slice(0, -3)}
          </Typography>
        </Stack>
      </Link>
    </Stack>
  );
}

export default memo(PropertyCard);
