import { gql } from "@apollo/client";

export const PROPERTY_FIELDS = gql`
  fragment PropertyFields on Property {
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
  }
`;

export const GET_PROPERTIES = gql`
  ${PROPERTY_FIELDS}
  query getProperties(
    $listedFor: TypeOfListing
    $type: PropertyType
    $city: PropertyCity
    $bedrooms: Int
    $first: Int!
    $offset: Int!
  ) {
    properties(
      condition: {
        listedFor: $listedFor
        type: $type
        city: $city
        bedrooms: $bedrooms
      }
      first: $first
      offset: $offset
      orderBy: CREATED_AT_DESC
    ) {
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

export const GET_OWNER_PROPERTIES = gql`
  ${PROPERTY_FIELDS}
  query getProperties($ownerId: UUID!, $first: Int!, $offset: Int!) {
    properties(
      condition: { ownerId: $ownerId }
      first: $first
      offset: $offset
      orderBy: CREATED_AT_DESC
    ) {
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

export const GET_PROPERTIES_LOGGED_IN = gql`
  ${PROPERTY_FIELDS}
  query getProperties(
    $listedFor: TypeOfListing
    $type: PropertyType
    $city: PropertyCity
    $first: Int!
    $offset: Int!
    $userId: UUID!
  ) {
    properties(
      condition: { listedFor: $listedFor, type: $type, city: $city }
      first: $first
      offset: $offset
      orderBy: CREATED_AT_DESC
    ) {
      nodes {
        ...PropertyFields
        currentUserSavedProperties: savedProperties(
          condition: { userId: $userId }
        ) {
          nodes {
            id
          }
        }
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

export const GET_USER_SAVED_PROPERTIES = gql`
  ${PROPERTY_FIELDS}
  query getSavedProperties($first: Int!, $offset: Int!, $userId: UUID!) {
    savedProperties(
      condition: { userId: $userId }
      first: $first
      offset: $offset # orderBy: CREATED_AT_DESC
    ) {
      nodes {
        id
        property {
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

export const SEARCH_PROPERTIES = gql`
  ${PROPERTY_FIELDS}
  query searchProperties(
    $first: Int
    $offset: Int
    $city: String
    $locality: String
    $searchText: String
  ) {
    searchProperties(
      first: $first
      offset: $offset
      city: $city
      locality: $locality
      searchText: $searchText
    ) {
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

export const SAVE_PROPERTY = gql`
  mutation createSavedProperty($input: CreateSavedPropertyInput!) {
    createSavedProperty(input: $input) {
      savedProperty {
        id
      }
    }
  }
`;

export const DELETE_SAVED_PROPERTY = gql`
  mutation deleteSavedProperty($input: DeleteSavedPropertyInput!) {
    deleteSavedProperty(input: $input) {
      savedProperty {
        id
      }
    }
  }
`;
