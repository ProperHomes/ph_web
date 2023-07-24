import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";

import Card from "./Card";
import { usePropertyContext } from "./context";

const Section = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  gap: "2rem",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  },
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
  },
  width: "100%",
  maxWidth: "1200px",
}));

function PropertyList() {
  const { state } = usePropertyContext();
  const { list } = state;

  return (
    <Section>
      {list.map((l) => {
        return <Card key={l.id} data={l} />;
      })}
    </Section>
  );
}

export default PropertyList;
