import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import NextTopLoader from "nextjs-toploader";

import Main from "./main";
import "../styles/globals.css";

dayjs.extend(relativeTime);

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader showSpinner={false} />
        <Main>{children}</Main>
      </body>
    </html>
  );
}

export default RootLayout;
