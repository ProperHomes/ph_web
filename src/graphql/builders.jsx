import { gql } from "@apollo/client";

export const BUILDER_FIELDS = gql`
  fragment BuilderFields on Builder {
    id
    slug
    name
    description
    logo {
      signedUrl
    }
    coverImage {
      signedUrl
    }
    officeAddress
    operatingCities
    experience
    phoneNumber
    attributes
    projects {
      nodes {
        id
        name
        slug
        status
        address
        priceRange
        coverImage {
          signedUrl
        }
      }
    }
  }
`;

export const CREATE_BUILDER = gql`
  mutation createBuilder($input: CreateBuilderInput!) {
    createBuilder(input: $input) {
      builder {
        id
      }
    }
  }
`;

export const UPDATE_BUILDER = gql`
  ${BUILDER_FIELDS}
  mutation updateProject($input: UpdateBuilderInput!) {
    updateBuilder(input: $input) {
      builder {
        ...BuilderFields
      }
    }
  }
`;

export const FETCH_BUILDER = gql`
  ${BUILDER_FIELDS}
  query fetchBuilder($id: UUID!) {
    builder(id: $id) {
      ...BuilderFields
    }
  }
`;

export const FETCH_BUILDER_BY_SLUG = gql`
  ${BUILDER_FIELDS}
  query fetchBuilderBySlug($slug: String!) {
    builderBySlug(slug: $slug) {
      ...BuilderFields
    }
  }
`;

export const GET_ALL_BUILDERS_FOR_STATIC_PATHS = gql`
  query getBuildersForStaticPaths {
    builders(condition: { isActive: true }) {
      nodes {
        id
        slug
      }
    }
  }
`;

export const GET_ALL_ACTIVE_BUILDERS_BY_EMPLOYEE = gql`
  query getActiveBuilders($userId: UUID!) {
    builders(
      condition: { isActive: true }
      filter: {
        builderEmployeesExist: true
        builderEmployees: { some: { userId: { eq: $userId } } }
      }
    ) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

export const GET_IN_ACTIVE_BUILDERS = gql`
  query getInActiveBuilders {
    builders(condition: { isActive: false }, first: 5) {
      nodes {
        id
        slug
        name
      }
    }
  }
`;

export const CREATE_BUILDER_EMPLOYEE = gql`
  mutation createBuilderEmployee($input: CreateBuilderEmployeeInput!) {
    createBuilderEmployee(input: $input) {
      builderEmployee {
        id
      }
    }
  }
`;
