import { useState } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import HomeLayout from "@/components/Layouts/HomeLayout";
import ImageSwiper from "@/components/ImageSwiper";
import ImageGrid from "@/components/ImageGrid";
import ImageModal from "@/components/ImageGallery";

function PropertyProfile({ data }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [showImageGallery, setShowImageGallery] = useState(false);
  const toggleGallery = () => {
    setShowImageGallery((prev) => !prev);
  };
  const { title, description, media } = data ?? {};
  const images = (media?.nodes ?? []).map((m) => {
    return m.media?.signedUrl ?? m.mediaUrl;
  });

  return (
    <HomeLayout>
      {isMobile && <ImageSwiper images={images} onClick={toggleGallery} />}
      <Container maxWidth="lg" sx={{ height: "100%" }}>
        <Stack spacing={2}>
          <Typography
            variant="h1"
            fontSize="2.5rem !important"
            fontWeight={600}
            color={theme.palette.text.primary}
            fontFamily={theme.typography.fontFamily.Manrope}
            textTransform="capitalize"
          >
            {title?.toLowerCase()}
          </Typography>
          {!isMobile && <ImageGrid images={images} onClick={toggleGallery} />}

          <Typography
            variant="body"
            color={theme.palette.text.primary}
            fontFamily={theme.typography.fontFamily.Manrope}
          >
            {description}
          </Typography>
        </Stack>
      </Container>
      <ImageModal
        images={images}
        open={showImageGallery}
        handleClose={toggleGallery}
      />
    </HomeLayout>
  );
}

export default PropertyProfile;
