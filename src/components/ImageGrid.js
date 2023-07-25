import useImageGallery from "@/utils/hooks/useImageGallery";
import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";

const Grid = styled(Box)({
  position: "relative",
  width: "100%",
  height: "auto",
  maxHeight: "560px",
  display: "grid",
  gridGap: "4px",
  gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
  gridAutoFlow: "row dense",
});

function ImageGrid({ images, onClick }) {
  return (
    <Grid>
      {images.map((url, i) => (
        <Box
          key={url}
          onClick={onClick}
          sx={{
            gridColumn: {
              xs: "auto",
              lg: `${i === 0 ? "1 / 3" : "auto"}`,
            },
            gridRow: {
              xs: "auto",
              lg: `${i === 0 ? "1 / 3" : "auto"}`,
            },
            cursor: "pointer",
            objectFit: "cover",
          }}
        >
          <img
            alt=""
            src={url}
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
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
        </Box>
      ))}
    </Grid>
  );
}

export default ImageGrid;
