"use client";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import useToggleAuth from "src/hooks/useToggleAuth";

export default function ProjectCards({ projects }) {
  const { Auth, toggleAuth, isLoggedIn } = useToggleAuth();

  const handleContactBuilder = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isLoggedIn) {
    } else {
      toggleAuth();
    }
  };
  return (
    <Stack direction="row" spacing={2}>
      {projects.map((data) => {
        const { id, name, slug, address, priceRange, coverImage } = data;
        return (
          <Card
            key={id}
            sx={{ width: 280, height: "100%", borderRadius: "0.8rem" }}
          >
            <Link
              key={id}
              href={`/project/${slug}`}
              style={{ textDecoration: "none" }}
            >
              <CardMedia
                sx={{ height: 200 }}
                image={coverImage?.signedUrl ?? "https://placehold.co/345x140"}
                title="project cover image"
              />
              <CardContent sx={{ paddingBottom: "8px !important" }}>
                <Stack spacing={2}>
                  <Stack>
                    <Typography
                      gutterBottom
                      variant="h4"
                      sx={{ fontSize: "1.5rem !important" }}
                    >
                      {name}
                    </Typography>
                    <Typography>{address}</Typography>
                  </Stack>

                  <Typography>
                    Price Range: <br />
                    <b>
                      From {priceRange[0]} - {priceRange[1]}
                    </b>
                  </Typography>
                </Stack>
              </CardContent>
            </Link>
            <CardActions>
              <Button
                variant="contained"
                size="medium"
                color="info"
                onClick={handleContactBuilder}
              >
                Contact Builder
              </Button>
            </CardActions>
          </Card>
        );
      })}
      {Auth}
    </Stack>
  );
}
