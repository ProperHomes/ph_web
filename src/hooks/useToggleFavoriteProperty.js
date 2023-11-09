import { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";

import {
  CHECK_IF_USER_SAVED_PROPERTY,
  DELETE_SAVED_PROPERTY,
  SAVE_PROPERTY,
} from "@/graphql/properties";
import { FETCH_USER_DEVICE_TOKENS } from "@/graphql/user";
import { useAppContext } from "src/appContext";
import useNotification from "./useNotification";
import usePushNotifications from "./usePushNotification";

export default function useToggleFavoriteProperty({
  data,
  toggleAuth,
  currentUserSavedPropertyId,
  canCheckWithApi = false,
}) {
  const { id: propertyId, ownerId } = data;

  const { state } = useAppContext();

  const loggedInUserId = state?.user?.id;

  const [fetchUserDeviceTokens] = useLazyQuery(FETCH_USER_DEVICE_TOKENS);

  const [savedPropertyId, setSavedPropertyId] = useState(false);

  const [createSavedProperty] = useMutation(SAVE_PROPERTY);
  const [deleteSavedProperty] = useMutation(DELETE_SAVED_PROPERTY);

  const [checkIfUserSavedProperty] = useLazyQuery(CHECK_IF_USER_SAVED_PROPERTY);

  const { sendNotification } = useNotification();

  const { sendPushNotification } = usePushNotifications();

  const handleSendPushNotification = async () => {
    try {
      const res = await fetchUserDeviceTokens({
        variables: { userId: ownerId },
      });
      let deviceTokens = res?.data?.userDeviceTokens?.nodes ?? [];
      deviceTokens = deviceTokens.map((t) => t.deviceToken);
      if (deviceTokens.length > 0) {
        sendPushNotification({
          title: `A user shortlisted your property`,
          body: `Your property titled: ${data?.title} has been shortlisted just now`,
          pushTokens: deviceTokens,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleCheckIfUserSavedProperty = async () => {
      const res = await checkIfUserSavedProperty({
        variables: { userId: loggedInUserId, propertyId },
        fetchPolicy: "network-only",
      });
      const id = res?.data?.savedProperties?.nodes?.[0]?.id;
      if (id) {
        setSavedPropertyId(id);
      }
    };

    if (currentUserSavedPropertyId) {
      setSavedPropertyId(currentUserSavedPropertyId);
    } else {
      if (loggedInUserId && canCheckWithApi) {
        handleCheckIfUserSavedProperty();
      }
    }
  }, [currentUserSavedPropertyId, propertyId, canCheckWithApi, loggedInUserId]);

  const toggleSaveProperty = async () => {
    try {
      if (savedPropertyId) {
        await deleteSavedProperty({
          variables: { input: { id: savedPropertyId } },
        });
        setSavedPropertyId(null);
      } else {
        const { data } = await createSavedProperty({
          variables: {
            input: {
              savedProperty: { propertyId, userId: state?.user?.id },
            },
          },
        });
        setSavedPropertyId(data?.createSavedProperty?.savedProperty?.id);
        handleSendPushNotification();
        sendNotification({
          toUserId: ownerId,
          byUserId: loggedInUserId,
          propertyId,
          actionText: `A user from ${state?.user?.city} shortlisted your property just now..!`,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleFavorite = () => {
    if (!state?.user?.id) {
      toggleAuth();
    } else {
      toggleSaveProperty();
    }
  };

  return { handleToggleFavorite, isSaved: !!savedPropertyId };
}
