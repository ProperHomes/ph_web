import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { CardsGrid } from "@/styles/styles";

export default async function BlogPosts({ posts }) {
  return (
    <CardsGrid>
      {posts.map((p) => {
        const { id, title, slug, excerpt, featuredImage } = p;
        const image = featuredImage?.node;
        return (
          <Link
            key={id}
            href={`/blog/${slug}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: "1rem",
              }}
            >
              <CardActionArea>
                {image && (
                  <CardMedia
                    component="img"
                    height={200}
                    image={image.mediaItemUrl}
                    alt={image.altText}
                  />
                )}
                <CardContent>
                  <Stack>
                    <Typography
                      gutterBottom
                      variant="h2"
                      sx={{ fontSize: "1.2rem !important", fontWeight: 600 }}
                    >
                      {title}
                    </Typography>
                    <div
                      style={{ fontSize: "1rem" }}
                      dangerouslySetInnerHTML={{
                        __html: excerpt,
                      }}
                    />
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        );
      })}
    </CardsGrid>
  );
}
