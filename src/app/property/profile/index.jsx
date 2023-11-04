import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StickyBox from "src/components/StickyBox";
import Divider from "@mui/material/Divider";

import { Content } from "./styles";
import Breadcrumbs from "src/components/Breadcrumbs";
import { AREA_UNITS, LISTING_TYPE } from "@/utils/constants";

const SimilarProperties = dynamic(() => import("./SimilarProperties"));
const PropertyImages = dynamic(() => import("./Images"));
const Sidebar = dynamic(() => import("./sidebar/index"));

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
    return m.media?.signedUrl ?? m.mediaUrl;
  });

  const isForSale = listedFor === LISTING_TYPE.SALE;

  let formattedType = type;
  if (type) {
    formattedType = `${type.split("_").join("-").toLowerCase()}s`;
    if (formattedType.includes("commercial")) {
      formattedType = "commercial-properties";
    } else if (formattedType.includes("pg")) {
      formattedType = "paying-guests";
    }
  }

  const isPayingGuests = formattedType === "paying-guests";

  const getBreadcrumbLinks = () => {
    const typeWithoutHypens = formattedType.split("-").join(" ");
    const typeLink = {
      label: isPayingGuests
        ? "Paying Guests Accommodation"
        : `${typeWithoutHypens} For ${isForSale ? "Sale" : "Rent"}`,
      path: isPayingGuests
        ? "/paying-guests-accommodation"
        : `/${formattedType}-for-${isForSale ? "sale" : "rent"}`,
    };

    return [
      { label: "property", path: "/property" },
      typeLink,
      {
        label: city,
        path: `${typeLink.path}-in-${city?.toLowerCase()}`,
      },
    ];
  };

  const importantInfo = [
    { label: bedrooms?.length === 1 ? "Bedroom" : "Bedrooms", value: bedrooms },
    {
      label: bathrooms?.length === 1 ? "Bathroom" : "Bathrooms",
      value: bathrooms,
    },
    { label: "Area", value: `${area} ${AREA_UNITS[areaUnit]}` },
    { label: "Facing", value: facing },
    { label: isFurnished ? "Furnished" : "Not Furnished", value: "" },
    {
      label: hasParking ? "Parking Facility" : "No Parking",
      value: "",
    },
  ];

  return (
    <Stack p={1} spacing={2}>
      <Breadcrumbs links={getBreadcrumbLinks()} />
      <PropertyImages images={images} />
      <Content py={2}>
        <Stack spacing={2} p={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h1"
              fontSize={{ xs: "1.4rem !important", md: "2.2rem !important" }}
              fontWeight={600}
              textTransform="capitalize"
            >
              {formattedTitle}
            </Typography>
            <Button
              aria-label="property price"
              size="large"
              variant="contained"
              disableRipple
              component="p"
              sx={{
                width: { xs: "100%", md: "200px" },
                whiteSpace: "nowrap",
                fontWeight: 600,
                fontSize: "1rem",
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
                    whiteSpace: "nowrap",
                    fontWeight: 600,
                    borderRadius: "0.5rem",
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                  }}
                  variant="outlined"
                >
                  {value} {label !== "Area" ? label : ""}
                </Button>
              );
            })}
          </Box>
          <Divider />
          <Typography variant="body1">{description}</Typography>
          {similarProperties.length > 0 && (
            <SimilarProperties city={city} properties={similarProperties} />
          )}
        </Stack>

        <StickyBox
          offsetTop={150}
          offsetBottom={20}
          style={{
            maxHeight: "250px",
          }}
        >
          <Sidebar data={data} />
        </StickyBox>
      </Content>
    </Stack>
  );
}

export default PropertyProfile;
