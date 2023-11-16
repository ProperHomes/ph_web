import Image from "next/image";
import Box from '@mui/material/Box'
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CancelIcon from "@mui/icons-material/Cancel";
import VerifiedIcon from "@mui/icons-material/Verified";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import NavTabs from "./NavTabs";
import Card from "../property/Card";
import ContactButtons from "./ContactButtons";

export default function ProjectProfile({ data }) {
  const {
    name,
    coverImage,
    brochure,
    amenities,
    description,
    address,
    properties,
    builder,
  } = data ?? {};

  const {
    hasPowerBackup,
    hasLift,
    hasCCTV,
    hasMaintenanceStaff,
    hasIntercom,
    hasSecurity,
    hasClubHouse,
    hasRainWaterHarvesting,
    hasSwimmingPool,
    hasEarthquakeResistance,
  } = amenities ?? {};

  const amenitiesInfo = {
    hasPowerBackup: {
      label: hasPowerBackup ? "Power Backup" : "No Power Backup",
    },
    hasLift: {
      label: hasLift ? "Lift" : "No Lift",
    },
    hasCCTV: {
      label: hasCCTV ? "CCTV Survelliance" : "No CCTV Survelliance",
    },
    hasMaintenanceStaff: {
      label: hasMaintenanceStaff ? "Maintenance Staff" : "No Maintenance Staff",
    },
    hasCCTV: {
      label: hasIntercom ? "Intercom Facility" : "No Intercom Facility",
    },
    hasSecurity: {
      label: hasSecurity ? "Security Staff" : "No Security Staff",
    },
    hasClubHouse: {
      label: hasClubHouse ? "Club House" : "No Club House",
    },
    hasRainWaterHarvesting: {
      label: hasRainWaterHarvesting
        ? "Rain Water Harvesting"
        : "NO Rain Water Harvesting",
    },
    hasSwimmingPool: {
      label: hasSwimmingPool ? "Swimming Pool" : "No Swimming Pool",
    },
    hasEarthquakeResistance: {
      label: hasEarthquakeResistance
        ? "Earthquake Resistance"
        : "No Earthquake Resistance",
    },
  };

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        borderRadius: "1.4rem",
      }}
      spacing={2}
    >
      <Stack>
        <Stack sx={{ position: "relative", height: 300 }}>
          <Image
            alt="builder profile cover image"
            quality={100}
            priority
            src={coverImage?.signedUrl}
            fill
            sizes="100vw"
            style={{
              position: "absolute",
              objectFit: "cover",
              minHeight: "300px",
              borderRadius: "1.4rem 1.4em 0 0",
            }}
          />
          <ContactButtons url={brochure?.signedUrl} builder={builder} />
        </Stack>

        <NavTabs />
      </Stack>

      <Stack p={4} spacing={4}>
        <Stack spacing={2}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={{ xs: "flex-start", md: "center" }}
            spacing={2}
          >
            <Typography variant="h1" fontWeight={800}>
              {name}
            </Typography>
            <Chip
              icon={<VerifiedIcon color="info" />}
              color="info"
              label="Verified"
            />
          </Stack>

          <Stack py={2} spacing={1}>
            <Typography fontWeight={700}>Address</Typography>
            <Typography>{address}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} sx={{ maxWidth: { xs: "100%", sm: "75%" } }}>
          <Typography variant="h2" fontWeight={800}>
            About {name}
          </Typography>
          <Box
            dangerouslySetInnerHTML={{ __html: description }}
            sx={{
              "& > h2, h3, h4": {
                marginTop: "1rem",
              },
              "& > p": {
                fontSize: "1.1rem",
                marginBottom: "8px",
              },
              "& > ul": {
                padding: "8px 1rem",
              },
              "& > p > a, & > a": {
                textDecoration: "underline !important",
              },
            }}
          />
        </Stack>
      </Stack>

      <Stack p={4} spacing={2} id="#projectAmenities">
        <Typography variant="h2" fontWeight={800}>
          Amenities at {name}
        </Typography>
        <Stack spacing={2}>
          {Object.keys(amenitiesInfo).map((k) => {
            return (
              <Stack key={k} direction="row" spacing={1}>
                {amenities[k] ? (
                  <CheckCircleOutlineIcon color="info" />
                ) : (
                  <CancelIcon color="error" />
                )}
                <Typography>{amenitiesInfo[k].label}</Typography>
              </Stack>
            );
          })}
        </Stack>
      </Stack>

      <Stack p={4} id="#projectProperties" spacing={2}>
        <Typography variant="h2" fontWeight={800}>
          Properties
        </Typography>
        <Stack direction="row" spacing={2}>
          {properties?.nodes?.map((p) => {
            return <Card data={p} key={p.id} showFavorite={false} />;
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}
