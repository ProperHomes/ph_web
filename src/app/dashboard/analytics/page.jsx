"use client";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import { GET_ALL_OWNER_PROPERTIES_FOR_ANALYTICS } from "@/graphql/properties";
import { useAppContext } from "src/appContext";

const ANALYTICS_TIME_PERIOD = {
  ALL: { label: "All", value: "all" },
  MONTH: { label: "Last 30 days ", value: "30d" },
  WEEK: { label: "Last 7 Days", value: "7d" },
  TODAY: { label: "Today", value: "day" },
};

export default function Analytics() {
  const { state } = useAppContext();
  const { data: ownerProperties } = useQuery(
    GET_ALL_OWNER_PROPERTIES_FOR_ANALYTICS,
    {
      variables: { ownerId: state.user?.id },
      skip: !state.user?.id,
    }
  );

  const slugPaths =
    ownerProperties?.properties?.nodes?.map(({ slug }) => slug) ?? [];

  const propertyPaths = (
    slugPaths.map((slug) => `/property/${slug}`) ?? []
  )?.join("|");

  const [pagePath, setPagePath] = useState("All Properties");
  const handleChangePage = (e) => {
    setPagePath(e.target.value);
  };

  const [period, setPeriod] = useState("7d");
  const handleChangePeriod = (e) => {
    setPeriod(e.target.value);
  };

  const pageFilter =
    pagePath === "All Properties" ? propertyPaths : `/property/${pagePath}`;

  return (
    <Box
      pb={8}
      sx={{
        position: "relative",
      }}
    >
      <Stack
        direction="row"
        spacing={4}
        pl={{ xs: 2, md: 8 }}
        sx={{
          position: "absolute",
          top: 10,
          left: 0,
          width: "100%",
          height: "80px",
          backgroundColor: "#f8faff",
          zIndex: 99,
        }}
      >
        <FormControl variant="standard" sx={{ width: "150px" }}>
          <Select
            value={pagePath ?? "All Properties"}
            onChange={handleChangePage}
          >
            {["All Properties", ...slugPaths].map((p) => {
              return (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
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
          plausible-embed="true"
          src={`https://plausible.properhomes.in/share/properhomes.in?auth=_-kFtozt_dSmIpT_aAIHb&page=${encodeURIComponent(
            pageFilter
          )}&period=${period}&embed=true&theme=light`}
          loading="lazy"
          frameBorder="0"
          scrolling="no"
          style={{ minWidth: "100%", height: "1700px" }}
        ></iframe>
        <script
          async
          src="https://plausible.properhomes.in/js/embed.host.js"
        ></script>
      </Box>
    </Box>
  );
}
