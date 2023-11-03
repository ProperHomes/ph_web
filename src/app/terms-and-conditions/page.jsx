import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const TermsAndConditions = () => {
  return (
    <Container>
      <Typography variant="h4">ProperHomes Terms and Conditions</Typography>
      <br />
      <Typography variant="h5">1. Acceptance of Terms</Typography>
      <Typography>
        Welcome to ProperHomes, an online platform that connects property
        buyers, tenants, and sellers. By accessing and using ProperHomes, you
        agree to comply with and be bound by these Terms and Conditions.
      </Typography>
      <Typography>
        Please read these Terms carefully. If you do not agree with these terms,
        please do not use ProperHomes.
      </Typography>
      <br />
      <Typography variant="h5">2. User Accounts</Typography>
      <Typography>
        - You must create an account to access certain features of ProperHomes.
        Your account information should be accurate and complete.
      </Typography>
      <Typography>
        - You are responsible for maintaining the confidentiality of your
        account credentials and for any activity that occurs under your account.
      </Typography>
      <br />
      <Typography variant="h5">3. Property Listings</Typography>
      <Typography>
        - Sellers are solely responsible for the accuracy, completeness, and
        legality of their property listings on ProperHomes.
      </Typography>
      <Typography>
        - ProperHomes reserves the right to remove or restrict any listings that
        violate our policies or applicable laws.
      </Typography>
      <br />
      <Typography variant="h5">4. Credits and Payment</Typography>
      <Typography>
        - ProperHomes uses a credit-based system to access property contact
        details. Credits can be purchased for a fee.
      </Typography>
      <Typography>
        - Credit purchases are non-refundable and non-transferable.
      </Typography>
      <Typography>
        - ProperHomes may change credit pricing and policies at any time.
      </Typography>
      <br />
      <Typography variant="h5">5. Privacy</Typography>
      <Typography>
        - Your use of ProperHomes is governed by our Privacy Policy, which can
        be found at <Link href="/privacypolicy">Privacy Policy</Link>.
      </Typography>
      <Typography>
        - You consent to the collection, use, and sharing of your information as
        described in our Privacy Policy.
      </Typography>
      <br />
      <Typography variant="h5">6. Termination</Typography>
      <Typography>
        - ProperHomes may suspend, restrict, or terminate your access to the
        platform for violation of these Terms or for any other reason.
      </Typography>
      <br />
      <Typography variant="h5">7. Limitation of Liability</Typography>
      <Typography>
        - ProperHomes is not responsible for the quality, accuracy, or legality
        of property listings.
      </Typography>
      <Typography>
        - ProperHomes is not liable for any losses, costs, damages, or claims
        arising from your use of the platform.
      </Typography>
      <br />
      <Typography variant="h5">8. Changes to Terms</Typography>
      <Typography>
        - ProperHomes may modify these Terms at any time. We will provide notice
        of any material changes.
      </Typography>
      <Typography>
        - Your continued use of ProperHomes after changes to the Terms
        constitutes your acceptance of the revised Terms.
      </Typography>
      <br />
      <Typography variant="h5">9. Governing Law</Typography>
      <Typography>
        - These Terms are governed by and construed in accordance with the laws
        of India.
      </Typography>
      <Typography>
        - Any disputes are subject to the exclusive jurisdiction of the courts
        in India.
      </Typography>
      <br />
      <Typography variant="h5">10. Contact Information</Typography>
      <Typography>
        If you have any questions or concerns about these Terms and Conditions,
        please contact us at support@properhomes.in.
      </Typography>
      <br />
      <Typography>Thank you for using ProperHomes!</Typography>
      <Typography variant="subtitle1">4/11/2023</Typography>
    </Container>
  );
};

export default TermsAndConditions;
