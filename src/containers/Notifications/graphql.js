import { gql } from "@apollo/client";

export const FETCH_NOTIFICATIONS = gql`
  query fetchNotifications($userId: UUID!, $first: Int, $offset: Int) {
    notifications(
      condition: { forUserId: $userId }
      first: $first
      offset: $offset
      orderBy: CREATED_AT_DESC
    ) {
      nodes {
        id
        actionText
        byUser {
          id
          name
          username
          avatar {
            signedUrl
          }
        }
        forUserId
        readAt
        createdAt
      }
      totalCount
    }
  }
`;

export const CREATE_NOTIFICATION = gql`
  mutation createNotification($input: CreateNotificationInput!) {
    createNotification(input: $input) {
      notification {
        id
      }
    }
  }
`;

export const UPDATE_NOTIFICATION = gql`
  mutation updateNotification($input: UpdateNotificationInput!) {
    updateNotification(input: $input) {
      notification {
        id
        readAt
      }
    }
  }
`;

export const SUBSCRIBE_TO_NEW_NOTIFICATIONS = gql`
  subscription newNotificationAdded($userId: UUID!) {
    newNotificationAdded(input: { id: $userId }) {
      notification {
        id
        actionText
        forUserId
        byUser {
          id
          name
          username
          avatar {
            signedUrl
          }
        }
        readAt
        createdAt
      }
    }
  }
`;
