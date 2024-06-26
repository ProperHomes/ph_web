"use client";
import { useMutation } from "@apollo/client";
import {
  CREATE_NOTIFICATION,
  UPDATE_NOTIFICATION,
} from "../app/notifications/graphql";

function useNotification() {
  const [createNotification] = useMutation(CREATE_NOTIFICATION);
  const [updateNotification] = useMutation(UPDATE_NOTIFICATION);

  const sendNotification = async ({
    toUserId,
    byUserId,
    actionText,
    propertyId,
    jobId,
  }) => {
    try {
      await createNotification({
        variables: {
          input: {
            notification: {
              toUserId,
              byUserId,
              jobId,
              propertyId,
              actionText,
            },
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const markOneAsRead = async ({ id }) => {
    try {
      await updateNotification({
        variables: {
          input: { id, patch: { readAt: new Date().toISOString() } },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    sendNotification,
    markOneAsRead,
  };
}

export default useNotification;
