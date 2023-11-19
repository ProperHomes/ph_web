import { memo } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";

const Description = dynamic(() => import("../profile/Description"));

function CardDescription({ description, number }) {
  return (
    <Box
      className={`property-card-description-${number}`}
      sx={{
        position: "absolute",
        zIndex: 1,
        bottom: 0,
        padding: "1.5em",
        borderRadius: "1em",
        backgroundColor: "rgba(0,0,0,0.2)",
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Description
        content={description}
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: "5",
          WebkitBoxOrient: "vertical",
          marginTop: "50%",
          color: "#fff",
          fontSize: "1rem",
        }}
      />
    </Box>
  );
}

export default memo(CardDescription);
