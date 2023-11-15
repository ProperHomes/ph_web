"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useMutation } from "@apollo/client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import useToggleAuth from "src/hooks/useToggleAuth";
import useUploadFile from "src/hooks/useUploadFile";
import AddFileBlock from "@/components/AddFileBlock";
import { convertStringToSlug } from "@/utils/helper";
import { CREATE_BUILDER } from "@/graphql/builders";
import Loading from "@/components/Loading";
import { ALL_CITIES } from "@/utils/constants";

const Editor = dynamic(() => import("src/components/TextEditor/Editor"), {
  ssr: false,
});

const propertyResolver = {
  name: yup.string().required(),
  experience: yup.number().required().moreThan(0),
  description: yup.string().required(),
  operatingCities: yup.array().required(),
  officeAddress: yup.string().required(),
  phoneNumber: yup.string().required("Phone number is required"),
};

const Label = styled("label")(({ theme }) => ({
  fontWeight: 500,
  fontSize: "1rem",
  color: theme.palette.text.secondary,
}));

export default function CreateBuilder({ handleCancel }) {
  const theme = useTheme();
  const { isLoggedIn, loggedInUser, toggleAuth, Auth } = useToggleAuth();

  const [logo, setLogo] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [createBuilder] = useMutation(CREATE_BUILDER);

  const handleFileUpload = useUploadFile();

  const { control, handleSubmit, setValue, watch, formState } = useForm({
    resolver: yupResolver(yup.object().shape(propertyResolver)),
  });
  watch();

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateBuilder = async (data) => {
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
      const res = await createBuilder({
        variables: {
          input: {
            builder: {
              ...newData,
              slug,
            },
          },
        },
      });
      //   const newBuilder = res?.data?.createBuilder?.builder;
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
      handleSubmit(handleCreateBuilder)();
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
        Create Builder
      </Typography>

      <Stack direction="row" alignItems="center" spacing={2} py={2}>
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
      </Stack>

      <Stack spacing={4} sx={{ maxWidth: "800px" }}>
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

        <Controller
          name="phoneNumber"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              variant="outlined"
              label="Mobile Number"
              type="tel"
              inputMode="tel"
              value={value ?? ""}
              onChange={onChange}
              error={!!error?.message}
              helperText={error?.message ?? ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography fontSize={"1.2rem"}>+91</Typography>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Stack sx={{ minHeight: { xs: "50px", md: "200px" } }} spacing={2}>
          <Label>Add builder details or description* </Label>
          <Editor
            setValue={handleChangeDescription}
            isError={!!errors?.description}
          />
        </Stack>

        <Stack>
          <Label>Operating Cities*</Label>
          <Controller
            name="operatingCities"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl sx={{ m: 1, width: 300 }}>
                <Select
                  multiple
                  value={value ?? []}
                  onChange={onChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {ALL_CITIES.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={value?.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Stack>

        <Stack>
          <Label>Office Address*</Label>
          <Controller
            name="officeAddress"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Eg: 2"
                type="number"
                value={value ?? ""}
                onChange={onChange}
                error={!!error?.message}
              />
            )}
          />
        </Stack>

        <Stack>
          <Label>Experience*</Label>
          <Controller
            name="experience"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Eg: 2"
                type="number"
                value={value ?? ""}
                onChange={onChange}
                error={!!error?.message}
              />
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
