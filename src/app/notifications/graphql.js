"use client";
import { gql } from "@apollo/client";

export const FETCH_NOTIFICATIONS = gql`
  query fetchNotifications($userId: UUID!, $first: Int, $offset: Int) {
    notifications(
      condition: { toUserId: $userId }
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
        toUserId
        readAt
        createdAt
        property {
          id
          slug
        }
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
        toUserId
        byUser {
          id
          name
          username
          avatar {
            signedUrl
          }
        }
        property {
          id
          slug
        }
        readAt
        createdAt
      }
    }
  }
`;
