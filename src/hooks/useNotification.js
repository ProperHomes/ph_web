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
    forUserId,
    byUserId,
    actionText,
    jobId,
  }) => {
    try {
      await createNotification({
        variables: {
          input: {
            notification: {
              forUserId,
              byUserId,
              jobId,
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
