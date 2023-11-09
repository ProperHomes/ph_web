import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import PostBreadCrumps from "./Breadcrumbs";

export default function BlogPost({ post }) {
  const { title, content, featuredImage, categories } = post;
  const image = featuredImage?.node;
  const mainCategory = categories.nodes?.[0]?.name;
  return (
    <Container maxWidth="lg">
      <PostBreadCrumps category={mainCategory} />
      <Stack spacing={4} alignItems="center" justifyContent="center">
        <Box
          sx={{
            width: "90%",
            height: "500px",
            position: "relative",
          }}
        >
          <Image
            fill
            src={image.mediaItemUrl}
            alt={image.altText}
            style={{ borderRadius: "1rem", objectFit: "cover" }}
            sizes="(max-width: 300px) 80vw, (max-width: 1200px) 50vw, 50vw "
          />
        </Box>

        <Typography
          variant="h1"
          sx={{ fontSize: "2rem !important", fontWeight: 600 }}
          textAlign="center"
        >
          {title}
        </Typography>

        <Box
          sx={{
            padding: "2rem",
            "& > .content-header": {
              margin: "1rem 0",
              fontSize: "1.4rem",
            },
            "& > h2, h3, h4": {
              marginTop: "1rem",
            },
            "& > p": {
              fontSize: "1.1rem",
            },
            "& > ul": {
              padding: "8px 1rem",
            },
            "& > p > a, & > a": {
              textDecoration: "underline !important",
            },
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Stack>
    </Container>
  );
}



