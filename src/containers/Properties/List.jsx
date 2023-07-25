import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";

import Card from "./Card";
import { usePropertyContext } from "./context";

const Section = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "1.2rem",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  },
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
  },
  width: "100%",
}));

function PropertyList({ data }) {
  const { state } = usePropertyContext();
  const { list } = state;
  const listToShow = data ?? list;
  return (
    <Section>
      {listToShow.map((l, i) => {
        return (
          <Box key={l.id} sx={{ justifySelf: "center" }}>
            <Card data={l} isPriority={i < 9} />
          </Box>
        );
      })}
    </Section>
  );
}

export default PropertyList;
