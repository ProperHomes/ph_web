"use client";
import DOMPurify from "dompurify";
import Typography from "@mui/material/Typography";

export default function Description({ content, sx }) {
  return (
    <Typography
      sx={sx}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content, {
          ALLOW_DATA_ATTR: false,
        }),
      }}
    />
  );
}
