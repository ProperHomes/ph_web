import Stack from "@mui/material/Stack";
import {
  GET_PROPERTIES,
  GET_PROPERTY_BY_SLUG,
  GET_ALL_PROPERTIES_FOR_STATIC_PATHS,
} from "@/graphql/properties";
import { client } from "@/graphql/serverClient";

import Profile from "../profile";
import { numWords } from "@/utils/helper";

export const dynamicParams = true;

export async function generateMetadata({ params }, parent) {
  let res = await client.request(GET_PROPERTY_BY_SLUG, { slug: params.slug });
  const { title, description, media } = res?.propertyBySlug;
  const images = (media?.nodes ?? []).map((m) => {
    return m.media?.signedUrl ?? m.mediaUrl;
  });
  const coverImage = images?.[0];
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${title} - ProperHomes`,
    description,
    openGraph: {
      images: [coverImage, ...previousImages].filter((x) => x),
    },
  };
}

export default async function Page({ params }) {
  let res = await client.request(GET_PROPERTY_BY_SLUG, { slug: params.slug });
  const data = res?.propertyBySlug;
  const {
    id,
    city,
    type,
    title,
    description,
    bedrooms,
    price,
    area,
    areaUnit,
  } = data;
  const similarRes = await client.request(GET_PROPERTIES, {
    first: 3,
    city,
    type,
    propertyId: id,
    orderBy: ["CREATED_AT_DESC"],
  });
  const properties =
    similarRes?.properties?.edges?.map((edge) => edge.node) ?? [];

  const pricejsonLD = {
    "@context": "http://schema.org/",
    "@type": "PriceSpecification",
    price: `${numWords(price)}`,
    priceCurrency: "INR",
  };

  const propertyjsonLD = {
    "@context": "http://schema.org/",
    type,
    name: `${title}`,
    description,
    url: `https://www.properhomes.in/property/${params.slug}`,
    numberOfRooms: `${bedrooms}`,
    address: {
      "@type": "PostalAddress",
      // addressLocality: "Alkapur Township",
      addressRegion: `${city}`,
      addressCountry: {
        "@type": "Country",
        name: "IN",
      },
    },
    // geo: {
    //   "@type": "GeoCoordinates",
    //   longitude: "78.3702875",
    //   latitude: "17.3861055",
    // },
    floorSize: {
      "@type": "QuantitativeValue",
      name: `${area} ${areaUnit}`,
    },
  };

  return (
    <Stack spacing={2} px={{ xs: 1, sm: 3, md: 4 }} py={2}>
      <Profile data={data} similarProperties={properties} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricejsonLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertyjsonLD) }}
      />
    </Stack>
  );
}

export async function generateStaticParams() {
  let res = await client.request(GET_ALL_PROPERTIES_FOR_STATIC_PATHS);
  const properties = res?.properties?.nodes ?? [];
  return properties.map(({ slug }) => {
    return { slug };
  });
}
