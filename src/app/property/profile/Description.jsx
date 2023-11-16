"use client";
import DOMPurify from "dompurify";
import Box from "@mui/material/Box";

export default function Description({ content, sx }) {
  return (
    <Box
      sx={{
        ...sx,
        "& > h2, h3, h4": {
          marginTop: "1rem",
        },
        "& > p": {
          fontSize: "1.1rem",
          marginBottom: "8px",
        },
        "& > ul": {
          padding: "8px 1rem",
        },
        "& > p > a, & > a": {
          textDecoration: "underline !important",
        },
      }}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content, {
          ALLOW_DATA_ATTR: false,
        }),
      }}
    />
  );
}
