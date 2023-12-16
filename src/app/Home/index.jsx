import dynamic from "next/dynamic";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ZeroBoxes from "@/components/ZeroBoxes";
import CategoryBoxes from "@/components/CategoryBoxes";
import SearchBlock from "@/components/SearchBlock";
import { DamionFont } from "@/utils/constants";

const HomePageProperties = dynamic(() => import("./Properties"));

export default function Home({ data }) {
  return (
    <>
      <Stack spacing={4} py={4} alignItems="center">
        <Stack spacing={1} px={{ xs: 0, md: 4 }} alignItems="center">
          <Typography variant="h2" color="info.main">
            Find a home that{" "}
            <span
              style={{
                fontSize: "2.5rem",
                fontFamily: DamionFont.style.fontFamily,
                color: "#ff5657",
              }}
            >
              loves you
            </span>
          </Typography>
          <SearchBlock />
        </Stack>
        <Typography textAlign="center">
          We are currently operating in the cities of <b>Vijayawada and Hyderabad</b>.
        </Typography>
        <CategoryBoxes />
        <ZeroBoxes />
      </Stack>
      <HomePageProperties data={data} />
    </>
  );
}
