import { useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme, styled } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import useMediaQuery from "@mui/material/useMediaQuery";

import HomeLayout from "@/components/Layouts/HomeLayout";

const ImageGrid = styled(Box)({
  position: "relative",
  width: "100%",
  height: "auto",
  maxHeight: "560px",
  display: "grid",
  gridGap: "4px",
  gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
  gridAutoFlow: "row dense",
});

function PropertyProfile({ data }) {
  const theme = useTheme();
  const router = useRouter();
  const { slug } = router.query;
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeStep, setActiveStep] = useState(0);

  const { title, description, media } = data ?? {};
  const images = (media?.nodes ?? []).map((m) => {
    return m.media?.signedUrl ?? m.mediaUrl;
  });

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveStep((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <HomeLayout>
      {isMobile && (
        <Box pb={2}>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((url) => {
              return (
                <Box
                  key={url}
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={url}
                    alt=""
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
              );
            })}
          </SwipeableViews>
        </Box>
      )}
      <Container maxWidth="lg" sx={{ height: "100%" }}>
        <Stack spacing={2}>
          <Typography
            variant="h1"
            fontSize="2.5rem !important"
            fontFamily={theme.typography.fontFamily.Manrope}
            textTransform="capitalize"
          >
            {title?.toLowerCase()}
          </Typography>
          {!isMobile && (
            <ImageGrid>
              {images.map((url, i) => (
                <img
                  key={url}
                  alt=""
                  src={url}
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    gridColumn: `${i === 0 ? "1 / 3" : "auto"}`,
                    gridRow: `${i === 0 ? "1 /  3" : "auto"}`,
                    cursor: "pointer",
                    objectFit: "cover",
                    borderRadius:
                      i === 0
                        ? "1em 0 0 1em"
                        : i === 2
                        ? "0 1em 0 0"
                        : i === 4
                        ? "0 0 1em 0"
                        : 0,
                  }}
                />
              ))}
            </ImageGrid>
          )}

          <Typography
            variant="body"
            fontFamily={theme.typography.fontFamily.Manrope}
          >
            {description}
          </Typography>
        </Stack>
      </Container>
    </HomeLayout>
  );
}

export default PropertyProfile;
