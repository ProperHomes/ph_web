import { memo } from "react";
import Button from "@mui/material/Button";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";

const ListFilters = dynamic(() => import("./ListFilters"));

function ListHeader({
  title,
  city,
  listedFor,
  type,
  viewMoreLink,
  showFilters,
  handleLoadNext,
}) {
  return (
    <Stack
      spacing={2}
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography
        gutterBottom
        color="info.main"
        variant="h2"
        textAlign="left"
        fontSize={{ xs: "1.4rem !important", sm: "1.6rem !important" }}
      >
        {title}
      </Typography>

      {showFilters && (
        <ListFilters
          city={city}
          type={type}
          listedFor={listedFor}
          handleLoadNext={handleLoadNext}
        />
      )}

      {viewMoreLink && (
        <Button
          aria-label="view more button"
          variant="contained"
          color="orange"
          LinkComponent={Link}
          href={viewMoreLink}
          sx={{
            display: { xs: "none", sm: "flex" },
            borderRadius: "8px",
            fontSize: "1rem",
          }}
        >
          View More
        </Button>
      )}
    </Stack>
  );
}

export default memo(ListHeader);
