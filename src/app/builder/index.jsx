import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import NavTabs from "./NavTabs";
import ProjectCards from "./ProjectsCards";

// Todo: add other builders
export default function BuilderProfile({ data }) {
  const {
    name,
    logo,
    coverImage,
    description,
    experience,
    officeAddress,
    projects,
    operatingCities,
  } = data ?? {};

  const onGoingProjects = projects?.nodes?.filter(
    (p) => p.status === "UNDER_CONSTRUCTION"
  );
  const completedProjects = projects?.nodes?.filter(
    (p) => p.status === "READY_TO_MOVE"
  );

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
            src={coverImage.signedUrl}
            fill
            sizes="100vw"
            style={{
              position: "absolute",
              objectFit: "cover",
              minHeight: "300px",
              borderRadius: "1.4rem 1.4em 0 0",
            }}
          />

          <Stack
            p={2}
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{
              position: "absolute",
              left: 20,
              bottom: 20,
              borderRadius: "50%",
              backgroundColor: "#fff",
            }}
          >
            <Image
              alt="builder profile logo"
              quality={100}
              priority
              width={80}
              height={80}
              src={logo.signedUrl}
              style={{
                objectFit: "contain",
                verticalAlign: "center",
              }}
            />
          </Stack>
        </Stack>

        <NavTabs />
      </Stack>

      <Stack p={4} spacing={4}>
        <Stack spacing={2}>
          <Typography variant="h1" fontWeight={800}>
            {name}
          </Typography>
          <Stack py={2} spacing={1}>
            <Typography fontWeight={700}>Office Address</Typography>
            <Typography>{officeAddress}</Typography>
          </Stack>
          <Stack py={2} spacing={1}>
            <Typography fontWeight={700}>Operating Cities</Typography>
            <Typography>{operatingCities.join(", ")}</Typography>
          </Stack>
          <Stack py={2} spacing={1}>
            <Typography fontWeight={700}>Experience</Typography>
            <Typography>{experience} years</Typography>
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

      <Stack p={4} id="#ongoingProjects" spacing={2}>
        <Typography variant="h2" fontWeight={800}>
          Ongoing Projects
        </Typography>
        <ProjectCards projects={onGoingProjects ?? []} />
      </Stack>

      <Stack p={4} id="#completedProjects" spacing={2}>
        <Typography variant="h2" fontWeight={800}>
          Completed Projects
        </Typography>
        <ProjectCards projects={completedProjects ?? []} />
      </Stack>
    </Stack>
  );
}
