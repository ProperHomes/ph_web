import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import HomeLayout from "@/components/Layouts/HomeLayout";
import ImageSwiper from "@/components/ImageSwiper";
import ImageGrid from "@/components/ImageGrid";
import useImageGallery from "@/utils/hooks/useImageGallery";

function PropertyProfile({ data }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { title, description, media } = data ?? {};
  const images = (media?.nodes ?? []).map((m) => {
    return m.media?.signedUrl ?? m.mediaUrl;
  });

  const { MediaGallery, toggleGallery } = useImageGallery({ images });

  return (
    <HomeLayout>
      {isMobile && <ImageSwiper images={images} />}
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
      {MediaGallery}
    </HomeLayout>
  );
}

export default PropertyProfile;
