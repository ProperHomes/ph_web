"use client";
import { useState } from "react";
import Link from "next/link";
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
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import useUploadFile from "src/hooks/useUploadFile";
import { CREATE_PROPERTY, CREATE_PROPERTY_MEDIA } from "@/graphql/properties";
import MediaBlocks from "./MediaBlocks";
import {
  ALL_CITIES,
  LISTING_TYPE,
  PROPERTY_STATUS,
  PROPERTY_TYPE,
} from "@/utils/constants";
import useToggleAuth from "src/hooks/useToggleAuth";
import Loading from "@/components/Loading";
import { convertStringToSlug } from "@/utils/helper";

const newPropertyResolver = {
  type: yup.string().oneOf(Object.keys(PROPERTY_TYPE)).required(),
  title: yup.string().required(),
  price: yup.string().required(),
  bedrooms: yup.number().required().moreThan(0),
  bathrooms: yup.number().required().moreThan(0),
  area: yup.string().required(),
  description: yup.string(),
  city: yup.string().oneOf(ALL_CITIES).required(),
  listedFor: yup.string().oneOf(Object.keys(LISTING_TYPE)).required(),
  isFurnished: yup.string().required(),
  hasParking: yup.string().required(),
  media: yup
    .array()
    .min(5, "atleast fives images are required")
    .max(10, "Only 10 max images can be added")
    .required(),
};

const StyledForm = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "4rem",
  gridTemplateColumns: "1fr 0.4fr",
  [theme.breakpoints.down("md")]: {
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

function CreatePropertySaleRentLease({ data, handleCancel }) {
  const theme = useTheme();
  const router = useRouter();
  const { isLoggedIn, loggedInUser, toggleAuth, Auth } = useToggleAuth();

  const [createProperty] = useMutation(CREATE_PROPERTY);
  const [createPropertyImage] = useMutation(CREATE_PROPERTY_MEDIA);
  const handleFileUpload = useUploadFile();

  const isEditMode = !!data;

  const { control, handleSubmit, setValue, formState } = useForm({
    resolver: yupResolver(yup.object().shape(newPropertyResolver)),
    defaultValues: data,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateMedia = (media) => {
    setValue("media", media);
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
              creatorId: loggedInUser?.id,
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
      console.log("checking error", err);
    }
  };

  const handleCreateProperty = async (data) => {
    setIsLoading(true);
    try {
      const dataNew = { ...data };
      delete dataNew.media;
      const slug = `${convertStringToSlug(data.title)}-${loggedInUser?.number}`;
      const res = await createProperty({
        variables: {
          input: {
            property: {
              ...dataNew,
              slug,
              ownerId: loggedInUser?.id,
              country: "INDIA",
              isFurnished: Boolean(data.isFurnished),
              hasParking: Boolean(data.hasParking),
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
    handleCreateDraft({ ...data, status: PROPERTY_STATUS.DRAFT });
  };

  const handleSubmitForReview = (data) => {
    handleCreateProperty({ ...data, status: "IN_REVIEW" });
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
      handleSubmit(handleSubmitForReview)();
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
          {!!data ? "Update Property" : "List your property"}
        </Typography>

        <Typography fontSize="1.2rem" align="center" gutterBottom>
          Add your property's basic details to get your property listed on
          ProperHomes for free.
        </Typography>

        <Button
          LinkComponent={Link}
          href="/property-rental-management-for-owners-managers"
          size="medium"
          variant="contained"
          color="info"
          sx={{ display: { xs: "block", md: "none" } }}
        >
          Learn about Rental Properties Management
        </Button>
      </Stack>

      <StyledForm p={{ xs: 2, md: 4 }}>
        <Stack spacing={4}>
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
            <Label>Where is the property located ?*</Label>
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

          <Stack
            spacing={4}
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
          >
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
              <Label>Enter the size of the property*</Label>
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
                    type="text"
                    placeholder="Eg: 2500 sq.ft"
                    value={value ?? ""}
                    onChange={onChange}
                    error={!!error?.message}
                  />
                )}
              />
            </Stack>
            <Stack>
              <Label>Number of bedrooms*</Label>
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
              <Label>Number of bathrooms*</Label>
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
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "start", md: "end" }}
          >
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

            <FormControlLabel
              sx={{ "& span": { fontSize: "1rem" } }}
              control={
                <Controller
                  name="isFurnished"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      checked={value}
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
                  name="hasParking"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      checked={value}
                      onChange={onChange}
                      size="medium"
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                    />
                  )}
                />
              }
              label="Has Parking"
            />
          </Stack>

          <Stack>
            <Label>Property Title *</Label>
            <Controller
              name="title"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Eg: 4bhk fully furnished flat for sale in the financial district of hyderabad."
                  type="text"
                  value={value ?? ""}
                  onChange={onChange}
                  error={!!error?.message}
                />
              )}
            />
          </Stack>

          <Stack>
            <Label>Add property details (optional) </Label>
            <Controller
              name="description"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  variant="outlined"
                  placeholder="Enter property details that you want to mention here"
                  type="text"
                  value={value ?? ""}
                  onChange={onChange}
                  error={!!error?.message}
                />
              )}
            />
          </Stack>
        </Stack>
        <Stack spacing={2} sx={{ height: "100%" }}>
          <Typography fontSize="1.5rem">
            Add Property Media (images or videos)*
          </Typography>
          <Box my={8}>
            <MediaBlocks handleUpdateMedia={handleUpdateMedia} />
          </Box>

          {!!errors.media && (
            <Typography color="error">
              You need to add atleast 5 images of the property
            </Typography>
          )}

          <Stack direction="row" alignItems="center" spacing={4}>
            {!!data && (
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
              aria-label="submit property for review"
            >
              Submit Property
            </Button>
          </Stack>
        </Stack>
      </StyledForm>
      {Auth}
    </Box>
  );
}

export default CreatePropertySaleRentLease;