"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import isEqual from "lodash.isequal";

import {
  CREATE_PROPERTY,
  UPDATE_PROPERTY,
  CREATE_PROPERTY_MEDIA,
  DELETE_PROPERTY_MEDIA,
} from "@/graphql/properties";
import MediaBlocks from "./MediaBlocks";
import {
  ALL_CITIES,
  AREA_UNITS,
  LISTING_TYPE,
  PROPERTY_FACING,
  PROPERTY_STATUS,
  PROPERTY_TYPE,
} from "@/utils/constants";
import useToggleAuth from "src/hooks/useToggleAuth";
import useRevalidate from "src/hooks/useRevalidate";
import useDeleteFile from "src/hooks/useDeleteFile";
import useUploadFile from "src/hooks/useUploadFile";
import { convertStringToSlug } from "@/utils/helper";
import Loading from "@/components/Loading";

const Editor = dynamic(() => import("src/components/TextEditor/Editor"), {
  ssr: false,
});

const propertyResolver = {
  type: yup.string().oneOf(Object.keys(PROPERTY_TYPE)).required(),
  title: yup.string().required(),
  slug: yup.string().required(),
  price: yup.number().required(),
  bedrooms: yup.number().required().moreThan(0),
  bathrooms: yup.number().required().moreThan(0),
  area: yup
    .number()
    .positive()
    .required("Size of the property must be specified"),
  areaUnit: yup.string().required().oneOf(Object.keys(AREA_UNITS)),
  description: yup.string().required(),
  city: yup.string().oneOf(ALL_CITIES).required(),
  facing: yup.string().oneOf(Object.keys(PROPERTY_FACING)),
  pincode: yup
    .number()
    .positive()
    .required()
    .test(
      "len",
      "Must be exactly 6 characters",
      (val) => val.toString().length === 6
    ),
  listedFor: yup.string().oneOf(Object.keys(LISTING_TYPE)).required(),
  isFurnished: yup.boolean(),
  isSemiFurnished: yup.boolean(),
  hasParking: yup.boolean(),
  status: yup.string().oneOf(Object.keys(PROPERTY_STATUS)).nullable(),
  media: yup
    .array()
    .min(5, "atleast fives images are required")
    .max(20, "Only 20 maximum images can be added")
    .required(),
};

const StyledForm = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "4rem",
  gridTemplateColumns: "1fr 0.4fr",
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr",
  },
}));

const StyledGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "2rem",
  gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr",
  },
}));

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

function CreatePropertySaleRentLease({
  data,
  handleCancel,
  isFromDashboard,
  ownerId,
  ownerNumber,
}) {
  const theme = useTheme();
  const router = useRouter();
  const { isLoggedIn, loggedInUser, toggleAuth, Auth } = useToggleAuth();

  const [createProperty] = useMutation(CREATE_PROPERTY);
  const [updateProperty] = useMutation(UPDATE_PROPERTY);
  const [createPropertyImage] = useMutation(CREATE_PROPERTY_MEDIA);
  const [deletePropertyMedia] = useMutation(DELETE_PROPERTY_MEDIA);

  const handleFileUpload = useUploadFile();
  const { handleDeleteMultipleFiles } = useDeleteFile();
  const { handleRevalidate } = useRevalidate();

  const isEditMode = !!data;

  const { control, handleSubmit, setValue, watch, formState } =
    useForm({
      resolver: yupResolver(yup.object().shape(propertyResolver)),
      defaultValues: data,
    });
  watch();

  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateMedia = (media) => {
    setValue("media", media);
  };

  const handleDeletePropertyMedia = async (media) => {
    const existingMedia = data?.media?.nodes ?? [];
    const mediaToDelete = existingMedia.reduce((acc, curr) => {
      const isRemoved = !media.map((m) => m.id).includes(curr?.id);
      if (isRemoved) {
        acc.push(curr);
      }
      return acc;
    }, []);
    if (mediaToDelete.length === 0) {
      return null;
    }
    try {
      await Promise.all(
        mediaToDelete.map(async (m) => {
          await deletePropertyMedia({ variables: { input: { id: m.id } } });
        })
      );
      await handleDeleteMultipleFiles(mediaToDelete.map((m) => m.mediaId));
    } catch (err) {
      console.log("error deleting property media", err);
    }
  };

  const handleUploadPropertyMedia = async (media, propertyId) => {
    const files = media?.map((m) => m.file).filter((x) => x);
    if (files.length === 0) {
      return null;
    }
    try {
      await Promise.all(
        files.map(async (f) => {
          const newFile = await handleFileUpload({
            file: {
              key: f,
              extension: f.type,
              creatorId: ownerId ?? loggedInUser?.id,
            },
          });
          if (newFile?.id) {
            await createPropertyImage({
              variables: {
                input: {
                  propertyMedia: {
                    propertyId,
                    mediaId: newFile.id,
                  },
                },
              },
            });
          }
        })
      );
    } catch (err) {
      console.log("error uploading property media", err);
    }
  };

  const handleUpdateProperty = async (formData) => {
    const dataFromProps = { ...data };
    dataFromProps.media = data?.media?.nodes?.map((m) => ({
      id: m?.id,
      mediaId: m?.mediaId,
      preview: m?.mediaUrl ?? m?.media?.signedUrl,
    }));
    const isChanged = !isEqual(dataFromProps, formData);
    if (isChanged) {
      setIsLoading(true);
      try {
        const dataToUpdate = {};
        const keysNotNeeded = [
          "__typename",
          "id",
          "number",
          "media",
          "slug",
          "ownerId",
          "projectId",
          "project",
          "tenantId",
          "createdAt",
        ];

        for (let key in formData) {
          if (!keysNotNeeded.includes(key)) {
            const value = formData[key];
            if (value === "true" || value === "false") {
              dataToUpdate[key] = Boolean(value);
            } else {
              dataToUpdate[key] = value;
            }
          }
        }
        const res = await updateProperty({
          variables: {
            input: {
              id: formData.id,
              patch: dataToUpdate,
            },
          },
        });
        const updatedProperty = res?.data?.updateProperty?.property;
        if (updatedProperty?.id) {
          await handleUploadPropertyMedia(formData.media, updatedProperty.id);
          await handleDeletePropertyMedia(formData.media);
          handleRevalidate([
            `/property/${formData.slug}`,
            `/dashboard/manage/property/${formData.slug}`,
          ]);
          handleCancel();
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }
  };

  const handleCreateProperty = async (data) => {
    setIsLoading(true);
    try {
      const dataNew = { ...data };
      delete dataNew.media;
      const res = await createProperty({
        variables: {
          input: {
            property: {
              ...dataNew,
              ownerId: ownerId ?? loggedInUser?.id, // Todo: remove this if we need to attach ord_id
              country: "INDIA",
            },
          },
        },
      });
      const newProperty = res?.data?.createProperty?.property;
      if (newProperty?.id) {
        await handleUploadPropertyMedia(data.media, newProperty.id);
        router.push("/dashboard/manage");
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const handleCreateDraft = (data) => {
    handleCreateProperty({ ...data, status: PROPERTY_STATUS.DRAFT });
  };

  const handleSubmitForReview = (data) => {
    handleCreateProperty({ ...data, listingStatus: "IN_REVIEW" });
  };

  const handleChangeTitle = (e) => {
    const updatedTitle = e.target.value;
    setValue("title", updatedTitle);
    setValue(
      "slug",
      `${convertStringToSlug(updatedTitle)}-${
        ownerNumber ?? loggedInUser?.number
      }`
    );
  };

  const handleChangeDescription = (htmlDescription) => {
    setValue("description", htmlDescription);
  };

  const onSubmitDraft = async () => {
    if (isLoggedIn) {
      handleSubmit(handleCreateDraft)();
    } else {
      toggleAuth();
    }
  };

  const onSubmit = async () => {
    if (isLoggedIn) {
      if (isEditMode) {
        handleSubmit(handleUpdateProperty)();
      } else {
        handleSubmit(handleSubmitForReview)();
      }
    } else {
      toggleAuth();
    }
  };

  const { submitting, errors } = formState;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff",
        borderRadius: "1em",
      }}
    >
      {isLoading && <Loading />}
      <Stack py={2}>
        <Typography
          pt={2}
          gutterBottom
          variant="h1"
          textAlign="center"
          fontSize={{ xs: "1.5rem", md: "2.5rem" }}
        >
          {isEditMode ? "Update Property" : "List your property"}
        </Typography>

        {!isEditMode && !isFromDashboard && (
          <Typography fontSize="1.2rem" align="center" gutterBottom>
            Add your property details to get your property listed on ProperHomes
            for free.
          </Typography>
        )}
      </Stack>

      <StyledForm p={{ xs: 2, md: 6 }}>
        <Stack spacing={4}>
          <StyledGrid>
            <Stack>
              <Label>Type of Property? *</Label>
              <Controller
                name="type"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <StyledSelect
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) {
                        return <Typography>Eg: FLAT</Typography>;
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

                    {Object.keys(PROPERTY_TYPE).map((type) => {
                      return (
                        <MenuItem
                          key={type}
                          value={type}
                          style={{ fontWeight: 500, fontSize: "0.8rem" }}
                        >
                          {PROPERTY_TYPE[type]}
                        </MenuItem>
                      );
                    })}
                  </StyledSelect>
                )}
              />
            </Stack>
            <Stack>
              <Label>Sale or Rent?*</Label>
              <Controller
                name="listedFor"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
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
                    {Object.keys(LISTING_TYPE).map((listingFor) => {
                      return (
                        <MenuItem
                          key={listingFor}
                          value={listingFor}
                          style={{ fontWeight: 500, fontSize: "0.8rem" }}
                        >
                          {listingFor}
                        </MenuItem>
                      );
                    })}
                  </StyledSelect>
                )}
              />
            </Stack>
            <Stack>
              <Label>Property City ?*</Label>
              <Controller
                name="city"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <StyledSelect
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) {
                        return <Typography>Select a City</Typography>;
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
                    {ALL_CITIES.map((city) => {
                      return (
                        <MenuItem
                          key={city}
                          value={city}
                          style={{ fontWeight: 500, fontSize: "0.8rem" }}
                        >
                          {city}
                        </MenuItem>
                      );
                    })}
                  </StyledSelect>
                )}
              />
            </Stack>
            <Stack>
              <Label>Pincode*</Label>
              <Controller
                name="pincode"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Eg: 500123"
                    type="number"
                    value={value ? Number(value) : ""}
                    onChange={onChange}
                    error={!!error?.message}
                  />
                )}
              />
            </Stack>
          </StyledGrid>

          <StyledGrid>
            <Stack>
              <Label>Price*</Label>
              <Controller
                name="price"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
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
              <Label>Enter the size*</Label>
              <Controller
                name="area"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="number"
                    placeholder="Eg: 2500 sq.ft"
                    value={value ?? ""}
                    onChange={onChange}
                    error={!!error?.message}
                    sx={{
                      "& .MuiInputBase-root": {
                        paddingRight: "0",
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <Controller
                            name="areaUnit"
                            control={control}
                            render={({
                              field: { onChange, value },
                              fieldState: { error },
                            }) => (
                              <Select
                                displayEmpty
                                renderValue={(selected) => {
                                  if (!selected) {
                                    return <Typography>unit</Typography>;
                                  }
                                  return selected;
                                }}
                                value={value ? AREA_UNITS[value] : ""}
                                onChange={onChange}
                                error={!!error?.message}
                                sx={{
                                  "& fieldset": {
                                    border: "none",
                                  },
                                }}
                              >
                                <MenuItem value="" disabled>
                                  Select one from below
                                </MenuItem>
                                {Object.keys(AREA_UNITS).map((u) => {
                                  return (
                                    <MenuItem
                                      key={u}
                                      value={u}
                                      style={{
                                        fontWeight: 500,
                                        fontSize: "0.8rem",
                                      }}
                                    >
                                      {AREA_UNITS[u]}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            )}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Stack>
            <Stack>
              <Label>Bedrooms*</Label>
              <Controller
                name="bedrooms"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
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
              <Label>Bathrooms*</Label>
              <Controller
                name="bathrooms"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
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
          </StyledGrid>

          <StyledGrid>
            <Stack>
              <Label>Facing</Label>
              <Controller
                name="facing"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
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
                    {Object.keys(PROPERTY_FACING).map((f) => {
                      return (
                        <MenuItem
                          key={f}
                          value={f}
                          style={{ fontWeight: 500, fontSize: "0.8rem" }}
                        >
                          {f}
                        </MenuItem>
                      );
                    })}
                  </StyledSelect>
                )}
              />
            </Stack>
            <FormControlLabel
              sx={{ "& span": { fontSize: "1rem" } }}
              control={
                <Controller
                  name="isFurnished"
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
              label="Is Furnished"
            />

            <FormControlLabel
              sx={{ "& span": { fontSize: "1rem" } }}
              control={
                <Controller
                  name="isSemiFurnished"
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
              label="Is Semi Furnished"
            />
            <FormControlLabel
              sx={{ "& span": { fontSize: "1rem" } }}
              control={
                <Controller
                  name="hasParking"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      checked={!!value}
                      onChange={onChange}
                      size="medium"
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                    />
                  )}
                />
              }
              label="Has Parking"
            />

            <FormControlLabel
              sx={{ "& span": { fontSize: "1rem" } }}
              control={
                <Controller
                  name="status"
                  control={control}
                  render={({ field: { value } }) => (
                    <Checkbox
                      checked={value === "UNDER_CONSTRUCTION"}
                      onChange={(e) => {
                        const isUnderConstruction = e.target.checked;
                        if (isUnderConstruction) {
                          setValue("status", "UNDER_CONSTRUCTION");
                        } else {
                          if (value === "UNDER_CONSTRUCTION") {
                            setValue("status", null);
                          }
                        }
                      }}
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 30 },
                      }}
                    />
                  )}
                />
              }
              label="Under Construction"
            />
          </StyledGrid>

          <Stack>
            <Label>Property Title *</Label>
            <Controller
              name="title"
              control={control}
              render={({ field: { value }, fieldState: { error } }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Eg: 4bhk fully furnished flat for sale in the financial district of hyderabad."
                  type="text"
                  value={value ?? ""}
                  onChange={handleChangeTitle}
                  error={!!error?.message}
                />
              )}
            />
          </Stack>

          <Stack>
            <Label>URL path(optional)</Label>
            <Controller
              name="slug"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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

          <Stack sx={{ minHeight: { xs: "50px", md: "150px" } }} spacing={2}>
            <Label>Add property details* </Label>
            <Editor
              setValue={handleChangeDescription}
              initialState={data?.description}
              isError={!!errors?.description}
            />
          </Stack>
        </Stack>
        <Stack
          mt={{ xs: 4, md: 0 }}
          spacing={2}
          sx={{ height: "100%", maxWidth: "300px" }}
        >
          <Typography fontSize={{ xs: "1rem", md: "1.5rem" }}>
            Add Property Media (min. of 5 images)*
          </Typography>
          <Box my={8}>
            <MediaBlocks
              media={data?.media}
              handleUpdateMedia={handleUpdateMedia}
            />
          </Box>

          {!!errors.media && (
            <Typography color="error">
              You need to add atleast 5 images of the property
            </Typography>
          )}

          <Stack direction="row" alignItems="center" spacing={4}>
            {isEditMode && (
              <Button
                variant="contained"
                color="error"
                aria-label="cancel"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            )}
            {!isEditMode && (
              <Button
                fullWidth
                sx={{ whiteSpace: "nowrap" }}
                onClick={onSubmitDraft}
                variant="outlined"
                disabled={submitting}
                aria-label="save as draft"
              >
                Save as draft
              </Button>
            )}
            <Button
              fullWidth
              sx={{ whiteSpace: "nowrap" }}
              onClick={onSubmit}
              variant="contained"
              color="info"
              disabled={submitting}
              aria-label={
                isEditMode ? "update property" : "submit property for review"
              }
            >
              {isEditMode ? "Update Property" : "Submit Property"}
            </Button>
          </Stack>
        </Stack>
      </StyledForm>
      {Auth}
    </Box>
  );
}

export default CreatePropertySaleRentLease;
