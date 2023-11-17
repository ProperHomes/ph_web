import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { AREA_UNITS, LISTING_TYPE, PROPERTY_TYPE } from "@/utils/constants";

function CardTitle({ data }) {
  const { slug, number, title, listedFor, type, price, city, area, areaUnit } =
    data;

  const formattedPrice = Number(price).toLocaleString("en-in", {
    style: "currency",
    currency: "INR",
  });

  const linkHref = `/property/${slug}`;

  const formattedTitle = `${PROPERTY_TYPE[type]?.toLowerCase()} ${
    PROPERTY_TYPE[type] === PROPERTY_TYPE.COMMERCIAL ? "Unit" : ""
  } for ${listedFor?.toLowerCase()} in ${city.toLowerCase()}`;

  return (
    <Stack spacing={1}>
      <Typography
        variant="h2"
        className={`property-card-title-${number}`}
        sx={{
          fontSize: "1rem !important",
          width: "100%",
          maxWidth: { xs: "100%", md: "280px" },
          fontWeight: "medium",
          textTransform: "capitalize",
        }}
      >
        <Link href={linkHref} prefetch={false} title={formattedTitle}>
          {title}
        </Link>
      </Typography>

      <Link href={linkHref} prefetch={false} title={formattedTitle}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontWeight="bold">
            {formattedPrice.slice(0, -3)}{" "}
            {listedFor === LISTING_TYPE.RENT ? " monthly " : ""}
          </Typography>
        </Stack>
        <Typography fontWeight={500} fontSize="0.9rem">
          {area} {AREA_UNITS[areaUnit]}
        </Typography>
      </Link>
    </Stack>
  );
}

export default CardTitle;
