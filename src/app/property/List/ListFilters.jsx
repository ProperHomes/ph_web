import { memo } from "react";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";

const Filters = dynamic(() => import("@/components/Filters"));

function ListFilters({ city, listedFor, type, handleLoadNext }) {
  const onChangeFilters = () => {
    handleLoadNext(false);
  };

  return (
    <Box
      sx={{
        display: { xs: "grid", md: "flex" },
        flexFlow: "row wrap",
        gridTemplateColumns: {
          xs: "1fr 1fr",
          md: "repeat(6, 1fr)",
        },
        gap: "1em",
        width: { xs: "100%", md: "auto" },
      }}
    >
      <Filters
        typeLabel="Property Type"
        hideCity={!!city}
        hideType={!!type}
        hideListedFor={!!listedFor}
        onChangeCity={onChangeFilters}
        onChangeBedrooms={onChangeFilters}
        onChangeListedFor={onChangeFilters}
        onChangePriceSort={onChangeFilters}
        onChangePropertyType={onChangeFilters}
        onReset={onChangeFilters}
        sx={{
          "& fieldset": {
            borderRadius: "8px",
            borderColor: "#00000020",
          },
        }}
      />
    </Box>
  );
}

export default memo(ListFilters);
