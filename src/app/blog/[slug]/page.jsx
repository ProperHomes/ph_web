import axios from "axios";
import BlogPost from "./BlogPost";
import {
  FETCH_POST_BY_SLUG,
  FETCH_ALL_POSTS_FOR_STATIC_PATHS,
} from "@/graphql/blog";

export default async function Page({ params }) {
  let post = null;
  try {
    const res = await axios({
      url: "https://wpsuperadmin.properhomes.in/graphql",
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      data: {
        query: FETCH_POST_BY_SLUG,
        variables: { slug: params.slug },
      },
    });
    post = res?.data?.data?.postBy;
  } catch (err) {
    console.error("Error fetching user Post data: ", err);
  }
  return <BlogPost post={post} />;
}

export async function generateStaticParams() {
  let paths = [];
  try {
    const res = await axios({
      url: "https://wpsuperadmin.properhomes.in/graphql",
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      data: {
        query: FETCH_ALL_POSTS_FOR_STATIC_PATHS,
      },
    });
    const posts = res?.data?.data?.posts?.nodes ?? [];
    for (let p = 0; p < posts.length; p++) {
      paths.push({ slug: posts[p].slug });
    }
  } catch (err) {
    console.log("err", err);
  }
  return paths;
}
