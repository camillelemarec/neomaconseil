import { NextResponse } from "next/server";
import { renderContract } from "@/lib/contract";
import { formatSignedAt } from "@/lib/format";
import { canSendMail, sendSignedContract } from "@/lib/mail";
import { getOwner } from "@/lib/owner";
import { buildContractPdf } from "@/lib/pdf";
import { decodeSignaturePng } from "@/lib/signature";
import type { SignFailure, Signer } from "@/lib/types";
import { hasErrors, normalizeSigner, validateSigner } from "@/lib/validate";

const noStore = { "Cache-Control": "no-store" };

function fail(status: number, error: string) {
  const body: SignFailure = { ok: false, error };
  return NextResponse.json(body, { status, headers: noStore });
}

function isSigner(value: unknown): value is Signer {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.firstName === "string" &&
    typeof candidate.lastName === "string" &&
    typeof candidate.role === "string" &&
    typeof candidate.company === "string" &&
    typeof candidate.siret === "string" &&
    typeof candidate.address === "string" &&
    typeof candidate.postalCode === "string" &&
    typeof candidate.city === "string" &&
    typeof candidate.email === "string" &&
    typeof candidate.phone === "string" &&
    typeof candidate.studyType === "string" &&
    typeof candidate.studyRef === "string" &&
    typeof candidate.amountHt === "string"
  );
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return fail(400, "La demande est illisible.");
  }

  if (!payload || typeof payload !== "object") {
    return fail(400, "La demande est incomplète.");
  }

  const body = payload as Record<string, unknown>;
  if (body.accepted !== true) {
    return fail(400, "Cochez la case pour accepter la convention.");
  }
  if (!isSigner(body.signer)) {
    return fail(400, "Les informations du signataire sont incomplètes.");
  }

  const signer = normalizeSigner(body.signer);
  if (hasErrors(validateSigner(signer))) {
    return fail(400, "Certaines informations sont incomplètes ou invalides.");
  }

  let signaturePng: Uint8Array;
  try {
    signaturePng = decodeSignaturePng(
      typeof body.signaturePng === "string" ? body.signaturePng : "",
    );
  } catch (error) {
    const reason = error instanceof Error ? error.message : "";
    if (reason === "size") {
      return fail(400, "La signature est trop volumineuse. Effacez-la et recommencez.");
    }
    return fail(400, "La signature est manquante ou illisible.");
  }

  const signedAt = new Date();
  const signedAtLabel = formatSignedAt(signedAt);
  const owner = getOwner();
  const content = renderContract(signer, owner);

  let pdf: Uint8Array;
  try {
    pdf = await buildContractPdf({
      content,
      signaturePng,
      signedAt,
      signedAtLabel,
    });
  } catch (error) {
    console.error("Génération PDF impossible", error);
    return fail(500, "Le PDF n'a pas pu être généré. Réessayez dans un instant.");
  }

  let emailed = false;
  if (canSendMail()) {
    try {
      await sendSignedContract({ signer, signedAtLabel, pdf });
      emailed = true;
    } catch (error) {
      console.error("Envoi SMTP impossible", error);
    }
  } else {
    console.error("Envoi SMTP non configuré");
  }

  return NextResponse.json(
    {
      ok: true,
      emailed,
      signedAtLabel,
      pdfBase64: Buffer.from(pdf).toString("base64"),
    },
    { headers: noStore },
  );
}
