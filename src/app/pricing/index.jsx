"use client";
import { useState } from "react";
import Link from "next/link";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { getRupees } from "src/utils/helper";
import CustomTabPanel from "@/components/CustomTabPanel";
import useToggleAuth from "src/hooks/useToggleAuth";
import { StyledContainer } from "@/styles/styles";

const CustomTabs = styled(Tabs)(({ theme }) => ({
  background:
    theme.palette.mode === "dark" ? "#000" : theme.palette.secondary.main,
  width: "40%",
  borderRadius: "1rem",
  padding: "0.1em",
  [theme.breakpoints.down("md")]: {
    width: "70%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  ".MuiButtonBase-root": {
    color: "#00000075",
    "&.Mui-selected": {
      color:
        theme.palette.mode === "dark" ? theme.palette.primary.main : "#000",
    },
  },
}));

const ListBox = styled(Stack)(({ theme }) => ({
  boxShadow: theme.shadows[2],
  border: theme.palette.mode === "dark" ? "0.4px solid" : "1px solid",
  borderColor: theme.palette.mode === "dark" ? "#ffffff20" : "#fafafa",
  borderRadius: "1rem",
  padding: "1rem",
  maxWidth: "300px",
}));

const sellerPricing = [
  {
    name: "Free",
    price: 0,
    features: [
      "List 1 Property.",
      "Real time alerts. No analytics.",
      "Max 1-2 leads per month.",
      "Boost feature not available on free plan.",
      "Buyers need to pay ₹25 to contact you.",
    ],
  },
  {
    name: "Silver",
    price: 2500,
    features: [
      "List 10 Properties.",
      "Real Time Alerts and Full fledged Analytics.",
      "Max 5 Leads per month on an average",
      "Boost your Property once every week. City level only.",
      "Buyers don't need to pay to contact you. (if agreed by you).",
    ],
  },
  {
    name: "Gold",
    price: 5000,
    features: [
      "List Unlimited Properties.",
      "Real Time Alerts and Full fledged Analytics.",
      "Max 10 Leads per month on an average.",
      "Boost your Property once every 2 days. City and Locality level.",
      "Buyers don't need to pay to contact you. (if agreed by you).",
    ],
  },
];

export default function Pricing() {
  const theme = useTheme();
  const [index, setIndex] = useState(0);

  const { toggleAuth, Auth, isLoggedIn } = useToggleAuth();
  const isDarkMode = theme.palette.mode === "dark";
  const handleChange = (_e, newIndex) => {
    setIndex(newIndex);
  };

  return (
    <StyledContainer>
      <Stack py={4} spacing={4} alignItems="center" justifyContent="center">
        <CustomTabs
          value={index}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: isDarkMode
                ? "transparent"
                : theme.palette.secondary.main,
              height: "100%",
              border: `1px solid ${theme.palette.info.main}`,
              borderRadius: "1rem",
              borderTopLeftRadius: "1rem !important",
              transitionDuration: "0.5s",
            },
          }}
          aria-label="pricing page select buyer or seller"
        >
          {["Owner/Seller", "Buyer/Tenant"].map((t) => {
            return (
              <Tab
                key={t}
                disableRipple
                disableFocusRipple
                sx={{
                  width: "50%",
                }}
                label={<Typography fontSize="1.5rem">{t}</Typography>}
              />
            );
          })}
        </CustomTabs>

        <CustomTabPanel index={0} value={index}>
          <Stack spacing={2}>
            <Typography textAlign="center" fontSize="1.2rem" fontWeight={800}>
              Zero Hidden Charges.
            </Typography>
            <Typography textAlign="center" fontSize="1.2rem">
              Pay annually and get <b>10% Discount on total</b> ..!
            </Typography>
            <Stack
              display={{ xs: "none", md: "flex" }}
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              {sellerPricing.map(({ name, price, features }) => {
                return (
                  <ListBox
                    key={name}
                    sx={{
                      maxWidth: "300px",
                    }}
                  >
                    <Stack
                      spacing={2}
                      direction="row"
                      alignItems="center"
                      px={1}
                      py={2}
                      sx={{
                        backgroundColor: theme.palette.background.default,
                      }}
                    >
                      <Typography fontSize="1.5rem" fontWeight={800}>
                        {name}
                      </Typography>
                      <Typography
                        fontSize="1.2rem"
                        color="#ff5757"
                        fontWeight={800}
                      >
                        {price > 0 && `${getRupees(price)} /month`}
                      </Typography>
                    </Stack>
                    <Divider />
                    <List>
                      {features.map((f) => {
                        return (
                          <ListItem key={f}>
                            <ListItemText>{f}</ListItemText>
                          </ListItem>
                        );
                      })}
                    </List>
                    <Button
                      variant="outlined"
                      onClick={!isLoggedIn ? toggleAuth : () => {}}
                      sx={{
                        marginTop: "auto",
                        borderRadius: "0.8rem",
                        borderColor: theme.palette.info.main,
                        color: theme.palette.info.main,
                        fontWeight: 800,
                        fontSize: "1rem",
                      }}
                    >
                      {isLoggedIn ? "Get this Plan" : "Signup Now"}
                    </Button>
                  </ListBox>
                );
              })}
            </Stack>

            <Stack
              display={{ xs: "flex", md: "none" }}
              direction="column"
              justifyContent="space-between"
              spacing={2}
            >
              {sellerPricing.map(({ name, price, features }) => {
                return (
                  <Accordion key={name} defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Stack
                        spacing={2}
                        direction="row"
                        alignItems="center"
                        p={1}
                        sx={{
                          backgroundColor: theme.palette.background.default,
                        }}
                      >
                        <Typography
                          fontSize={{ xs: "1.2rem", md: "1.5rem" }}
                          fontWeight={800}
                        >
                          {name}
                        </Typography>
                        <Typography fontSize="1rem" fontWeight={800}>
                          {name !== "Free" && `${getRupees(price)} /month`}
                        </Typography>
                      </Stack>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                      <Stack>
                        {features.map((f) => {
                          return (
                            <ListItem key={f}>
                              <ListItemText>{f}</ListItemText>
                            </ListItem>
                          );
                        })}
                        <Button
                          variant="outlined"
                          sx={{
                            marginTop: "auto",
                            borderRadius: "0.8rem",
                            borderColor: theme.palette.info.main,
                            color: theme.palette.info.main,
                            fontWeight: 800,
                            fontSize: "1rem",
                          }}
                        >
                          Signup Now
                        </Button>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Stack>
          </Stack>
        </CustomTabPanel>

        <CustomTabPanel value={index} index={1}>
          <ListBox
            spacing={4}
            sx={{
              boxShadow: theme.shadows[1],
              maxWidth: "500px",
            }}
          >
            <Typography sx={{ fontSize: "1.2rem" }}>
              a&#41;<b> View unlimited properties for free</b> except the
              contact details. You need credits to view contact details.
            </Typography>
            <Typography sx={{ fontSize: "1.2rem" }}>
              b&#41;You get <b>1 credit for free when you signup.</b> Each
              credit is equal to <b>₹25</b>.
            </Typography>
            <Typography sx={{ fontSize: "1.2rem" }}>
              c&#41;With each credit you can view contact details of one
              property <b>forever</b>.
            </Typography>

            <Typography sx={{ fontSize: "1.2rem" }}>
              e&#41; <b>Buy more credits </b> to contact more properties.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                marginTop: "auto",
                borderRadius: "0.8rem",
                borderColor: theme.palette.info.main,
                color: theme.palette.info.main,
                fontWeight: 800,
                fontSize: "1rem",
              }}
            >
              Buy Credits
            </Button>
          </ListBox>
        </CustomTabPanel>

        <Stack
          spacing={2}
          sx={{ maxWidth: "800px" }}
          justifyContent="center"
          alignContent="center"
        >
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: 800,
              textDecoration: "underline",
            }}
          >
            Note:
          </Typography>
          <Typography sx={{ fontSize: "1.2rem" }}>
            - Every property must be verified by us to get listed on on{" "}
            <Link
              prefetch={false}
              style={{ textDecoration: "underline" }}
              href="/"
            >
              ProperHomes
            </Link>
            . No exceptions.
          </Typography>
          {index === 1 && (
            <Typography sx={{ fontSize: "1.2rem" }}>
              - Get your credit refunded, if the property (you spent your credit
              on) was not available anymore.
            </Typography>
          )}
          <Typography sx={{ fontSize: "1.2rem" }}>
            - If you have any questions, you can either read the{" "}
            <Link
              href="/faq"
              prefetch={false}
              style={{ textDecoration: "underline" }}
            >
              FAQ
            </Link>{" "}
            or email us directly at veera@properhomes.in or call/sms/whatsapp us
            directly @ +916305078250
          </Typography>
        </Stack>

        {Auth}
      </Stack>
    </StyledContainer>
  );
}
