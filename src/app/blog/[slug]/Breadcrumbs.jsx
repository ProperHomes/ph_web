import Link from "next/link";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function PostBreadCrumps({ category }) {
  return (
    <div role="presentation">
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="medium" />}
        aria-label="breadcrumb"
        mb={2}
      >
        <Link href="/blog" prefetch={false}>
          <Typography
            sx={{
              fontWeight: 600,
              "&:hover": {
                cursor: "pointer",
                textDecoration: "underline",
              },
            }}
          >
            Blog
          </Typography>
        </Link>

        <Link href={`/blog/category/${category}`} prefetch={false}>
          <Typography
            sx={{
              fontWeight: 600,
              "&:hover": {
                cursor: "pointer",
                textDecoration: "underline",
              },
            }}
          >
            {category}
          </Typography>
        </Link>
      </Breadcrumbs>
    </div>
  );
}

export default PostBreadCrumps;
