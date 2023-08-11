import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import NextTopLoader from "nextjs-toploader";
import { Manrope } from "next/font/google";

import Main from "./main";
import "../styles/globals.css";

dayjs.extend(relativeTime);

export const manRope = Manrope({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manRope.className}>
        <NextTopLoader showSpinner={false} />
        <Main>{children}</Main>
      </body>
    </html>
  );
}

export default RootLayout;
