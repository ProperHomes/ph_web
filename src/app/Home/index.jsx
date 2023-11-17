import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import SearchBlock from "@/components/SearchBlock";
import CategoryBoxes from "@/components/CategoryBoxes";
import ZeroBoxes from "@/components/ZeroBoxes";
import HomePageProperties from "./Properties";
import { DamionFont } from "@/utils/constants";

export default function Home({ data }) {
  return (
    <>
      <Stack spacing={4} py={4} alignItems="center">
        <Stack spacing={1} px={{ xs: 0, md: 4 }} alignItems="center">
          <Typography variant="h2">
            Find a home that{" "}
            <span
              style={{
                fontSize: "2.5rem",
                fontFamily: DamionFont.style.fontFamily,
                color: "#0080FF",
              }}
            >
              loves you
            </span>
          </Typography>
          <SearchBlock />
        </Stack>
        <CategoryBoxes />
        <Stack display={{ xs: "none", md: "flex" }}>
          <ZeroBoxes />
        </Stack>
      </Stack>
      <HomePageProperties data={data} />
    </>
  );
}
