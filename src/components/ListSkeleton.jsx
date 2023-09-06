"use client";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import useTheme from "@mui/material/styles/useTheme";

export default function ListSkeleton({ n }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "1.2rem",
        [theme.breakpoints.down("md")]: {
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        },
        [theme.breakpoints.down("sm")]: {
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {Array(n ?? 10)
        .fill()
        .map((_l, i) => {
          return (
            <Stack spacing={1} key={i}>
              <Skeleton
                variant="rounded"
                sx={{ "&.MuiSkeleton-root": { borderRadius: "1em" } }}
                width={"100%"}
                height={280}
              />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} width="60%" />
            </Stack>
          );
        })}
    </Box>
  );
}
