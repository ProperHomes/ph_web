"use client";
import Link from "next/link";
import Box from "@mui/material/Box";
import TypographyUnderline from "../TypographyUnderline";

export default function CityLinks({ city, links }) {
  return (
    <Box
      py={2}
      sx={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 380px))",
        gridAutoFlow: "dense",
        width: "100%",
        alignItems: "center",
      }}
    >
      {links.map(({ link, title }) => {
        return (
          <Link
            key={link}
            href={`${link}-in-${city.toLocaleLowerCase()}`}
            prefetch={false}
            title={title}
            style={{
              width: "fit-content",
              maxHeight: "40px",
              position: "relative",
            }}
          >
            <TypographyUnderline>
              {title} in{" "}
              {city.charAt(0).toUpperCase() + city.slice(1).toLowerCase()}
            </TypographyUnderline>
          </Link>
        );
      })}
    </Box>
  );
}
