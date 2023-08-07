import Profile from "../profile";

const GET_PROPERTY_BY_SLUG = `
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

const GET_ALL_PROPERTIES_FOR_STATIC_PATHS = `
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
  let res = await fetch({
    method: "POST",
    url: process.env.NEXT_PUBLIC_GRAPHQL_API,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_PROPERTY_BY_SLUG,
      variables: { slug: params.slug },
    }),
  });
  res = await res.json();
  const data = res?.data?.propertyBySlug;
  return (
    <>
      <Profile data={data} />
    </>
  );
}

export async function generateStaticParams() {
  let res = await fetch({
    method: "POST",
    url: process.env.NEXT_PUBLIC_GRAPHQL_API,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_ALL_PROPERTIES_FOR_STATIC_PATHS,
    }),
  });
  res = await res.json();
  const properties = res?.data?.properties?.nodes ?? [];
  return properties.map(({ slug }) => {
    return { slug };
  });
}
