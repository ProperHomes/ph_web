import { gql, client } from "@/graphql/serverClient";
import ManageProperty from "./index";

const GET_PROPERTY_BY_SLUG = gql`
  query PropertyBySlug($slug: String!) {
    propertyBySlug(slug: $slug) {
      id
      number
      type
      slug
      title
      city
      price
      listedFor
      isFurnished
      hasSwimmingPool
      hasParking
      hasBasement
      description
      country
      condition
      bedrooms
      bathrooms
      attributes
      createdAt
      area
      ownerId
      agentId
      media: propertyMedias {
        nodes {
          id
          mediaUrl
          media {
            signedUrl
          }
          isCoverImage
        }
      }
    }
  }
`;

const GET_ALL_PROPERTIES_FOR_STATIC_PATHS = gql`
  query getPropertiesForStaticPaths {
    properties {
      nodes {
        number
        slug
      }
    }
  }
`;

export default async function Page({ params }) {
  let res = await client.request(GET_PROPERTY_BY_SLUG, { slug: params.slug });
  const data = res?.propertyBySlug;
  return (
    <>
      <ManageProperty data={data} />
    </>
  );
}

export async function generateStaticParams() {
  let res = await client.request(GET_ALL_PROPERTIES_FOR_STATIC_PATHS);
  const properties = res?.properties?.nodes ?? [];
  return properties.map(({ slug }) => {
    return { slug };
  });
}
