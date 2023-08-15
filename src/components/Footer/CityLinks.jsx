"use client";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

export default function CityLinks({ city, links }) {
  const theme = useTheme();
  return (
    <Stack spacing={1} py={2}>
      {links.map(({ link, title }) => {
        return (
          <Link key={link} href={`${link}-in-${city.toLocaleLowerCase()}`}>
            <Typography
              variant="body1"
              fontSize="small"
              color={theme.palette.primary.main}
              fontFamily={theme.typography.fontFamily.Monsterrat}
              sx={{
                cursor: "pointer",
                maxWidth: "280px",
                height: "auto",
              }}
            >
              {title} in{" "}
              {city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}
            </Typography>
          </Link>
        );
      })}
    </Stack>
  );
}
