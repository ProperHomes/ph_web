import { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
    <>
      {isMobile && <ImageSwiper images={images} onClick={toggleGallery} />}
      <Stack sx={{ height: "100%" }}>
        <Stack spacing={2} sx={{ width: { xs: "100%", lg: "80%" } }}>
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

          <Typography
            variant="body"
            color={theme.palette.text.primary}
            fontFamily={theme.typography.fontFamily.Manrope}
          >
            {description}
          </Typography>
        </Stack>
      </Stack>
      <ImageModal
        images={images}
        open={showImageGallery}
        handleClose={toggleGallery}
      />
    </>
  );
}

export default PropertyProfile;
