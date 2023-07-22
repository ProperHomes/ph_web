import { gql } from "@apollo/client";

export const PROPERTY_FIELDS = gql`
  fragment PropertyFields on Property {
    id
    number
    type
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
  }
`;

export const GET_PROPERTIES = gql`
  ${PROPERTY_FIELDS}
  query getProperties($first: Int!, $offset: Int!) {
    properties(first: $first, offset: $offset, orderBy: CREATED_AT_DESC) {
      nodes {
        ...PropertyFields
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
  }
`;

export const GET_PROPERTY_BY_NUMBER = gql`
  ${PROPERTY_FIELDS}
  query getPropertyByNumber($number: Int!) {
    propertyByNumber(number: $number) {
      ...PropertyFields
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

export const CREATE_PROPERTY = gql`
  mutation createProperty($input: CreatePropertyInput!) {
    createProperty(input: $input) {
      property {
        id
      }
    }
  }
`;

export const UPDATE_PROPERTY = gql`
  mutation updateProperty($input: UpdatePropertyInput!) {
    updateProperty(input: $input) {
      property {
        id
      }
    }
  }
`;
