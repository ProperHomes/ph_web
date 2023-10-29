"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
import { useSubscription, useQuery } from "@apollo/client";

import { SUBSCRIBE_TO_NEW_NOTIFICATIONS, FETCH_NOTIFICATIONS } from "./graphql";
import { useAppContext } from "src/appContext";
import { removeDuplicateObjectsFromArray } from "@/utils/helper";

const NotificationsContext = createContext(null);

const initialState = {
  newNotification: false,
  notifications: [],
  notificationsPage: 0,
  hasUnread: false,
  totalNotificationsCount: 0,
};

const notificationActionTypes = {
  LOAD_NOTIFICATIONS: "LOAD_NOTIFICATIONS",
  UPDATE_NOTIFICATIONS_PAGE: "UPDATE_NOTIFICATIONS_PAGE",
  HAS_UNREAD: "HAS_UNREAD_NOTIFS",
  RESET: "RESET",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case notificationActionTypes.LOAD_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.addFirst
          ? removeDuplicateObjectsFromArray([
              ...action.payload,
              ...state.notifications,
            ])
          : removeDuplicateObjectsFromArray([
              ...state.notifications,
              ...action.payload,
            ]),
        totalNotificationsCount: action.count
          ? action.count + state.totalNotificationsCount
          : state.totalNotificationsCount,
      };
    case notificationActionTypes.UPDATE_NOTIFICATIONS_PAGE:
      return {
        ...state,
        notificationsPage: action.payload,
      };
    case notificationActionTypes.HAS_UNREAD:
      return {
        ...state,
        hasUnread: action.hasUnread,
      };
    case notificationActionTypes.RESET: {
      return { ...initialState };
    }
    default:
      return state;
  }
}

function NotificationsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { state: appState } = useAppContext();

  const { data: notifData } = useQuery(FETCH_NOTIFICATIONS, {
    variables: {
      userId: appState.user?.id,
      first: 10,
      offset: state.notificationsPage * 10,
    },
    fetchPolicy: "network-only",
    skip: !appState.user?.id,
  });

  useEffect(() => {
    const allNotifs = notifData?.notifications?.nodes ?? [];
    const totalCount = notifData?.notifications?.totalCount ?? 0;
    if (allNotifs.length > 0) {
      dispatch({
        type: notificationActionTypes.LOAD_NOTIFICATIONS,
        payload: allNotifs,
        count: totalCount ?? 0,
      });
      const firstNotif = allNotifs[0];
      if (firstNotif && firstNotif.readAt == null) {
        dispatch({ type: notificationActionTypes.HAS_UNREAD, hasUnread: true });
      }
    }
  }, [notifData]);

  const { data: newNotif } = useSubscription(SUBSCRIBE_TO_NEW_NOTIFICATIONS, {
    variables: { userId: appState.user?.id },
    skip: !appState.user?.id,
  });

  useEffect(() => {
    const notif = newNotif?.newNotificationAdded?.notification;
    if (notif && notif.readAt == null) {
      dispatch({
        type: notificationActionTypes.LOAD_NOTIFICATIONS,
        payload: [notif],
        addFirst: true,
        count: 1,
      });
      dispatch({
        type: notificationActionTypes.HAS_UNREAD,
        hasUnread: true,
      });
    }
  }, [newNotif]);

  return (
    <NotificationsContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationsContext.Provider>
  );
}

function useNotificationsContext() {
  return useContext(NotificationsContext);
}

export {
  NotificationsContext,
  NotificationsProvider,
  notificationActionTypes,
  useNotificationsContext,
};
