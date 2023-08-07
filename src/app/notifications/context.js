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
  showNotifications: false,
};

const notificationActionTypes = {
  LOAD_NOTIFICATIONS: "LOAD_NOTIFICATIONS",
  UPDATE_NOTIFICATIONS_PAGE: "UPDATE_NOTIFICATIONS_PAGE",
  TOGGLE_NOTIFICATIONS: "TOGGLE_NOTIFICATIONS",
  HAS_UNREAD: "HAS_UNREAD_NOTIFS",
  RESET: "RESET",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case notificationActionTypes.TOGGLE_NOTIFICATIONS:
      return { ...state, showNotifications: !state.showNotifications };
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
    allNotifs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (allNotifs.length > 0) {
      dispatch({
        type: notificationActionTypes.LOAD_NOTIFICATIONS,
        payload: allNotifs,
        count: totalCount ?? 0,
      });
    }
  }, [notifData]);

  useEffect(() => {
    const firstNotif = state.notifications[0];
    if (firstNotif && firstNotif.readAt == null) {
      dispatch({ type: notificationActionTypes.HAS_UNREAD, hasUnread: true });
    }
  }, [state.notifications.length]);

  const { data: newNotif } = useSubscription(SUBSCRIBE_TO_NEW_NOTIFICATIONS, {
    variables: { userId: appState.user?.id },
    skip: !appState.user?.id,
  });

  useEffect(() => {
    const notif = newNotif?.newNotificationAdded?.notification;
    if (notif && notif.readAt == null) {
      dispatch({
        type: notificationActionTypes.HAS_UNREAD,
        hasUnread: true,
      });
      // Todo: Also if the browser tab is not in focus display a native notification
      dispatch({
        type: notificationActionTypes.LOAD_NOTIFICATIONS,
        payload: [notif],
        addFirst: true,
        count: 1,
      });
    }
  }, [newNotif]);

  const toggleNotifications = () => {
    dispatch({ type: notificationActionTypes.TOGGLE_NOTIFICATIONS });
  };

  return (
    <NotificationsContext.Provider
      value={{ state, dispatch, toggleNotifications }}
    >
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
