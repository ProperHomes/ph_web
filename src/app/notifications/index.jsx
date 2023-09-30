"use client";
import { Fragment, useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { Typography, useTheme } from "@mui/material";
import { useMutation } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroll-component";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { UPDATE_NOTIFICATION } from "./graphql";
import NotificationItem from "./NotificationItem";
import { NotificationsContext, notificationActionTypes } from "./context";
import useMediaQuery from "@mui/material/useMediaQuery";
function Notifications() {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { state, dispatch } = useContext(NotificationsContext);

  const allNotifications = state.notifications;

  const Container = isMobileOrTablet ? Stack : Drawer;

  const [updateNotification] = useMutation(UPDATE_NOTIFICATION);

  const handleFetchNextPage = () => {
    dispatch({
      type: notificationActionTypes.UPDATE_NOTIFICATIONS_PAGE,
      payload: state.notificationsPage + 1,
    });
  };

  const handleClose = () => {
    dispatch({ type: notificationActionTypes.TOGGLE_NOTIFICATIONS });
  };

  useEffect(() => {
    const firstNotif = allNotifications.filter((n) => !n.isBroadcast)[0];
    if (firstNotif && firstNotif.readAt == null) {
      updateNotification({
        variables: {
          input: { id: firstNotif.id, patch: { readAt: new Date() } },
        },
      });
    }
    dispatch({
      type: notificationActionTypes.HAS_UNREAD,
      hasUnread: false,
    });
  }, [allNotifications.length]);

  const hasMore = state.totalNotificationsCount > allNotifications.length;

  return (
    <Stack sx={{ background: "#F8F8FF" }}>
      {isMobileOrTablet && (
        <Button
          aria-label="go back"
          onClick={handleClose}
          startIcon={<KeyboardBackspaceIcon />}
          sx={{
            color: "#000",
            textAlign: "left",
            background: "#F8F8FF",
            width: "30%",
            whiteSpace: "nowrap",
          }}
        >
          Go Back
        </Button>
      )}
      <Container
        anchor={"right"}
        open={state.showNotifications}
        onClose={handleClose}
        p={1}
        sx={{ background: { xs: "#F8F8FF", minHeight: "80vh", md: "initial" } }}
        PaperProps={{
          style: {
            width: "350px",
            padding: "0.5em 1em",
            background: "#F8F8FF",
          },
        }}
      >
        {!isMobileOrTablet && (
          <Button
            aria-label="go back"
            onClick={handleClose}
            startIcon={<KeyboardBackspaceIcon />}
            sx={{
              width: "30%",
              whiteSpace: "nowrap",
              color: "#000",
              textAlign: "left",
              marginLeft: 0,
            }}
          >
            Go Back
          </Button>
        )}

        <Typography
          color="#1B2559"
          fontWeight={500}
          fontSize={"1.2rem"}
          textAlign={"center"}
          sx={{ marginTop: 1, marginLeft: { xs: "1rem", md: 0 } }}
        >
          Notifications
        </Typography>

        <InfiniteScroll
          dataLength={allNotifications.length}
          next={handleFetchNextPage}
          hasMore={hasMore}
          scrollableTarget="notificationsContainer"
          loader={<></>}
          endMessage={<></>}
        >
          {allNotifications.map((n) => (
            <Fragment key={n.id}>
              <NotificationItem notification={n} handleClose={handleClose} />
            </Fragment>
          ))}
        </InfiniteScroll>
      </Container>
    </Stack>
  );
}

export default Notifications;
