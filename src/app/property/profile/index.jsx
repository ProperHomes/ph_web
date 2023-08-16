import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import StickyBox from "src/components/StickyBox";

import { Content } from "./styles";
import ImageSwiper from "src/components/ImageSwiper";
import ImageGrid from "src/components/ImageGrid";
import Breadcrumbs from "src/components/Breadcrumbs";
import { LISTING_TYPE } from "@/utils/constants";
import Sidebar from "./sidebar/index";
import { Divider } from "@mui/material";

function PropertyProfile({ data }) {
  const {
    title,
    description,
    bedrooms,
    bathrooms,
    area,
    price,
    media,
    city,
    facing,
    isFurnished,
    hasParking,
    hasSwimmingPool,
    listedFor,
    type,
  } = data ?? {};
  const images = (media?.nodes ?? []).map((m) => {
    return m.media?.signedUrl ?? m.mediaUrl;
  });

  const isForSale = listedFor === LISTING_TYPE.SALE;

  const formattedPrice = Number(price).toLocaleString("en-in", {
    style: "currency",
    currency: "INR",
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
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <ImageSwiper images={images}>
          {images.map((url) => {
            return (
              <Box
                key={url}
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Image
                  src={url}
                  alt=""
                  priority
                  quality={100}
                  width={450}
                  height={280}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </Box>
            );
          })}
        </ImageSwiper>
      </Box>

      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <ImageGrid images={images}>
          {images.map((url, i) => (
            <Box
              key={url}
              sx={{
                gridColumn: `${i === 0 ? "span 2 / span 2" : "auto"}`,
                gridRow: `${i === 0 ? "span 2 / span 2" : "auto"}`,
                cursor: "pointer",
                objectFit: "cover",
              }}
            >
              <Image
                alt=""
                src={url}
                priority
                width={i === 0 ? 560 : 400}
                height={i === 0 ? 560 : 280}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "flex",
                  borderRadius:
                    i === 0
                      ? "1em 0 0 1em"
                      : i === 2
                      ? "0 1em 0 0"
                      : i === 4
                      ? "0 0 1em 0"
                      : 0,
                }}
              />
            </Box>
          ))}
        </ImageGrid>
      </Box>

      <Content>
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
