import axios from "axios";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { FETCH_POSTS } from "@/graphql/blog";
import BlogPosts from "./BlogPosts";

export const metadata = {
  alternates: {
    canonical: "https://www.properhomes.in/blog",
  },
};

export default async function Page() {
  // const res = await axios({
  //   url: "https://wpsuperadmin.properhomes.in/graphql",
  //   method: "post",
  //   headers: {
  //     "content-type": "application/json",
  //   },
  //   data: {
  //     query: FETCH_POSTS,
  //     variables: { first: 10, offset: 0 },
  //   },
  // });
  const posts = [] //res?.data?.data?.posts?.nodes ?? [];
  return (
    <Stack spacing={4}>
      <Typography
        textAlign="center"
        variant="h1"
        sx={{ fontSize: "2rem !important", fontWeight: 600 }}
      >
        ProperHomes Blog
      </Typography>

      <BlogPosts posts={posts} />
    </Stack>
  );
}
