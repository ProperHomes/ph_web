import { client } from "@/graphql/serverClient";
import {
  FETCH_PROJECT_BY_SLUG,
  GET_ALL_PROJECTS_FOR_STATIC_PATHS,
} from "@/graphql/projects";
import ProjectProfile from "..";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  let res = await client.request(FETCH_PROJECT_BY_SLUG, { slug: params.slug });
  const { name, description, coverImage } = res?.projectBySlug;
  return {
    title: `${name} - ProperHomes`,
    description,
    openGraph: {
      images: [coverImage?.signedUrl].filter((x) => x),
    },
  };
}

export default async function Page({ params }) {
  let res = await client.request(FETCH_PROJECT_BY_SLUG, { slug: params.slug });
  const data = res?.projectBySlug;
  return <ProjectProfile data={data} />;
}

export async function generateStaticParams() {
  let res = await client.request(GET_ALL_PROJECTS_FOR_STATIC_PATHS);
  const projects = res?.projects?.nodes ?? [];
  return projects.map(({ slug }) => {
    return { slug };
  });
}
