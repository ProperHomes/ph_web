import { gql } from "@apollo/client";

export const PROJECT_FIELDS = gql`
  fragment ProjectFields on User {
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
    }
  }
`;

export const FETCH_PROJECT_BY_SLUG = gql`
  ${PROJECT_FIELDS}
  query fetchProjectBySlug($slug: String!) {
    projectBySlug(slug: $slug) {
      ...ProjectFields
    }
  }
`;

export const GET_ALL_PROJECTS_FOR_STATIC_PATHS = gql`
  query getProjectsForStaticPaths {
    projects {
      nodes {
        id
        slug
      }
    }
  }
`;
