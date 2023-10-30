"use client";

import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

export default function TypographyUnderline({
  children,
  color,
  fontWeight,
  fontSize,
}) {
  const theme = useTheme();
  return (
    <Typography
      fontWeight={fontWeight ?? 600}
      fontSize={fontSize ?? theme.spacing(2)}
      color={color ?? theme.palette.text.secondary}
      sx={{
        transition: "all 0.5s ease",
        "&::after": {
          content: '""',
          position: "absolute",
          width: "100%",
          transform: "scaleX(0)",
          height: "2px",
          bottom: 0,
          left: 0,
          backgroundColor: theme.palette.info.main,
          transformOrigin: "bottom right",
          transition: "transform 0.5s ease-out",
        },
        "&:hover": {
          color: theme.palette.text.primary,
          ":after": {
            transform: " scaleX(1)",
            transformOrigin: "bottom left",
          },
        },
      }}
    >
      {children}
    </Typography>
  );
}
