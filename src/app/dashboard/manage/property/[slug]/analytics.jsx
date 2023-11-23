"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const ANALYTICS_TIME_PERIOD = {
  ALL: { label: "All", value: "all" },
  MONTH: { label: "Last 30 days ", value: "30d" },
  WEEK: { label: "Last 7 Days", value: "7d" },
  TODAY: { label: "Today", value: "day" },
};

export default function Analytics({ propertyPath }) {
  const [period, setPeriod] = useState("7d");
  const handleChangePeriod = (e) => {
    setPeriod(e.target.value);
  };

  return (
    <Box
      pb={8}
      sx={{
        position: "relative",
      }}
    >
      <Stack
        justifyContent="center"
        pl={8}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "80px",
          backgroundColor: "#f8faff",
          zIndex: 99,
        }}
      >
        <FormControl variant="standard" sx={{ width: "150px" }}>
          <Select value={period} onChange={handleChangePeriod}>
            {Object.keys(ANALYTICS_TIME_PERIOD).map((t) => {
              const { label, value } = ANALYTICS_TIME_PERIOD[t];
              return (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>

      <Box>
        <iframe
          plausible-embed
          src={`https://plausible.properhomes.in/share/properhomes.in?auth=_-kFtozt_dSmIpT_aAIHb&page=${propertyPath}&period=${period}&embed=true&theme=light`}
          loading="lazy"
          frameBorder="0"
          scrolling="no"
          style={{ width: "1px", minWidth: "100%", height: "1600px" }}
        ></iframe>

        <script
          async
          src="https://plausible.properhomes.in/js/embed.host.js"
        ></script>
      </Box>
    </Box>
  );
}
