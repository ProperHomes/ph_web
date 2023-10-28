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
      "Basic Analytics.",
      "Rental Management with Autopay.",
      "Rental Agreement Generation.",
      "Rental Receipt Generation.",
      "Realtime Customer Interest Notification Alerts.",
    ],
  },
  {
    name: "Prime",
    price: 2500,
    features: [
      "Everything in free plan.",
      "List upto 10 Properties.",
      "Customer Support.",
      "Separate Business Profile Page.",
      "Buyers don't need to pay to view your property contact details (if agreed by you).",
      "Full fledged Analytics, insights and alerts.",
    ],
  },
  {
    name: "Premium",
    price: 5000,
    features: [
      "Everything in Prime Plan.",
      "List upto 25 Properties.",
      "Priority Customer Support 24/7.",
      "Boost 1 property in 1 city everyday.",
      "Free Doorstep Rental Agreement Delivery.",
      "Exclusive Discount on Home Services for your Properties.",
    ],
  },
];

export default function Pricing() {
  const theme = useTheme();
  const [index, setIndex] = useState(0);

  const isDarkMode = theme.palette.mode === "dark";
  const handleChange = (_e, newIndex) => {
    setIndex(newIndex);
  };

  return (
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
          <Typography textAlign="center" fontSize="1.2rem">
            All Paid plans come with a <b>10% Annual Discount</b> ..!
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
                    <Typography fontSize="1rem" color="#ff5757" fontWeight={800}>
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
            a&#41; Every property listed on <Link href="/">ProperHomes</Link> is
            <b> manually verified by us.</b>
          </Typography>
          <Typography sx={{ fontSize: "1.2rem" }}>
            b&#41; As a buyer or tenant, you can{" "}
            <b> view unlimited properties for free.</b>
          </Typography>
          <Typography sx={{ fontSize: "1.2rem" }}>
            c&#41; To access contact details of properties, you need credits
            which costs <b>{getRupees(25)}</b> each. So with 1 credit you can
            view contact details of one property.
          </Typography>
          <Typography sx={{ fontSize: "1.2rem" }}>
            d&#41; <b>Credits never expire </b> unlike other platforms.
            You&apos;ll always have acccess to previously viewed contact details
            of a property forever.
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
    </Stack>
  );
}
