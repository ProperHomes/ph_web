import { NotificationsProvider } from "src/app/notifications/context";
import { AppProvider } from "src/appContext";

import MainClient from "./MainClient";
import "../../styles/globals.css";

function AppMain({ children }) {
  return (
    <MainClient>
      <AppProvider>
        <NotificationsProvider>{children}</NotificationsProvider>
      </AppProvider>
    </MainClient>
  );
}

export default AppMain;
