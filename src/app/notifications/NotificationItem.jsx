"use client";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import useTheme from "@mui/material/styles/useTheme";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";

dayjs.extend(relativeTime);

function NotificationItem({ notification }) {
  const router = useRouter();
  const theme = useTheme();
  const { byUser, actionText, createdAt, property } = notification;

  console.log(notification);
  const handleClick = () => {
    if (property?.slug) {
      router.push(`/property/${property.slug}`);
    }
  };

  return (
    <Stack
      spacing={1}
      mt={2}
      borderRadius={2}
      alignItems="center"
      justifyContent="space-between"
      p={2}
      onClick={handleClick}
      sx={{
        color: "#000",
        cursor: "pointer",
        transition: "0.3s ease",
        background: "#fafafa",
        boxShadow: theme.shadows[1],
        "&:hover": {
          backgroundColor: "#f1f1f1",
          boxShadow: theme.shadows[2],
        },
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"flex-start"}
        spacing={1}
        sx={{ width: "100%" }}
      >
        {byUser && (
          <Avatar
            alt=""
            src={byUser?.avatar?.signedUrl}
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
