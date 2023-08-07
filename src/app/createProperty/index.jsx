"use client";
import { useMutation } from "@apollo/client";
import * as yup from "yup";
import "yup-phone-lite";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";

import useUploadFile from "@/utils/hooks/useUploadFile";
import { CREATE_PROPERTY } from "@/graphql/properties";
import { usePropertyContext } from "src/app/property/context";
import MediaBlocks from "./MediaBlocks";
import { ALL_CITIES, LISTING_TYPE, PROPERTY_TYPE } from "@/utils/constants";
import useToggleAuth from "@/utils/hooks/useToggleAuth";

const newPropertyResolver = {
  type: yup.string().required(),
  title: yup.string().required(),
  bedrooms: yup.number().required().moreThan(0),
  bathrooms: yup.number().required().moreThan(0),
  area: yup.string().required(),
  description: yup.string(),
  city: yup.string().required(),
  listedFor: yup.string().required(),
  isFurnished: yup.string().required(),
  hasParking: yup.string().required(),
  media: yup
    .array()
    .min(5, "atleast one image is required")
    .max(10, "Only 5 max images can be added")
    .required(),
};

const StyledForm = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "1rem",
  gridTemplateColumns: "1fr 0.6fr",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const Label = styled("label")(({ theme }) => ({
  fontFamily: theme.typography.fontFamily.Manrope,
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
  const { isLoggedIn, loggedInUser, toggleAuth, Auth } = useToggleAuth();
  const { state, dispatch } = usePropertyContext();

  const [createProperty] = useMutation(CREATE_PROPERTY);
  const handleFileUpload = useUploadFile();

  const { control, handleSubmit, setValue, formState } = useForm({
    resolver: yupResolver(yup.object().shape(newPropertyResolver)),
    defaultValues: data || {},
  });

  const handleUpdateMedia = (media) => {
    setValue("media", media);
  };

  const handleCreateProperty = async (data) => {
    try {
      const res = await createProperty({
        variables: {
          input: { property: { ...data, ownerId: loggedInUser?.id } },
        },
      });
      const newProperty = res?.data?.createNewProperty?.property;
      if (newProperty?.id) {
        // Todo: upload property images
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitDraft = async () => {
    if (isLoggedIn) {
      handleSubmit(handleCreateProperty)();
    } else {
      toggleAuth();
    }
  };

  const onSubmit = async () => {
    if (isLoggedIn) {
      handleSubmit(handleCreateProperty)();
    } else {
      toggleAuth();
    }
  };

  const { submitting, isLoading, errors } = formState;

  return (
    <Container maxWidth="xl" spacing={2} sx={{ height: "100%" }}>
      <Typography
        gutterBottom
        variant="h1"
        textAlign="center"
        fontSize="2.5rem !important"
        fontFamily={theme.typography.fontFamily.Manrope}
      >
        {!!data ? "Update Property" : "List your property"}
      </Typography>
      <StyledForm>
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
                  value={value}
                  onChange={onChange}
                  error={!!error?.message}
                >
                  {Object.values(PROPERTY_TYPE).map((type) => {
                    return (
                      <MenuItem
                        key={type}
                        value={type}
                        style={{ fontWeight: 500, fontSize: "0.8rem" }}
                      >
                        {type}
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
                  value={value}
                  onChange={onChange}
                  error={!!error?.message}
                >
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
                    value={value}
                    onChange={onChange}
                    error={!!error?.message}
                  >
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
              <Button variant="contained" color="error" onClick={handleCancel}>
                Cancel
              </Button>
            )}
            <Button
              sx={{ whiteSpace: "nowrap" }}
              onClick={onSubmitDraft}
              variant="outlined"
            >
              Save as draft
            </Button>
            <Button
              sx={{ whiteSpace: "nowrap" }}
              onClick={onSubmit}
              variant="contained"
              color="info"
            >
              Submit Property For Review
            </Button>
          </Stack>
        </Stack>
      </StyledForm>
      {Auth}
    </Container>
  );
}

export default CreatePropertySaleRentLease;
