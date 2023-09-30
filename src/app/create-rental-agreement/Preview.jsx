"use client";
import Image from "next/image";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

export default function RentalAgreementPreview({
  owner,
  tenant,
  rentCost,
  witnesses,
  deposit,
}) {
  const theme = useTheme();

  const { suffix, name, phoneNumber, address, state, city, pincode } =
    owner ?? { suffix: "Mr" };

  const {
    suffix: tenantSuffix,
    name: tenantName,
    phoneNumber: tenantPhone,
    address: tenantAddress,
    state: tenantState,
    city: tenantCity,
    pincode: tenantPin,
  } = tenant ?? { suffix: "Mr" };

  const date = new Date().toLocaleString("en-IN", { dateStyle: "full" });
  return (
    <Stack sx={{ justifySelf: "center" }}>
      <Typography fontWeight={600} ml={2} fontSize="1.2rem" gutterBottom>
        Preview
      </Typography>
      <Stack
        px={1}
        spacing={1}
        sx={{
          position: "relative",
          maxWidth: "500px",
          borderRadius: "1rem",
          border: `1px solid ${theme.palette.background.secondary}`,
          maxHeight: { xs: "100%", md: "650px" },
          overflowY: "scroll",
        }}
      >
        <Box sx={{ width: "100%", position: "sticky", top: 0 }}>
          <Image
            src="/assets/images/stamp-paper-header.png"
            width={550}
            height={200}
            alt="stamp paper header example image"
            style={{
              borderRadius: "16px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Box>
        <Box px={2}>
          <Typography variant="body2" gutterBottom py={1}>
            This agreement made on this <b>{date}</b> between{" "}
            <b>
              {suffix ?? "Mr."} {name ?? "___________"}
            </b>{" "}
            with <b>{phoneNumber ?? "___________"}</b> as Mobile Number,
            residing at <b>{address ?? "___________"}</b>, hereinafter referred
            to as the 'LESSOR' of the One Part AND ,
            <b>
              {tenantSuffix ?? "Mr."} {tenantName ?? "___________"}
            </b>{" "}
            with <b>{tenantPhone ?? "___________"}</b> as Mobile Number,
            residing at <b>{tenantAddress ?? "___________"}</b>, hereinafter
            referred to as the 'LESSEE(s)' of the other Part;
          </Typography>
          <Typography variant="body2" gutterBottom py={1}>
            WHEREAS the Lessor is the lawful owner of, and otherwise well
            sufficiently entitled to, ,and comprising of present in Floor ,
            without Parking hereinafter referred to as the 'said premises'.
            <br />
            AND WHEREAS at the request of the Lessee, the Lessor has agreed to
            let the said premises to the tenant for a term of Months commencing
            from 2023-09-01 in the manner hereinafter appearing.
          </Typography>
          <Typography variant="body2" gutterBottom py={1}>
            NOW THIS AGREEMENT WITNESSETH AND IT IS HEREBY AGREED BY AND BETWEEN
            THE PARTIES AS UNDER:
          </Typography>
          <Typography variant="body2" gutterBottom py={1}>
            That the Lessor hereby grant to the Lessee, the right to enter and
            use and remain in the said premises along with the existing fixtures
            and fittings listed in Annexure 1 to this Agreement and that the
            Lessee shall be entitled to peacefully possess and enjoy possession
            of the said premises for use, and the other rights herein.
          </Typography>
          <Typography variant="body2" gutterBottom py={1}>
            That the lease hereby granted shall, unless cancelled earlier under
            any provision of this Agreement, remain in force for a period of
            Months. That the Lessee will have the option to terminate this lease
            by giving in writing to the Lessor.
          </Typography>
          <Typography variant="body2" gutterBottom py={1}>
            That the Lessee shall have no right to create any sub-lease or
            assign or transfer in any manner the lease or give to any one the
            possession of the said premises or any part thereof.
          </Typography>
          <Typography variant="body2" gutterBottom py={1}>
            That the Lessee shall use the said premises only for residential
            purposes.
          </Typography>
          <Typography variant="body2" gutterBottom py={1}>
            That the Lessor shall, before handing over the said premises, ensure
            the working of sanitary, electrical and water supply connections and
            other fittings pertaining to the said premises. It is agreed that it
            shall be the responsibility of the Lessor for their return in the
            working condition at the time of re-possession of the said premises,
            subject to normal wear and tear.
          </Typography>
          <Typography variant="body2" gutterBottom py={1}>
            That the Lessee is not authorized to make any alteration in the
            construction of the said premises.
          </Typography>
          <Typography variant="body2" gutterBottom py={1}>
            That the day-to-day repair jobs shall be affected by the Lessee at
            his own cost, and any major repairs, either structural or to the
            electrical or water connection, plumbing leaks, water seepage shall
            be attended to by the Lessor. In the event of the Lessor failing to
            carry out the repairs on receiving notice from the Lessee, the
            Lessee shall undertake the necessary repairs and the Lessor will be
            liable to immediately reimburse costs incurred by the Lessee.
          </Typography>
          <Typography variant="body2" gutterBottom py={1}>
            That the Lessor or its duly authorized agent shall have the right to
            enter or upon the said premises or any part thereof at a mutually
            arranged convenient time for the purpose of inspection.
          </Typography>
          <Typography variant="body2" gutterBottom py={1}>
            That in consideration of use of the said premises the Lessee agrees
            that he shall pay to the Lessor during the period of this agreement,
            a monthly rent at the rate of ₹ <b>{rentCost ?? "___________"}</b>.
            The amount will be paid in advance on or before the date of of every
            English calendar month.
          </Typography>
          <Typography variant="body2" gutterBottom py={1}>
            It is hereby agreed that in the event of default in payment of the
            rent for a consecutive period of three months the lessor shall be
            entitled to terminate the lease.
          </Typography>
          <Typography variant="body2" gutterBottom py={1}>
            That the Lessee has paid to the Lessor a sum of ₹{" "}
            <b>{deposit ?? "__________"}</b> as deposit, free of interest. The
            said deposit shall be returned to the Lessee simultaneously with the
            Lessee vacating the said premises. In the event of failure on the
            part of the Lessor to refund the said deposit amount to the Lessee
            as aforesaid, the Lessee shall be entitled to continue to use and
            occupy the said premises without payment of any rent until the
            Lessor refunds the said amount.
          </Typography>
          <Typography variant="body2" gutterBottom py={2}>
            That the Lessor shall be responsible for the payment of all taxes
            and levies pertaining to the said premises including but not limited
            to House Tax, Property Tax, other cesses, if any, and any other
            statutory taxes, levied by the Government or Governmental
            Departments. During the term of this Agreement, the Lessor shall
            comply with all rules, regulations and requirements of any statutory
            authority, local, state, and central government, and governmental
            departments in relation to the said premises.
          </Typography>
          <Typography variant="body2" gutterBottom>
            IN WITNESS WHEREOF, the parties hereto have set their hands on the
            day and year first hereinabove mentioned.
          </Typography>
          <Stack
            py={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2" gutterBottom>
              Agreed & Accepted by the Lessor
              <br />
              <b>{name ?? "______________"}</b>
            </Typography>
            <Typography variant="body2" gutterBottom>
              Agreed & Accepted by the Lessee
              <br />
              <b>{tenantName ?? "______________"}</b>
            </Typography>
          </Stack>

          <Stack py={1}>
            <Typography>WITNESS</Typography>

            {(witnesses ?? [null, null]).map((name, i) => {
              return (
                <Typography key={i}>
                  {i + 1}. {name ?? "_______________"}
                </Typography>
              );
            })}
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}
