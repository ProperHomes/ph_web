import { gql } from "@apollo/client";

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    name
    type
    city
    username
    number
    phoneNumber
    attributes
    avatarId
    avatar {
      signedUrl
    }
    isSysAdmin
    email
    credits
    properties: propertiesByOwnerId {
      totalCount
    }
    subscriptionPurchases {
      nodes {
        id
        type
        amount
        createdAt
      }
    }
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
      builderEmployees {
        totalCount
        nodes {
          builderId
        }
      }
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

export const FETCH_USER_DEVICE_TOKENS = gql`
  query userDeviceTokens($userId: UUID!) {
    userDeviceTokens(condition: { userId: $userId }) {
      nodes {
        deviceToken
        deviceType
      }
    }
  }
`;

export const CREATE_USER_DEVICE_TOKEN = gql`
  mutation createUserDeviceToken($input: CreateUserDeviceTokenInput!) {
    createUserDeviceToken(input: $input) {
      userDeviceToken {
        id
        deviceToken
        deviceType
      }
    }
  }
`;

export const DELETE_USER_DEVICE_TOKEN = gql`
  mutation deleteUserDeviceTokenByUserIdAndDeviceToken(
    $input: DeleteUserDeviceTokenInput!
  ) {
    userDeviceToken {
      id
    }
  }
`;
