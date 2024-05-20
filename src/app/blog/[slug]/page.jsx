import axios from "axios";
import BlogPost from "./BlogPost";
import {
  FETCH_POST_BY_SLUG,
  FETCH_ALL_POSTS_FOR_STATIC_PATHS,
} from "@/graphql/blog";
import { removeTags } from "@/utils/helper";

// export async function generateMetadata({ params }) {
//   // const res = await axios({
//   //   url: "https://wpsuperadmin.properhomes.in/graphql",
//   //   method: "post",
//   //   headers: {
//   //     "content-type": "application/json",
//   //   },
//   //   data: {
//   //     query: FETCH_POST_BY_SLUG,
//   //     variables: { slug: params.slug },
//   //   },
//   // });
//   const post = {}; // res?.data?.data?.postBy;
//   const { title, excerpt, featuredImage } = post;
//   const image = featuredImage?.node;
//   return {
//     title: `${title} - ProperHomes Blog`,
//     description: removeTags(excerpt),
//     alternates: {
//       canonical: `https://www.properhomes.in/blog/${params.slug}`,
//     },
//     openGraph: {
//       images: [image.mediaItemUrl],
//     },
//   };
// }

export default async function Page({ params }) {
  let post = null;
  // try {
  //   const res = await axios({
  //     url: "https://wpsuperadmin.properhomes.in/graphql",
  //     method: "post",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     data: {
  //       query: FETCH_POST_BY_SLUG,
  //       variables: { slug: params.slug },
  //     },
  //   });
  //   post = res?.data?.data?.postBy;
  // } catch (err) {
  //   console.error("Error fetching user Post data: ", err);
  // }
  return <div />;
}

export async function generateStaticParams() {
  let paths = [];
  // try {
  //   const res = await axios({
  //     url: "https://wpsuperadmin.properhomes.in/graphql",
  //     method: "post",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     data: {
  //       query: FETCH_ALL_POSTS_FOR_STATIC_PATHS,
  //     },
  //   });
  //   const posts = res?.data?.data?.posts?.nodes ?? [];
  //   for (let p = 0; p < posts.length; p++) {
  //     paths.push({ slug: posts[p].slug });
  //   }
  // } catch (err) {
  //   console.log("err", err);
  // }
  return paths;
}
