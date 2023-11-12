"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";

const list = [
  { label: "Overview", id: "#overview" },
  { label: "Amenities", id: "#projectAmenities" },
  { label: "Properties", id: "#projectProperties" },
];

export default function NavTabs() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeTabId] = useState("#overview");
  const handleChange = (_e, id) => {
    if (document?.getElementById(id)) {
      document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Box sx={{ boxShadow: (theme) => theme.shadows[2] }}>
      <Tabs
        value={activeTabId}
        onChange={handleChange}
        allowScrollButtonsMobile
        scrollButtons={isMobile}
        variant="scrollable"
        textColor="inherit"
        aria-label="builder profile navigation tabs"
      >
        {list.map(({ label, id }) => {
          return (
            <Tab
              key={id}
              value={id}
              label={<Typography fontSize="large">{label}</Typography>}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}
