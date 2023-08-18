import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StickyBox from "src/components/StickyBox";
import Divider from "@mui/material/Divider";

import { Content } from "./styles";
import Sidebar from "./sidebar/index";
import PropertyImages from "./Images";
import Breadcrumbs from "src/components/Breadcrumbs";
import { LISTING_TYPE } from "@/utils/constants";

function PropertyProfile({ data }) {
  const {
    title,
    description,
    bedrooms,
    bathrooms,
    area,
    price,
    facing,
    isFurnished,
    hasParking,
    hasSwimmingPool,
    media,
    city,
    listedFor,
    type,
  } = data ?? {};

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
        ? "/list/paying-guests-accommodation"
        : `/list/${formattedType}-for-${isForSale ? "sale" : "rent"}`,
    };

    return [
      { label: "list", path: "/list" },
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
    { label: "Area", value: area },
    { label: "Facing", value: facing },
    { label: isFurnished ? "Furnished" : "Not Furnished", value: "" },
    {
      label: hasParking ? "Parking Facility" : "No Parking",
      value: "",
    },
    {
      label: hasSwimmingPool ? "Swimming Pool" : "No Swimming Pool",
      value: facing,
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
              fontSize={{ xs: "1.4rem !important", md: "2.5rem !important" }}
              fontWeight={600}
              textTransform="capitalize"
            >
              {title?.toLowerCase()}
            </Typography>
            <Button
              size="large"
              variant="contained"
              disableRipple
              sx={{
                width: { xs: "100%", md: "200px" },
                whiteSpace: "nowrap",
                fontWeight: 600,
                fontSize: "1rem",
                borderRadius: "1rem",
              }}
            >
              {formattedPrice.slice(0, -3)}
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
                  sx={{
                    whiteSpace: "nowrap",
                    fontWeight: 600,
                    borderRadius: "0.5rem",
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                  }}
                  variant="outlined"
                >
                  {value} {label}
                </Button>
              );
            })}
          </Box>
          <Divider />
          <Typography variant="body">{description}</Typography>
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
