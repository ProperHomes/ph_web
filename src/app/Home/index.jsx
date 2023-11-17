import dynamic from "next/dynamic";
import { Damion } from "next/font/google";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const SearchBlock = dynamic(() => import("../../components/SearchBlock"));
const CategoryBoxes = dynamic(() => import("../..//components/CategoryBoxes"));
const ZeroBoxes = dynamic(() => import("../../components/ZeroBoxes"));
const HomePageProperties = dynamic(() => import("./Properties"));

const DamionFont = Damion({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

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
