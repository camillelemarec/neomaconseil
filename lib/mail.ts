import nodemailer from "nodemailer";
import type { Signer } from "@/lib/types";

export function canSendMail(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

export async function sendSignedContract(input: {
  signer: Signer;
  signedAtLabel: string;
  pdf: Uint8Array;
}): Promise<void> {
  const port = Number(process.env.SMTP_PORT || 587);
  const from =
    process.env.SMTP_FROM?.trim() ||
    process.env.OWNER_EMAIL?.trim() ||
    "tom.poujon-beney@neomaconseil.com";
  const to = process.env.OWNER_EMAIL?.trim() || "tom.poujon-beney@neomaconseil.com";

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("SMTP incomplet");
  }

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const { signer } = input;
  const text = [
    "Bonjour,",
    "",
    "Une convention d'étude vient d'être signée.",
    "",
    `Signataire : ${signer.firstName} ${signer.lastName}, ${signer.role}`,
    `Entreprise : ${signer.company}`,
    `SIRET : ${signer.siret}`,
    `Adresse : ${signer.address}, ${signer.postalCode} ${signer.city}`,
    `Email : ${signer.email}`,
    `Téléphone : ${signer.phone}`,
    `Date : ${input.signedAtLabel}`,
    "",
    "Le PDF est joint à ce message.",
  ].join("\n");

  await transport.sendMail({
    from,
    to,
    replyTo: signer.email,
    subject: `Convention signée - ${signer.company}`,
    text,
    attachments: [
      {
        filename: "convention-signee.pdf",
        content: Buffer.from(input.pdf),
        contentType: "application/pdf",
      },
    ],
  });
}
