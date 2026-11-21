import type { ReactNode } from "react";
import type { Signer } from "@/lib/types";
import type { FieldErrors } from "@/lib/validate";

const COMPANY_FIELDS = [
  { name: "company", label: "Entreprise", autoComplete: "organization", type: "text" },
  { name: "siret", label: "SIRET", autoComplete: "off", type: "text" },
  { name: "address", label: "Adresse", autoComplete: "street-address", type: "text" },
  { name: "postalCode", label: "Code postal", autoComplete: "postal-code", type: "text" },
  { name: "city", label: "Ville", autoComplete: "address-level2", type: "text" },
] as const;

const PERSON_FIELDS = [
  { name: "lastName", label: "Nom", autoComplete: "family-name", type: "text" },
  { name: "firstName", label: "Prénom", autoComplete: "given-name", type: "text" },
  { name: "role", label: "Fonction", autoComplete: "organization-title", type: "text" },
  { name: "email", label: "Email", autoComplete: "email", type: "email" },
  { name: "phone", label: "Téléphone", autoComplete: "tel", type: "tel" },
] as const;

type FieldName =
  | (typeof COMPANY_FIELDS)[number]["name"]
  | (typeof PERSON_FIELDS)[number]["name"];

type Props = {
  values: Signer;
  errors: FieldErrors;
  onChange: (name: keyof Signer, value: string) => void;
  onSubmit: () => void;
};

export function SignerForm({ values, errors, onChange, onSubmit }: Props) {
  return (
    <form
      className="space-y-8"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="space-y-1">
        <p className="text-xs font-medium tracking-wide text-[#0e2e4e] uppercase">Étape 1 sur 2</p>
        <h1 className="font-serif text-3xl tracking-tight text-[#0e2e4e]">Vos informations</h1>
        <p className="text-sm leading-6 text-stone-600">
          Elles seront reportées dans la convention d&apos;étude, que vous pourrez relire avant de
          signer.
        </p>
      </div>

      <FieldGroup title="L'entreprise">
        {COMPANY_FIELDS.map((field) => (
          <Field
            key={field.name}
            {...field}
            value={values[field.name]}
            error={errors[field.name]}
            onChange={(value) => onChange(field.name, value)}
          />
        ))}
      </FieldGroup>

      <FieldGroup title="Le représentant">
        {PERSON_FIELDS.map((field) => (
          <Field
            key={field.name}
            {...field}
            value={values[field.name]}
            error={errors[field.name]}
            onChange={(value) => onChange(field.name, value)}
          />
        ))}
      </FieldGroup>

      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#0e2e4e] px-6 text-sm font-medium text-white sm:w-auto"
      >
        Voir la convention
      </button>
    </form>
  );
}

function FieldGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-medium text-stone-800">{title}</h2>
      {children}
    </section>
  );
}

function Field({
  name,
  label,
  autoComplete,
  type,
  value,
  error,
  onChange,
}: {
  name: FieldName;
  label: string;
  autoComplete: string;
  type: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  const hint = name === "siret" ? "14 chiffres, sans espace." : null;

  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium text-stone-800">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={name === "siret" || name === "postalCode" ? "numeric" : name === "phone" ? "tel" : undefined}
        autoCapitalize={name === "email" || name === "siret" ? "none" : undefined}
        spellCheck={name === "email" || name === "siret" ? false : undefined}
        value={value}
        aria-invalid={error ? true : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-xl border border-stone-300 bg-white px-3 text-base text-stone-900 outline-none focus:border-[#0e2e4e]"
      />
      {hint && !error ? <p className="text-xs text-stone-500">{hint}</p> : null}
      {error ? (
        <p className="text-sm text-rose-800" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
