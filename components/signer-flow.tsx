"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Confirmation } from "@/components/confirmation";
import { ContractPreview } from "@/components/contract-preview";
import { Shell } from "@/components/shell";
import { SignatureCanvas, type SignaturePadHandle } from "@/components/signature-canvas";
import { SignerForm } from "@/components/signer-form";
import { renderContract } from "@/lib/contract";
import type { Owner, SignResponse, Signer } from "@/lib/types";
import { hasErrors, normalizeSigner, validateSigner, type FieldErrors } from "@/lib/validate";

type Step = "details" | "contract" | "done";

const EMPTY_SIGNER: Signer = {
  firstName: "",
  lastName: "",
  role: "",
  company: "",
  siret: "",
  address: "",
  postalCode: "",
  city: "",
  email: "",
  phone: "",
};

async function postSignature(body: {
  signer: Signer;
  signaturePng: string;
  accepted: boolean;
}): Promise<SignResponse> {
  const response = await fetch("/api/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data: unknown = await response.json().catch(() => null);
  if (!data || typeof data !== "object" || !("ok" in data)) {
    return { ok: false, error: "Le serveur n'a pas répondu. Réessayez." };
  }
  return data as SignResponse;
}

function downloadPdf(pdfBase64: string) {
  const bytes = Uint8Array.from(atob(pdfBase64), (char) => char.charCodeAt(0));
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "convention-signee.pdf";
  link.click();
  URL.revokeObjectURL(url);
}

export function SignerFlow({ owner }: { owner: Owner }) {
  const [step, setStep] = useState<Step>("details");
  const [contractReady, setContractReady] = useState(false);
  const [signer, setSigner] = useState<Signer>(EMPTY_SIGNER);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [accepted, setAccepted] = useState(false);
  const [signatureEmpty, setSignatureEmpty] = useState(true);
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [signedAtLabel, setSignedAtLabel] = useState("");
  const [pdfBase64, setPdfBase64] = useState("");
  const [emailed, setEmailed] = useState(false);
  const signatureRef = useRef<SignaturePadHandle>(null);
  const savedSignature = useRef("");

  const normalized = useMemo(() => normalizeSigner(signer), [signer]);
  const contract = useMemo(
    () => renderContract(normalized, owner),
    [normalized, owner],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  function updateField(name: keyof Signer, value: string) {
    setSigner((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function continueToContract() {
    const next = normalizeSigner(signer);
    const nextErrors = validateSigner(next);
    setSigner(next);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) {
      const first = Object.keys(nextErrors)[0];
      if (first) document.getElementById(first)?.focus();
      return;
    }
    setFormError("");
    setContractReady(true);
    setStep("contract");
  }

  async function submitSignature(signaturePng: string) {
    setPending(true);
    setFormError("");
    try {
      const result = await postSignature({
        signer: normalized,
        signaturePng,
        accepted: true,
      });
      if (!result.ok) {
        setFormError(result.error);
        return;
      }
      savedSignature.current = signaturePng;
      setSignedAtLabel(result.signedAtLabel);
      setPdfBase64(result.pdfBase64);
      setEmailed(result.emailed);
      setStep("done");
    } catch {
      setFormError("La connexion a échoué. Votre signature est toujours à l'écran : réessayez.");
    } finally {
      setPending(false);
    }
  }

  async function sign() {
    const pad = signatureRef.current;
    if (!accepted) {
      setFormError("Cochez la case pour accepter la convention.");
      return;
    }
    if (!pad || pad.isEmpty()) {
      setFormError("Signez dans l'encart avant de valider.");
      return;
    }
    await submitSignature(pad.toDataURL());
  }

  async function retry() {
    if (!savedSignature.current) return;
    setPending(true);
    setFormError("");
    try {
      const result = await postSignature({
        signer: normalized,
        signaturePng: savedSignature.current,
        accepted: true,
      });
      if (!result.ok) {
        setFormError(result.error);
        return;
      }
      setSignedAtLabel(result.signedAtLabel);
      setPdfBase64(result.pdfBase64);
      setEmailed(result.emailed);
      if (!result.emailed) {
        setFormError("L'envoi n'a pas abouti. Vous pouvez réessayer.");
      }
    } catch {
      setFormError("La connexion a échoué. Réessayez.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Shell brand={owner.company}>
      {step === "details" ? (
        <SignerForm
          values={signer}
          errors={errors}
          onChange={updateField}
          onSubmit={continueToContract}
        />
      ) : null}

      {contractReady ? (
        <div className={step === "contract" ? "space-y-6" : "hidden"}>
          <div className="space-y-1">
            <p className="text-xs font-medium tracking-wide text-[#0e2e4e] uppercase">
              Étape 2 sur 2
            </p>
            <h1 className="font-serif text-3xl tracking-tight text-[#0e2e4e]">Votre convention</h1>
            <p className="text-sm leading-6 text-stone-600">
              Relisez le texte, puis signez dans l&apos;encart. La date sera ajoutée au moment de
              la validation.
            </p>
          </div>

          <ContractPreview content={contract} />

          <div className="space-y-3">
            <div className="flex items-end justify-between gap-3">
              <p className="text-sm font-medium text-stone-800">Signature</p>
              <button
                type="button"
                onClick={() => signatureRef.current?.clear()}
                className="text-sm font-medium text-stone-600 underline-offset-4 hover:underline"
              >
                Effacer
              </button>
            </div>
            <SignatureCanvas ref={signatureRef} onChange={setSignatureEmpty} />
            <p className="text-sm text-stone-500">
              {signatureEmpty
                ? "Signez avec la souris ou le doigt."
                : "Signature enregistrée. Vous pouvez encore l'effacer."}
            </p>
          </div>

          <label className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm leading-6 text-stone-800">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
              className="mt-1 size-5 accent-stone-900"
            />
            <span>Je reconnais avoir lu l&apos;intégralité de la convention et j&apos;accepte de la signer.</span>
          </label>

          {formError ? (
            <p className="text-sm text-rose-800" role="alert">
              {formError}
            </p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={sign}
              disabled={pending}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#0e2e4e] px-6 text-sm font-medium text-white disabled:opacity-50"
            >
              {pending ? "Signature en cours..." : "Valider et signer la convention"}
            </button>
            <button
              type="button"
              onClick={() => setStep("details")}
              disabled={pending}
              className="inline-flex h-12 items-center justify-center rounded-full border border-stone-300 bg-white px-6 text-sm font-medium text-stone-800 disabled:opacity-50"
            >
              Modifier mes informations
            </button>
          </div>
        </div>
      ) : null}

      {step === "done" ? (
        <Confirmation
          signedAtLabel={signedAtLabel}
          signerName={`${normalized.firstName} ${normalized.lastName}`}
          company={normalized.company}
          emailed={emailed}
          pending={pending}
          error={formError}
          onDownload={() => downloadPdf(pdfBase64)}
          onRetry={retry}
        />
      ) : null}
    </Shell>
  );
}
