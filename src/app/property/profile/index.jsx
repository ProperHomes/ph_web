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
import { Montserrat, Manrope } from "next/font/google";

const monsterratFont = Montserrat({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const manRopeFont = Manrope({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

function PropertyLayout({ data }) {
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

  const importantInfo = [
    { label: "", value: type },
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
      <Breadcrumbs
        links={[
          { label: "list", path: "/list" },
          {
            label: `${type}s For ${isForSale ? "Sale" : "Rent"}`,
            path: `/list/${type?.toLowerCase()}s-for-${
              isForSale ? "sale" : "rent"
            }`,
          },
          {
            label: city,
            path: `/list/${type?.toLowerCase()}s-for-${
              isForSale ? "sale" : "rent"
            }/${city?.toLowerCase()}`,
          },
        ]}
      />
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <ImageSwiper images={images} />
      </Box>

      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <ImageGrid images={images} />
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
              fontFamily={manRopeFont}
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
                fontFamily: monsterratFont,
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
                    fontFamily: monsterratFont,
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
          <Typography variant="body" fontFamily={manRopeFont}>
            {description}
          </Typography>
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

export default PropertyLayout;