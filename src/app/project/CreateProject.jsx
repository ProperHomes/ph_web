"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useMutation } from "@apollo/client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";

import useToast from "src/hooks/useToast";
import useToggleAuth from "src/hooks/useToggleAuth";
import useUploadFile from "src/hooks/useUploadFile";
import { convertStringToSlug } from "@/utils/helper";
import { CREATE_PROJECT } from "@/graphql/projects";
import Loading from "@/components/Loading";
import AddFileBlock from "@/components/AddFileBlock";
import { PROJECT_STATUS } from "@/utils/constants";

const Editor = dynamic(() => import("src/components/TextEditor/Editor"), {
  ssr: false,
});

const resolver = {
  builderId: yup.string().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  address: yup.string().required(),
  priceRange: yup.array().required(),
  amenities: yup.object().required(),
  status: yup.string().oneOf(Object.keys(PROJECT_STATUS)),
};

const Label = styled("label")(({ theme }) => ({
  fontWeight: 500,
  fontSize: "1rem",
  color: theme.palette.text.secondary,
}));

const StyledSelect = styled(Select)(({ theme, error }) => ({
  fontWeight: 500,
  fontSize: "0.8rem",
  "& fieldset": {
    borderColor: error ? "red" : theme.palette.grey[300],
  },
}));

export default function CreateProject({ handleCancel, isSysAdmin = false }) {
  const theme = useTheme();
  const { isLoggedIn, loggedInUser, toggleAuth, Auth } = useToggleAuth();
  const { toggleToast } = useToast();

  const [logo, setLogo] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [brochure, setBrochure] = useState(null);

  const [createProject] = useMutation(CREATE_PROJECT);

  const handleFileUpload = useUploadFile();

  const { control, handleSubmit, setValue, getValues, watch, formState } =
    useForm({
      resolver: yupResolver(yup.object().shape(resolver)),
    });
  watch();

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateProject = async (data) => {
    setIsLoading(true);
    try {
      const newData = { ...data };
      const slug = `${convertStringToSlug(data.name)}-${Date.now()}`;
      if (logo?.file) {
        const newLogo = await handleFileUpload({
          file: {
            key: logo.file,
            extension: logo.file.type,
            creatorId: loggedInUser?.id,
          },
        });
        newData.logoId = newLogo?.id;
      }
      if (coverImage?.file) {
        const newCover = await handleFileUpload({
          file: {
            key: coverImage.file,
            extension: coverImage.file.type,
            creatorId: loggedInUser?.id,
          },
        });
        newData.coverImageId = newCover?.id;
      }
      if (brochure?.file) {
        const newBrochure = await handleFileUpload({
          file: {
            key: brochure.file,
            extension: brochure.file.type,
            creatorId: loggedInUser?.id,
          },
        });
        newData.brochureId = newBrochure?.id;
      }
      await createProject({
        variables: {
          input: {
            project: {
              ...newData,
              slug,
              isActive: isSysAdmin,
            },
          },
        },
      });
      toggleToast("Project created. We'll let you once it is approved.");
    } catch (err) {
      console.log(err);
    }
    handleCancel();
  };

  const handleChangeDescription = (htmlDescription) => {
    setValue("description", htmlDescription);
  };

  const onSubmit = async () => {
    if (isLoggedIn) {
      handleSubmit(handleCreateProject)();
    } else {
      toggleAuth();
    }
  };

  const handleInputLogo = (e) => {
    const logo = e.target?.files?.[0];
    if (logo) {
      setLogo({ preview: URL.createObjectURL(logo), file: logo });
    }
  };

  const handleInputCover = (e) => {
    const coverImage = e.target?.files?.[0];
    if (coverImage) {
      setCoverImage({
        preview: URL.createObjectURL(coverImage),
        file: coverImage,
      });
    }
  };

  const handleInputBrochure = (e) => {
    const brochure = e.target?.files?.[0];
    if (brochure) {
      setBrochure({ preview: URL.createObjectURL(brochure), file: brochure });
    }
  };

  const { submitting, errors } = formState;

  return (
    <Box
      py={4}
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff",
        borderRadius: "1em",
      }}
    >
      {isLoading && <Loading />}

      <Typography gutterBottom variant="h4">
        Create Project
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        spacing={2}
        py={2}
      >
        <Stack spacing={2}>
          <Label>Add Logo</Label>
          <AddFileBlock isImageType file={logo} onChange={handleInputLogo} />
        </Stack>

        <Stack spacing={2}>
          <Label>Add Cover Image </Label>
          <AddFileBlock
            isImageType
            file={coverImage}
            onChange={handleInputCover}
          />
        </Stack>

        <Stack spacing={2}>
          <Label>Add Brochure </Label>
          <AddFileBlock file={brochure} onChange={handleInputBrochure} />
        </Stack>
      </Stack>

      <Stack spacing={4} sx={{ maxWidth: "800px" }}>
        <Stack>
          <Label>Builder Id</Label>
          <Controller
            name="builderId"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                value={value ?? ""}
                onChange={onChange}
                error={!!error?.message}
              />
            )}
          />
        </Stack>

        <Stack>
          <Label>Name *</Label>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                value={value ?? ""}
                onChange={onChange}
                error={!!error?.message}
              />
            )}
          />
        </Stack>

        <Stack>
          <Label>Address *</Label>
          <Controller
            name="address"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                value={value ?? ""}
                onChange={onChange}
                error={!!error?.message}
              />
            )}
          />
        </Stack>

        <Stack sx={{ minHeight: { xs: "50px", md: "200px" } }} spacing={2}>
          <Label>Add project details or description* </Label>
          <Editor
            setValue={handleChangeDescription}
            isError={!!errors?.description}
          />
        </Stack>

        <Stack>
          <FormControlLabel
            sx={{ "& span": { fontSize: "1rem" } }}
            control={
              <Controller
                name="isReraApproved"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    checked={!!value}
                    onChange={onChange}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 30 },
                    }}
                  />
                )}
              />
            }
            label="Is Rera Approved"
          />
          <FormControlLabel
            sx={{ "& span": { fontSize: "1rem" } }}
            control={
              <Controller
                name="amenities.hasPowerBackup"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    checked={!!value}
                    onChange={onChange}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 30 },
                    }}
                  />
                )}
              />
            }
            label="Has Power backup"
          />
          <FormControlLabel
            sx={{ "& span": { fontSize: "1rem" } }}
            control={
              <Controller
                name="amenities.hasLift"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    checked={!!value}
                    onChange={onChange}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 30 },
                    }}
                  />
                )}
              />
            }
            label="Has Lift"
          />
          <FormControlLabel
            sx={{ "& span": { fontSize: "1rem" } }}
            control={
              <Controller
                name="amenities.hasIntercom"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    checked={!!value}
                    onChange={onChange}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 30 },
                    }}
                  />
                )}
              />
            }
            label="Has Intercom Facility"
          />
          <FormControlLabel
            sx={{ "& span": { fontSize: "1rem" } }}
            control={
              <Controller
                name="amenities.hasSecurity"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    checked={!!value}
                    onChange={onChange}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 30 },
                    }}
                  />
                )}
              />
            }
            label="Has Security"
          />
          <FormControlLabel
            sx={{ "& span": { fontSize: "1rem" } }}
            control={
              <Controller
                name="amenities.hasMaintenanceStaff"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    checked={!!value}
                    onChange={onChange}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 30 },
                    }}
                  />
                )}
              />
            }
            label="Has Maintenance Staff"
          />
          <FormControlLabel
            sx={{ "& span": { fontSize: "1rem" } }}
            control={
              <Controller
                name="amenities.hasClubHouse"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    checked={!!value}
                    onChange={onChange}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 30 },
                    }}
                  />
                )}
              />
            }
            label="Has Club House"
          />
          <FormControlLabel
            sx={{ "& span": { fontSize: "1rem" } }}
            control={
              <Controller
                name="amenities.hasRainWaterHarvesting"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    checked={!!value}
                    onChange={onChange}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 30 },
                    }}
                  />
                )}
              />
            }
            label="Has Rain Water Harvesting"
          />
          <FormControlLabel
            sx={{ "& span": { fontSize: "1rem" } }}
            control={
              <Controller
                name="amenities.hasCCTV"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    checked={!!value}
                    onChange={onChange}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 30 },
                    }}
                  />
                )}
              />
            }
            label="Has CC TV"
          />
          <FormControlLabel
            sx={{ "& span": { fontSize: "1rem" } }}
            control={
              <Controller
                name="amenities.hasVaastuComplaince"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    checked={!!value}
                    onChange={onChange}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 30 },
                    }}
                  />
                )}
              />
            }
            label="Has Vaastu Complaince"
          />
          <FormControlLabel
            sx={{ "& span": { fontSize: "1rem" } }}
            control={
              <Controller
                name="amenities.hasSwimmingPool"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    checked={!!value}
                    onChange={onChange}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 30 },
                    }}
                  />
                )}
              />
            }
            label="Has Swimming Pool"
          />
          <FormControlLabel
            sx={{ "& span": { fontSize: "1rem" } }}
            control={
              <Controller
                name="amenities.hasEarthquakeResistance"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    checked={!!value}
                    onChange={onChange}
                    sx={{
                      "& .MuiSvgIcon-root": { fontSize: 30 },
                    }}
                  />
                )}
              />
            }
            label="Has Earthquake Resistance"
          />
        </Stack>

        <Stack>
          <Label>Price Range *</Label>
          <Controller
            name="priceRange"
            control={control}
            render={({ field: { value } }) => (
              <Slider
                step={100000}
                getAriaLabel={() => "Price Range"}
                value={value ?? [5000000, 10000000]}
                onChange={(_e, v) => setValue("priceRange", v)}
                valueLabelDisplay="auto"
                min={1500000}
                max={20000000}
              />
            )}
          />
        </Stack>

        <Stack>
          <Label>Project Status *</Label>
          <Controller
            name="status"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <StyledSelect
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <Typography>Select one</Typography>;
                  }
                  return selected;
                }}
                value={value ?? ""}
                onChange={onChange}
                error={!!error?.message}
              >
                <MenuItem value="" disabled>
                  Select one from below
                </MenuItem>
                {Object.keys(PROJECT_STATUS).map((s) => {
                  return (
                    <MenuItem
                      key={s}
                      value={s}
                      style={{ fontWeight: 500, fontSize: "0.8rem" }}
                    >
                      {s}
                    </MenuItem>
                  );
                })}
              </StyledSelect>
            )}
          />
        </Stack>
      </Stack>

      <Stack py={2} spacing={2} sx={{ height: "100%", maxWidth: "300px" }}>
        <Stack direction="row" alignItems="center" spacing={4}>
          <Button
            fullWidth
            sx={{ whiteSpace: "nowrap" }}
            onClick={handleCancel}
            variant="outlined"
            disabled={submitting}
            aria-label="save as draft"
          >
            Cancel
          </Button>

          <Button
            fullWidth
            sx={{ whiteSpace: "nowrap" }}
            onClick={onSubmit}
            variant="contained"
            color="info"
            disabled={submitting}
          >
            Create
          </Button>
        </Stack>
      </Stack>
      {Auth}
    </Box>
  );
}
