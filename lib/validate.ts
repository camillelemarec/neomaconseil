import type { Signer } from "@/lib/types";

export type FieldErrors = Partial<Record<keyof Signer, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

export function normalizeSigner(input: Signer): Signer {
  return {
    firstName: cleanLine(input.firstName),
    lastName: cleanLine(input.lastName),
    role: cleanLine(input.role),
    company: cleanLine(input.company),
    siret: input.siret.replace(/\s/g, ""),
    address: cleanLine(input.address),
    postalCode: cleanLine(input.postalCode),
    city: cleanLine(input.city),
    email: cleanLine(input.email),
    phone: cleanLine(input.phone),
    studyType: cleanLine(input.studyType),
    studyRef: cleanLine(input.studyRef),
    amountHt: cleanLine(input.amountHt),
  };
}

function checkLength(
  value: string,
  min: number,
  max: number,
  emptyMessage: string,
  longMessage: string,
): string | undefined {
  if (value.length < min) return emptyMessage;
  if (value.length > max) return longMessage;
  return undefined;
}

export function validateSigner(input: Signer): FieldErrors {
  const errors: FieldErrors = {};

  const lastName = checkLength(input.lastName, 2, 80, "Indiquez votre nom.", "Le nom est trop long.");
  if (lastName) errors.lastName = lastName;

  const firstName = checkLength(
    input.firstName,
    2,
    80,
    "Indiquez votre prénom.",
    "Le prénom est trop long.",
  );
  if (firstName) errors.firstName = firstName;

  const role = checkLength(input.role, 2, 80, "Indiquez votre fonction.", "La fonction est trop longue.");
  if (role) errors.role = role;

  const company = checkLength(
    input.company,
    2,
    120,
    "Indiquez le nom de l'entreprise.",
    "Le nom de l'entreprise est trop long.",
  );
  if (company) errors.company = company;

  if (!/^\d{14}$/.test(input.siret)) {
    errors.siret = "Le SIRET doit comporter 14 chiffres.";
  }

  const address = checkLength(
    input.address,
    5,
    180,
    "Indiquez l'adresse.",
    "L'adresse est trop longue.",
  );
  if (address) errors.address = address;

  if (!/^\d{5}$/.test(input.postalCode)) {
    errors.postalCode = "Indiquez un code postal à 5 chiffres.";
  }

  const city = checkLength(input.city, 2, 80, "Indiquez la ville.", "La ville est trop longue.");
  if (city) errors.city = city;

  if (!input.email) {
    errors.email = "Indiquez votre email.";
  } else if (input.email.length > 120 || !EMAIL.test(input.email)) {
    errors.email = "L'email n'est pas valide.";
  }

  const phoneDigits = input.phone.replace(/\D/g, "");
  if (input.phone.length > 30 || phoneDigits.length < 10) {
    errors.phone = "Indiquez un numéro de téléphone valide.";
  }

  const studyType = checkLength(
    input.studyType,
    2,
    120,
    "Indiquez le type d'étude.",
    "Le type d'étude est trop long.",
  );
  if (studyType) errors.studyType = studyType;

  const studyRef = checkLength(
    input.studyRef,
    2,
    40,
    "Indiquez la référence de l'étude.",
    "La référence est trop longue.",
  );
  if (studyRef) errors.studyRef = studyRef;

  const amountHt = checkLength(
    input.amountHt,
    2,
    180,
    "Indiquez le montant HT, en chiffres et en lettres.",
    "Le montant est trop long.",
  );
  if (amountHt) errors.amountHt = amountHt;

  return errors;
}

export function hasErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
