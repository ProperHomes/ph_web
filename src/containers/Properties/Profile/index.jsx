import { useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import StickyBox from "react-sticky-box";

import ImageSwiper from "@/components/ImageSwiper";
import ImageGrid from "@/components/ImageGrid";
import ImageModal from "@/components/ImageGallery";
import SellerInfoCard from "../Sidebar/SellerInfoCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { LISTING_TYPE } from "@/utils/constants";
import Sidebar from "../Sidebar";
import { Divider } from "@mui/material";

const Content = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "2em",
  gridTemplateColumns: "1fr 300px",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

function PropertyProfile({ data }) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showImageGallery, setShowImageGallery] = useState(false);
  const toggleGallery = () => {
    setShowImageGallery((prev) => !prev);
  };
  const {
    title,
    description,
    bedrooms,
    bathrooms,
    area,
    price,
    media,
    city,
    facing,
    isFurnished,
    hasParking,
    hasSwimmingPool,
    listedFor,
    type,
  } = data ?? {};
  const images = (media?.nodes ?? []).map((m) => {
    return m.media?.signedUrl ?? m.mediaUrl;
  });

  const isForSale = listedFor === LISTING_TYPE.SALE;

  const formattedPrice = Number(price).toLocaleString("en-in", {
    style: "currency",
    currency: "INR",
  });

  const importantInfo = [
    { label: "", value: type },
    { label: "Bedrooms", value: bedrooms },
    { label: "Bathrooms", value: bathrooms },
    { label: "Area", value: area },
    { label: "Facing", value: facing },
    { label: isFurnished ? "Furnished" : "Not Furnished", value: "" },
    {
      label: hasParking ? "Parking Facility" : "No Parking",
      value: "",
    },
    {
      label: hasSwimmingPool ? "Swimming Pool" : "No Swimming Pool",
      value: facing,
    },
  ];

  return (
    <Stack p={1} spacing={2}>
      <Breadcrumbs
        links={[
          { label: "list", path: "/list" },
          {
            label: `${type}s For ${isForSale ? "Sale" : "Rent"}`,
            path: `/list/${type?.toLowerCase()}s-for-${
              isForSale ? "sale" : "rent"
            }`,
          },
          {
            label: city,
            path: `/list/${type?.toLowerCase()}s-for-${
              isForSale ? "sale" : "rent"
            }/${city?.toLowerCase()}`,
          },
        ]}
      />
      {isMobile && <ImageSwiper images={images} onClick={toggleGallery} />}
      {!isMobile && <ImageGrid images={images} onClick={toggleGallery} />}

      <Content>
        <Stack spacing={2} p={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h1"
              fontSize={{ xs: "1.4rem !important", md: "2.5rem !important" }}
              fontWeight={600}
              color={theme.palette.text.primary}
              fontFamily={theme.typography.fontFamily.Manrope}
              textTransform="capitalize"
            >
              {title?.toLowerCase()}
            </Typography>
            <Button
              size="large"
              variant="contained"
              disableRipple
              sx={{
                width: { xs: "150px", md: "200px" },
                whiteSpace: "nowrap",
                fontWeight: 600,
                fontSize: "1rem",
                fontFamily: theme.typography.fontFamily.Monsterrat,
                borderRadius: "1rem",
              }}
            >
              ₹{formattedPrice.slice(0, -3)}
            </Button>
          </Stack>
          <Divider />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1em",

              [theme.breakpoints.down("md")]: {
                gridTemplateColumns: "1fr 1fr",
              },
            }}
          >
            {importantInfo.map(({ label, value }) => {
              return (
                <Button
                  key={label}
                  size="large"
                  disableRipple
                  sx={{
                    whiteSpace: "nowrap",
                    fontWeight: 600,
                    fontFamily: theme.typography.fontFamily.Monsterrat,
                    borderRadius: "0.5rem",
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "0.8rem",
                    },
                  }}
                  variant="outlined"
                >
                  {value} {label}
                </Button>
              );
            })}
          </Box>
          <Divider />
          <Typography
            variant="body"
            color={theme.palette.text.primary}
            fontFamily={theme.typography.fontFamily.Manrope}
          >
            {description}
          </Typography>
        </Stack>

        {!isMobile && (
          <StickyBox
            offsetTop={150}
            offsetBottom={20}
            style={{
              maxHeight: "250px",
            }}
          >
            <Sidebar data={data} />
          </StickyBox>
        )}
      </Content>

      <ImageModal
        images={images}
        open={showImageGallery}
        handleClose={toggleGallery}
      />
    </Stack>
  );
}

export default PropertyProfile;
