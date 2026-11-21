export type Signer = {
  firstName: string;
  lastName: string;
  role: string;
  company: string;
  siret: string;
  address: string;
  postalCode: string;
  city: string;
  email: string;
  phone: string;
};

export type Owner = {
  name: string;
  role: string;
  company: string;
  email: string;
  address: string;
};

export type ContractArticle = {
  title: string;
  body: string;
};

export type ContractContent = {
  title: string;
  intro: string[];
  articles: ContractArticle[];
  closing: string;
  legalNotice: string;
};

export type SignSuccess = {
  ok: true;
  emailed: boolean;
  signedAtLabel: string;
  pdfBase64: string;
};

export type SignFailure = {
  ok: false;
  error: string;
};

export type SignResponse = SignSuccess | SignFailure;
