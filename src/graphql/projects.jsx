import { gql } from "@apollo/client";

export const PROJECT_FIELDS = gql`
  fragment ProjectFields on Project {
    id
    name
    description
    isReraApproved
    logo {
      signedUrl
    }
    coverImage {
      signedUrl
    }
    brochure {
      signedUrl
    }
    address
    status
    amenities
    attributes
    builder {
      id
      name
      slug
      phoneNumber
      officeAddress
      logo {
        signedUrl
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation createProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      project {
        id
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  ${PROJECT_FIELDS}
  mutation updateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      project {
        ...ProjectFields
      }
    }
  }
`;

export const FETCH_PROJECT = gql`
  ${PROJECT_FIELDS}
  query fetchProject($id: UUID!) {
    project(id: $id) {
      ...ProjectFields
      properties(first: 5) {
        nodes {
          id
          slug
          type
          title
          description
          listedFor
          city
          area
          areaUnit
          price
          media: propertyMedias(first: 1) {
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
      }
    }
  }
`;

export const FETCH_PROJECT_BY_SLUG = gql`
  ${PROJECT_FIELDS}
  query fetchProjectBySlug($slug: String!) {
    projectBySlug(slug: $slug) {
      ...ProjectFields
      properties(first: 5) {
        nodes {
          id
          slug
          type
          bedrooms
          description
          listedFor
          title
          city
          area
          areaUnit
          price
          media: propertyMedias(first: 1) {
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
      }
    }
  }
`;

export const GET_ALL_PROJECTS_FOR_STATIC_PATHS = gql`
  query getProjectsForStaticPaths {
    projects(condition: { isActive: true }) {
      nodes {
        id
        slug
      }
    }
  }
`;

export const GET_IN_ACTIVE_PROJECTS = gql`
  query getInActiveProjects {
    projects(condition: { isActive: false, first: 5 }) {
      nodes {
        id
        slug
        name
      }
    }
  }
`;
