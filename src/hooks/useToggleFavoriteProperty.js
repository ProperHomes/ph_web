import { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";

import {
  CHECK_IF_USER_SAVED_PROPERTY,
  DELETE_SAVED_PROPERTY,
  SAVE_PROPERTY,
} from "@/graphql/properties";
import { useAppContext } from "src/appContext";

export default function useToggleFavoriteProperty({
  propertyId,
  toggleAuth,
  currentUserSavedPropertyId,
  canCheckWithApi = false,
}) {
  const { state } = useAppContext();

  const loggedInUserId = state?.user?.id;

  const [savedPropertyId, setSavedPropertyId] = useState(false);

  const [createSavedProperty] = useMutation(SAVE_PROPERTY);
  const [deleteSavedProperty] = useMutation(DELETE_SAVED_PROPERTY);

  const [checkIfUserSavedProperty] = useLazyQuery(CHECK_IF_USER_SAVED_PROPERTY);

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
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleFavorite = (e) => {
    if (e) {
      e.stopPropagation();
    }
    if (!state?.user?.id) {
      toggleAuth();
    } else {
      toggleSaveProperty();
    }
  };

  return { handleToggleFavorite, isSaved: !!savedPropertyId };
}