import { client } from "@/graphql/serverClient";
import {
  FETCH_BUILDER_BY_SLUG,
  GET_ALL_BUILDERS_FOR_STATIC_PATHS,
} from "@/graphql/builders";
import BuilderProfile from "..";
import { removeTags } from "@/utils/helper";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  let res = await client.request(FETCH_BUILDER_BY_SLUG, { slug: params.slug });
  const { name, description, logo } = res?.builderBySlug;
  return {
    title: `${name} - Builder Profile at ProperHomes`,
    description: removeTags(description),
    alternates: {
      canonical: `https://www.properhomes.in/builder/${params.slug}`,
    },
    openGraph: {
      images: [logo?.signedUrl].filter((x) => x),
    },
  };
}

export default async function Page({ params }) {
  let res = await client.request(FETCH_BUILDER_BY_SLUG, { slug: params.slug });
  const data = res?.builderBySlug;
  return <BuilderProfile data={data} />;
}

export async function generateStaticParams() {
  let res = await client.request(GET_ALL_BUILDERS_FOR_STATIC_PATHS);
  const builders = res?.builders?.nodes ?? [];
  return builders.map(({ slug }) => {
    return { slug };
  });
}
