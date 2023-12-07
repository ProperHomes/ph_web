import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import { Content } from "./styles";
import { AREA_UNITS, LISTING_TYPE } from "@/utils/constants";

const Breadcrumbs = dynamic(() => import("./Breadcrumbs"));
const PropertyImages = dynamic(() => import("./Images"));
const Description = dynamic(() => import("./Description"));
const Sidebar = dynamic(() => import("./sidebar/index"), { ssr: false });
const SimilarProperties = dynamic(() => import("./SimilarProperties"), {
  ssr: false,
});

function PropertyProfile({ data, similarProperties }) {
  const {
    title,
    description,
    bedrooms,
    bathrooms,
    area,
    areaUnit,
    price,
    facing,
    isFurnished,
    isSemiFurnished,
    hasParking,
    media,
    city,
    listedFor,
    type,
  } = data ?? {};

  const formattedTitle = title?.split("_").join(" ").toLowerCase();
  const formattedPrice = Number(price).toLocaleString("en-in", {
    style: "currency",
    currency: "INR",
  });
  const images = (media?.nodes ?? []).map((m) => {
    return {
      url: m.media?.signedUrl ?? m.mediaUrl,
      isCoverImage: m.isCoverImage,
    };
  });

  let formattedType = type;
  if (type) {
    formattedType = `${type.split("_").join("-").toLowerCase()}s`;
    if (formattedType.includes("commercial")) {
      formattedType = "commercial-properties";
    } else if (formattedType.includes("pg")) {
      formattedType = "paying-guests";
    }
  }

  const importantInfo = [
    { label: bedrooms?.length === 1 ? "Bedroom" : "Bedrooms", value: bedrooms },
    {
      label: bathrooms?.length === 1 ? "Bathroom" : "Bathrooms",
      value: bathrooms,
    },
    { label: "Area", value: `${area} ${AREA_UNITS[areaUnit]}` },
    { label: "Facing", value: facing },

    {
      label: hasParking ? "Parking Facility" : "No Parking",
      value: "",
    },
  ];

  if (isFurnished && !isSemiFurnished) {
    importantInfo.push({
      label: "Furnished",
      value: "",
    });
  }

  if (isSemiFurnished && !isFurnished) {
    importantInfo.push({ label: "Semi Furnished", value: "" });
  }

  return (
    <Stack p={1} spacing={2}>
      <Breadcrumbs
        formattedType={formattedType}
        listedFor={listedFor}
        city={city}
      />
      <PropertyImages images={images} />
      <Content py={2}>
        <Stack spacing={2} p={1}>
          <Stack
            spacing={{ xs: 1, md: 0 }}
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h1"
              fontSize={{ xs: "1.4rem !important", md: "2rem !important" }}
              fontWeight={600}
              textTransform="capitalize"
              color="info.main"
            >
              {formattedTitle}
            </Typography>
            <Button
              aria-label="property price"
              size="large"
              variant="contained"
              disableRipple
              component="p"
              color="orange"
              sx={{
                width: { xs: "100%", md: "250px" },
                whiteSpace: "nowrap",
                fontWeight: 600,
                fontSize: "1rem",
                fontWeight: 800,
                borderRadius: "1rem",
              }}
            >
              {formattedPrice.slice(0, -3)}{" "}
              {listedFor === LISTING_TYPE.RENT ? " monthly" : ""}
            </Button>
          </Stack>
          <Divider />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
              gap: "1em",
            }}
          >
            {importantInfo.map(({ label, value }) => {
              return (
                <Button
                  key={label}
                  size="large"
                  disableRipple
                  aria-label={`${value} ${label}`}
                  component="p"
                  sx={{
                    cursor: "default",
                    whiteSpace: "nowrap",
                    fontWeight: 600,
                    borderRadius: "0.5rem",
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                    color: "info.main",
                    backgroundColor: "secondary.main",
                    "&:hover": {
                      backgroundColor: "secondary.light",
                    },
                  }}
                  variant="contained"
                >
                  {value} {label !== "Area" ? label : ""}
                </Button>
              );
            })}
          </Box>
          <Divider />

          <Description content={description} />

          {similarProperties.length > 0 && (
            <SimilarProperties city={city} properties={similarProperties} />
          )}
        </Stack>
        <Sidebar data={data} />
      </Content>
    </Stack>
  );
}

export default PropertyProfile;
