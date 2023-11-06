import axios from "axios";
import BlogPosts from "../../BlogPosts";
import {
  FETCH_ALL_CATEGORIES_FOR_STATIC_PATHS,
  FETCH_POSTS_BY_CATEGORY,
} from "@/graphql/blog";

export default async function Page({ params }) {
  const res = await axios({
    url: "https://wpsuperadmin.properhomes.in/graphql",
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    data: {
      query: FETCH_POSTS_BY_CATEGORY,
      variables: { category: decodeURIComponent(params.category) },
    },
  });
  const posts = res?.data?.data?.posts?.nodes ?? [];
  return <BlogPosts posts={posts} />;
}

export async function generateStaticParams() {
  const paths = [];
  const res = await axios({
    url: "https://wpsuperadmin.properhomes.in/graphql",
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    data: {
      query: FETCH_ALL_CATEGORIES_FOR_STATIC_PATHS,
    },
  });
  const categories = res?.data?.data?.categories?.nodes ?? [];
  for (let i = 0; i < categories.length; i++) {
    const name = categories[i].name;
    if (name === "Uncategorized") {
      continue;
    }
    paths.push({ category: `${categories[i].name}` });
  }
  return paths;
}
