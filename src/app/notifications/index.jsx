"use client";
import { useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
import { useMutation } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import useMediaQuery from "@mui/material/useMediaQuery";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { UPDATE_NOTIFICATION } from "./graphql";
import NotificationItem from "./NotificationItem";
import SlideDrawer from "@/components/Drawer";
import { notificationActionTypes, useNotificationsContext } from "./context";

function Notifications({ toggle, open }) {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { state, dispatch } = useNotificationsContext();

  const allNotifications = state.notifications;

  const [updateNotification] = useMutation(UPDATE_NOTIFICATION);

  const handleFetchNextPage = () => {
    dispatch({
      type: notificationActionTypes.UPDATE_NOTIFICATIONS_PAGE,
      payload: state.notificationsPage + 1,
    });
  };

  useEffect(() => {
    if (open) {
      const firstNotif = allNotifications[0];
      if (firstNotif && firstNotif.readAt == null) {
        dispatch({
          type: notificationActionTypes.HAS_UNREAD,
          hasUnread: false,
        });
        updateNotification({
          variables: {
            input: { id: firstNotif.id, patch: { readAt: new Date() } },
          },
        });
      }
    }
  }, [open]);

  const hasMore = state.totalNotificationsCount > allNotifications.length;

  return (
    <SlideDrawer
      open={open}
      handleClose={toggle}
      title="Notifications"
      position={isMobileOrTablet ? "bottom" : "right"}
    >
      <Button
        aria-label="go back"
        onClick={toggle}
        variant="text"
        size="large"
        fullWidth={false}
        sx={{ maxWidth: "50%", fontSize: "1.2rem", fontWeight: 600 }}
        startIcon={<KeyboardBackspaceIcon />}
      >
        Notifications
      </Button>
      <Stack
        p={2}
        direction="column"
        justifyContent="space-between"
        id="notificationsContainer"
        style={{ height: "100%" }}
      >
        <InfiniteScroll
          dataLength={allNotifications.length}
          next={handleFetchNextPage}
          hasMore={hasMore}
          scrollableTarget="notificationsContainer"
          loader={<></>}
          endMessage={<></>}
          style={{ minHeight: "800px" }}
        >
          {allNotifications.map((n) => (
            <NotificationItem
              key={n.id}
              notification={n}
              handleClose={toggle}
            />
          ))}
        </InfiniteScroll>
      </Stack>
    </SlideDrawer>
  );
}

export default Notifications;
