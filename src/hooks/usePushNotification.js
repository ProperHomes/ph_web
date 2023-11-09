import axios from "axios";
import { useAppContext } from "src/appContext";

export default function usePushNotifications() {
  const { state } = useAppContext();

  async function sendPushNotification({ title, body, pushTokens }) {
    const tokens = pushTokens ?? state?.user?.userDeviceTokens?.nodes ?? [];
    if (tokens.length > 0 && title && body) {
      try {
        await axios({
          method: "post",
          url: `/api/expoPushNotifications`,
          data: { title, body, deviceTokens: tokens },
          withCredentials: true,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
  return { sendPushNotification };
}
