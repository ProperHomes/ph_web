"use client";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useNotificationsContext } from "./context";
import { convertStringToSlug } from "@/utils/helper";

function NotificationItem({ notification }) {
  const theme = useTheme();
  const router = useRouter();
  const { toggleNotifications } = useNotificationsContext();
  const { byUser, job, actionText, broadcastInfo, createdAt } = notification;

  const handleClick = () => {};

  return (
    <Stack
      spacing={1}
      mt={2}
      borderRadius={2}
      alignItems="center"
      justifyContent="space-between"
      p={2}
      sx={{
        color: "#000",
        cursor: "pointer",
        transition: "0.3s ease",
        background: "#fff",
        "&:hover": {
          backgroundColor: "#f1f1f1",
        },
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"flex-start"}
        spacing={1}
        sx={{ width: "100%" }}
      >
        {(byUser || broadcastInfo?.avatarUrl) && (
          <Avatar
            alt=""
            src={byUser?.avatar?.signedUrl ?? broadcastInfo?.avatarUrl}
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "8px",
            }}
          />
        )}

        <Stack spacing={1} sx={{ width: "100%" }}>
          <Typography fontWeight={500}>{actionText}</Typography>
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <Typography fontSize="0.7rem" fontWeight={300} sx={{ color: "#000" }}>
          {dayjs(createdAt).fromNow()}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default NotificationItem;
