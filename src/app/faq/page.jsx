import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const buyerFAQ = [
  {
    question: `How can I access property contact details on ProperHomes?`,
    answer: `To access property contact details, you need to purchase credits on ProperHomes. 
    Each credit costs approximately ₹25 Rupees. Once you've purchased credits, you can use them to view the property contact details.`,
  },
  {
    question: `Is there a limit to the number of credits I can purchase on ProperHomes?`,
    answer: `No, there is no limit to how many credits you can purchase on ProperHomes. 
    You can buy as many as you need to view property contact details.`,
  },
  {
    question: `Do I need to use credits every time I view the same property's contact details on ProperHomes?`,
    answer: `No, once you've purchased property contact details using credits on ProperHomes, 
    you can access them as many times as you want without using additional credits.
    They are available to you forever after purchase.`,
  },
  {
    question: `How do I purchase credits to view property contact details on ProperHomes?`,
    answer: `You can purchase credits directly through ProperHomes using various payment methods, such as credit cards, debit cards, and digital wallets. 
    Simply navigate to the pricing page or payments section on dashboard to make your purchase.`,
  },
  {
    question: `Are there any discounts or packages available for buying credits in bulk on ProperHomes?`,
    answer: `We occasionally offers discounts and credit packages for bulk purchases. 
    Keep an eye on promotions and announcements for cost-effective credit options.`,
  },
  {
    question: `Can I refund or transfer my unused credits?`,
    answer: `Credits on ProperHomes are non-refundable and non-transferable, so make sure to use them for viewing property contact details as needed.`,
  },
  {
    question: `How can I track my credit balance and usage?`,
    answer: `You can easily track your credit balance and usage in your user account dashboard. 
    It provides a clear overview of the credits you've purchased and those you've used.`,
  },
  {
    question: `What should I do if I encounter any issues while using ProperHomes or viewing property details?`,
    answer: `If you face any technical issues or need assistance while using ProperHomes, 
    please contact our customer support team. We're here to help you resolve any problems and ensure a smooth experience.`,
  },
  {
    question: `Is there a notification system for new property listings that match my preferences?`,
    answer: `Yes, We offer a notification system that alerts you to new property listings matching your preferences. 
    You can set up your criteria in your user account on ProperHomes, and we'll notify you when relevant properties become available.`,
  },
];

const sellerFAQ = [
  {
    question: `How can I list my property on ProperHomes?`,
    answer: `You can list your property on ProperHomes for free. If you want to list more than one property then you have to choose one of our seller paid plans. 
    We offer Prime, and Premium paid plans with different features and pricing.`,
  },
  {
    question: `What are the features of the Free Plan for sellers on ProperHomes?`,
    answer: `The Free Plan on ProperHomes allows you to list one property. 
    It includes basic analytics, rental management with autopay, rental agreement and receipt generation, and real-time customer interest notification alerts.`,
  },
  {
    question: `What additional features come with the Prime Plan for sellers on ProperHomes, and what is the cost?`,
    answer: `The Prime Plan on ProperHomes costs ₹2,500 per month and includes everything in the Free Plan. 
    Additionally, you can list up to 10 properties, have basic support, a separate business profile page, and buyers don't need to pay to view your property contact details (if agreed by you).`,
  },
  {
    question: `What are the features of the Premium Plan for sellers on ProperHomes, and how much does it cost?`,
    answer: `The Premium Plan on ProperHomes costs ₹5,000 per month and includes everything in the Prime Plan. 
    You can list up to 25 properties, receive priority support, boost one property in one city every day, and access full-fledged analytics, insights, and alerts.`,
  },
  {
    question: `Can I change my seller plan later if I start with a Free or Prime Plan on ProperHomes?`,
    answer: `Yes, you can upgrade or downgrade your seller plan on ProperHomes at any time based on your needs. Your subscription will be adjusted accordingly.`,
  },
  {
    question: `How do I manage my property listings on ProperHomes?`,
    answer: `You can easily manage your property listings through your seller dashboard. 
    Add, edit, or remove listings as needed, and keep them up to date to attract potential buyers or tenants.`,
  },
  {
    question: `Can I feature or highlight my listings for better visibility on ProperHomes?`,
    answer: `Yes, if you're on the Premium Plan on ProperHomes, you have the option to boost one property in one city every day. This helps improve the visibility of your property and attract more potential buyers or tenants.`,
  },
  {
    question: `Is there a limit to the number of photos and details I can include in my property listings on ProperHomes?`,
    answer: `You can include multiple photos and extensive property details in your listings on ProperHomes to make them more appealing to potential buyers or tenants. There is no strict limit, but we recommend providing comprehensive information to increase your chances of success.`,
  },
  {
    question: `How do I set up my business profile page on ProperHomes, and what should I include on it?`,
    answer: `With the Prime and Premium Plans on ProperHomes, you get a separate business profile page. You can set it up by providing essential details about your business, including your logo, contact information, and a brief description. This enhances your credibility and visibility to potential clients.`,
  },
  {
    question: `Do I need to sign a contract for the Prime or Premium Plan on ProperHomes, and what is the billing cycle?`,
    answer: `The Prime and Premium Plans on ProperHomes are billed on a monthly basis, and there's no long-term contract required. You can cancel or change your plan at any time based on your needs.`,
  },
  {
    question: `What kind of support can I expect with the different seller plans on ProperHomes?`,
    answer: `The Free Plan on ProperHomes includes basic support, while the Prime and Premium Plans come with additional support and priority support, respectively. Our support team on ProperHomes is here to assist you with any questions or issues you may encounter.`,
  },
];

export default function FAQ() {
  return (
    <Stack spacing={4} py={4} sx={{ maxWidth: "1024px" }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="center"
      >
        <Typography
          variant="h1"
          sx={{ fontSize: "2rem !important", fontWeight: 700 }}
        >
          ProperHomes: Frequently Asked Questions
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          py={2}
          spacing={2}
          alignItems="center"
        >
          <Button
            variant="outlined"
            size="large"
            component="a"
            href="#buyersFAQ"
            sx={{ whiteSpace: "nowrap" }}
          >
            View Buyers FAQ
          </Button>
          <Button
            variant="outlined"
            size="large"
            component="a"
            href="#sellersFAQ"
            sx={{ whiteSpace: "nowrap" }}
          >
            View Sellers FAQ
          </Button>
        </Stack>
      </Stack>

      <Stack spacing={2} py={4} id="buyersFAQ">
        <Typography
          variant="h2"
          sx={{ fontSize: "1.4rem !important", textDecoration: "underline" }}
        >
          ProperHomes FAQ for Buyers or Tenants:
        </Typography>
        {buyerFAQ.map(({ question, answer }, index) => {
          return (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontSize: "1.2rem" }}>{question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "1.2rem" }}>{answer}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Stack>

      <Stack spacing={2} py={4} id="sellersFAQ">
        <Typography
          variant="h2"
          sx={{ fontSize: "1.4rem !important", textDecoration: "underline" }}
        >
          ProperHomes FAQ for Sellers or Owners:
        </Typography>
        {sellerFAQ.map(({ question, answer }, index) => {
          return (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontSize: "1.2rem" }}>{question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ fontSize: "1.2rem" }}>{answer}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Stack>
    </Stack>
  );
}
