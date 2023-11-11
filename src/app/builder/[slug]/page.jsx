import Stack from "@mui/material/Stack";
import { client } from "@/graphql/serverClient";
import {
  FETCH_BUILDER_BY_SLUG,
  GET_ALL_BUILDERS_FOR_STATIC_PATHS,
} from "@/graphql/builders";
import BuilderProfile from "..";

// export async function generateMetadata({ params }) {
//   let res = await client.request(FETCH_BUILDER_BY_SLUG, { slug: params.slug });
//   const { name, description, media } = res?.builderBySlug;
//   //   const images = (media?.nodes ?? []).map((m) => {
//   //     return m.media?.signedUrl ?? m.mediaUrl;
//   //   });
//   //   const coverImage = images?.[0];
//   // optionally access and extend (rather than replace) parent metadata
//   //   const previousImages = (await parent).openGraph?.images || [];

//   return {
//     title: `${name} - ProperHomes`,
//     description,
//     // openGraph: {
//     //   images: [coverImage, ...previousImages].filter((x) => x),
//     // },
//   };
// }

export default async function Page({ params }) {
  let res = await client.request(FETCH_BUILDER_BY_SLUG, { slug: params.slug });
  const data = res?.builderBySlug;
  return (
    <Stack>
      <BuilderProfile data={data} />
    </Stack>
  );
}

export async function generateStaticParams() {
  let res = await client.request(GET_ALL_BUILDERS_FOR_STATIC_PATHS);
  const builders = res?.builders?.nodes ?? [];
  return builders.map(({ slug }) => {
    return { slug };
  });
}
