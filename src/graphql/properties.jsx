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
    pincode
    condition
    bedrooms
    bathrooms
    attributes
    createdAt
    area
    areaUnit
    ownerId
    tenantId
    status
    facing
    media: propertyMedias {
      nodes {
        id
        mediaUrl
        mediaId
        media {
          signedUrl
        }
        isCoverImage
      }
    }
  }
`;

export const GET_PROPERTIES = gql`
  ${PROPERTY_FIELDS}
  query getProperties(
    $listedFor: TypeOfListing
    $type: PropertyType
    $city: PropertyCity
    $bedrooms: Int
    $first: Int
    $after: Cursor
    $propertyId: UUID
    $orderBy: [PropertiesOrderBy!]!
  ) {
    properties(
      first: $first
      after: $after
      condition: {
        listedFor: $listedFor
        type: $type
        city: $city
        bedrooms: $bedrooms
      }
      filter: { id: { ne: $propertyId } }
      orderBy: $orderBy
    ) {
      edges {
        cursor
        node {
          ...PropertyFields
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

export const GET_PROPERTIES_BY_LISTING_STATUS = gql`
  ${PROPERTY_FIELDS}
  query getProperties(
    $first: Int
    $after: Cursor
    $listingStatus: ListingStatus!
    $orderBy: [PropertiesOrderBy!]!
  ) {
    properties(
      first: $first
      after: $after
      orderBy: $orderBy
      condition: { listingStatus: $listingStatus }
    ) {
      edges {
        cursor
        node {
          ...PropertyFields
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
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
      }
      totalCount
    }
  }
`;

export const GET_TENANT_PROPERTY = gql`
  ${PROPERTY_FIELDS}
  query getProperties($tenantId: UUID!, $first: Int!) {
    properties(
      condition: { tenantId: $tenantId }
      first: $first
      orderBy: CREATED_AT_DESC
    ) {
      nodes {
        ...PropertyFields
      }
      totalCount
    }
  }
`;

export const GET_PROPERTIES_LOGGED_IN = gql`
  ${PROPERTY_FIELDS}
  query getProperties(
    $listedFor: TypeOfListing
    $type: PropertyType
    $city: PropertyCity
    $bedrooms: Int
    $first: Int!
    $after: Cursor
    $userId: UUID!
    $orderBy: [PropertiesOrderBy!]!
  ) {
    properties(
      condition: {
        listedFor: $listedFor
        type: $type
        city: $city
        bedrooms: $bedrooms
      }
      first: $first
      after: $after
      orderBy: $orderBy
    ) {
      edges {
        cursor
        node {
          ...PropertyFields
          currentUserSavedProperties: savedProperties(
            condition: { userId: $userId }
          ) {
            nodes {
              id
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

export const GET_USER_SAVED_PROPERTIES = gql`
  ${PROPERTY_FIELDS}
  query getSavedProperties($first: Int!, $after: Cursor, $userId: UUID!) {
    savedProperties(
      condition: { userId: $userId }
      first: $first
      after: $after # orderBy: CREATED_AT_DESC
    ) {
      edges {
        cursor
        node {
          id
          property {
            ...PropertyFields
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

export const GET_PROPERTY_BY_NUMBER = gql`
  ${PROPERTY_FIELDS}
  query getPropertyByNumber($number: Int!) {
    propertyByNumber(number: $number) {
      ...PropertyFields
    }
  }
`;

export const SEARCH_PROPERTIES = gql`
  ${PROPERTY_FIELDS}
  query searchProperties(
    $first: Int
    $after: Cursor
    $city: String
    $locality: String
    $searchText: String
    $bedrooms: Int
    $listedFor: String
  ) {
    searchProperties(
      first: $first
      after: $after
      cityName: $city
      localityName: $locality
      bedroomsCount: $bedrooms
      searchText: $searchText
      listingType: $listedFor
    ) {
      edges {
        node {
          ...PropertyFields
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`;

export const GET_PROPERTY_BY_SLUG = gql`
  ${PROPERTY_FIELDS}
  query PropertyBySlug($slug: String!) {
    propertyBySlug(slug: $slug) {
      ...PropertyFields
    }
  }
`;

export const GET_ALL_PROPERTIES_FOR_STATIC_PATHS = gql`
  query getPropertiesForStaticPaths {
    properties {
      nodes {
        number
        slug
      }
    }
  }
`;

export const GET_PROPERTY_CREDIT_EXPENSE_OF_USER = gql`
  query getPropertyCreditExpenseOfUser($userId: UUID!, $propertyId: UUID!) {
    propertyCreditExpenseByUserIdAndPropertyId(
      userId: $userId
      propertyId: $propertyId
    ) {
      id
    }
  }
`;

export const GET_PROPERTY_RENTAL_AGREEMENTS = gql`
  query rentalAgreements($propertyId: UUID!, $ownerId: UUID, $tenantId: UUID) {
    rentalAgreements(
      condition: {
        propertyId: $propertyId
        ownerId: $ownerId
        tenantId: $tenantId
      } # orderBy: CREATED_AT_DESC
    ) {
      nodes {
        id
        owner {
          id
          name
        }
        tenant {
          id
          name
        }
        signedUrl
        createdAt
      }
      totalCount
    }
  }
`;

export const GET_PROPERTY_PAYMENTS = gql`
  query propertyPayments(
    $propertyId: UUID!
    $userId: UUID
    $paymentFor: PaymentFor
    $first: Int
    $offset: Int
  ) {
    propertyPayments(
      condition: {
        propertyId: $propertyId
        userId: $userId
        paymentFor: $paymentFor
      }
      orderBy: CREATED_AT_DESC
      first: $first
      offset: $offset
    ) {
      nodes {
        amount
        id
        ownerId
        userId
        paymentFor
        paymentMode
        createdAt
        property {
          id
          title
          number
          slug
        }
      }
      totalCount
    }
  }
`;

export const CHECK_IF_USER_SAVED_PROPERTY = gql`
  query savedProperties($userId: UUID!, $propertyId: UUID!) {
    savedProperties(condition: { userId: $userId, propertyId: $propertyId }) {
      nodes {
        id
      }
    }
  }
`;

export const FETCH_PROPERTY_OWNER_DETAILS = gql`
  query fetchPropertyOwnerDetails($propertyId: UUID!) {
    property(id: $propertyId) {
      owner {
        id
        name
        phoneNumber
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

export const CREATE_PROPERTY_MEDIA = gql`
  mutation createPropertyMedia($input: CreatePropertyMediaInput!) {
    createPropertyMedia(input: $input) {
      propertyMedia {
        id
      }
    }
  }
`;

export const DELETE_PROPERTY_MEDIA = gql`
  mutation deletePropertyMedia($input: DeletePropertyMediaInput!) {
    deletePropertyMedia(input: $input) {
      media {
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

export const CREATE_RENTAL_AGREEMENT = gql`
  mutation createRentalAgreement($input: CreateRentalAgreementInput!) {
    createRentalAgreement(input: $input) {
      rentalAgreement {
        id
      }
    }
  }
`;

export const CREATE_PROPERTY_CREDIT_EXPENSE = gql`
  mutation createPropertyCreditExpense(
    $input: CreatePropertyCreditExpenseInput!
  ) {
    createPropertyCreditExpense(input: $input) {
      propertyCreditExpense {
        id
      }
    }
  }
`;
