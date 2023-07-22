import { gql } from "@apollo/client";

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    name
    type
    username
    number
    phoneNumber
    attributes
    avatarId
    avatar {
      signedUrl
    }
    email
  }
`;

export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  ${USER_FIELDS}
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        ...UserFields
      }
    }
  }
`;

export const FETCH_USER_PROFILE = gql`
  ${USER_FIELDS}
  query fetchUserProfile($id: UUID!) {
    user(id: $id) {
      ...UserFields
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        id
      }
    }
  }
`;

export const FETCH_USER_BY_NUMBER = gql`
  ${USER_FIELDS}
  query fetchUserProfileData($number: Int!) {
    users(condition: { number: $number }) {
      nodes {
        ...UserFields
      }
    }
  }
`;
