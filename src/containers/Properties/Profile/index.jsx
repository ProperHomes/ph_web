import { useState } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import ImageSwiper from "@/components/ImageSwiper";
import ImageGrid from "@/components/ImageGrid";
import ImageModal from "@/components/ImageGallery";

function PropertyProfile({ data }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showImageGallery, setShowImageGallery] = useState(false);
  const toggleGallery = () => {
    setShowImageGallery((prev) => !prev);
  };
  const { title, description, media } = data ?? {};
  const images = (media?.nodes ?? []).map((m) => {
    return m.media?.signedUrl ?? m.mediaUrl;
  });

  return (
    <Stack py={2}>
      {isMobile && <ImageSwiper images={images} onClick={toggleGallery} />}
      <Stack spacing={2} sx={{ height: "100%", width: "80%" }}>
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

        <Container maxWidth="lg">
          <Typography
            variant="body"
            color={theme.palette.text.primary}
            fontFamily={theme.typography.fontFamily.Manrope}
          >
            {description}
          </Typography>
        </Container>
      </Stack>

      <ImageModal
        images={images}
        open={showImageGallery}
        handleClose={toggleGallery}
      />
    </Stack>
  );
}

export default PropertyProfile;
