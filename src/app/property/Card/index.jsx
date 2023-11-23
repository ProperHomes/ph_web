import { memo } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const CardActions = dynamic(() => import("./CardActions"));
const CardChips = dynamic(() => import("./CardChips"));
const CardTitle = dynamic(() => import("./CardTitle"));
const CardImage = dynamic(() => import("./CardImage"));

function PropertyCard({
  data,
  isPriority,
  isFullWidth,
  isManage,
  showFavorite = true,
  togglePropertyEditor,
}) {
  return (
    <Stack
      spacing={1}
      sx={{
        "&:hover": {
          [`.property-card-title-${data?.number}`]: {
            color: "#ff5657 !important",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: isFullWidth ? "100%" : "280px",
          height: "280px",
          cursor: "pointer",
          overflow: "hidden",
          borderRadius: "1em",
        }}
      >
        <CardImage
          data={data}
          isManage={isManage}
          isFullWidth={isFullWidth}
          isPriority={isPriority}
        />

        <CardActions
          data={data}
          isManage={isManage}
          showFavorite={showFavorite}
          togglePropertyEditor={togglePropertyEditor}
        />
        <CardChips data={data} />
      </Box>
      <CardTitle data={data} isManage={isManage} />
    </Stack>
  );
}

export default memo(PropertyCard);
