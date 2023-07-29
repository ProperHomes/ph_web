import { useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
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
  const { title, description, media, createdAt, city, listedFor, type } =
    data ?? {};
  const images = (media?.nodes ?? []).map((m) => {
    return m.media?.signedUrl ?? m.mediaUrl;
  });

  const isForSale = listedFor === LISTING_TYPE.SALE;

  return (
    <Stack p={2} spacing={2}>
      <Breadcrumbs
        links={[
          { label: "list", path: "/list" },
          {
            label: `${type}s For ${isForSale ? "Sale" : "Rent"}`,
            path: `/list/${type.toLowerCase()}s-for-${
              isForSale ? "sale" : "rent"
            }`,
          },
          {
            label: city,
            path: `/list/${type.toLowerCase()}s-for-${
              isForSale ? "sale" : "rent"
            }/${city.toLowerCase()}`,
          },
        ]}
      />
      {isMobile && <ImageSwiper images={images} onClick={toggleGallery} />}
      <Typography
        variant="h1"
        fontSize={{ xs: "1.5rem !important", md: "2.5rem !important" }}
        fontWeight={600}
        color={theme.palette.text.primary}
        fontFamily={theme.typography.fontFamily.Manrope}
        textTransform="capitalize"
      >
        {title?.toLowerCase()}
      </Typography>
      {!isMobile && <ImageGrid images={images} onClick={toggleGallery} />}

      <Content>
        <Stack>
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
            <SellerInfoCard createdAt={createdAt} />
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
