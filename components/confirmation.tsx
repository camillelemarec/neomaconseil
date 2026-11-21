type Props = {
  signedAtLabel: string;
  signerName: string;
  company: string;
  emailed: boolean;
  pending: boolean;
  error: string;
  onDownload: () => void;
  onRetry: () => void;
};

export function Confirmation({
  signedAtLabel,
  signerName,
  company,
  emailed,
  pending,
  error,
  onDownload,
  onRetry,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <svg viewBox="0 0 24 24" className="size-10 text-stone-800" aria-hidden="true">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M7 12.5 10.2 16 17 8.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="font-serif text-3xl tracking-tight text-[#0e2e4e]">Convention signée</h1>
        <p className="text-sm leading-6 text-stone-600">
          {signerName}, pour {company}, a signé la convention le {signedAtLabel}.
        </p>
      </div>

      {emailed ? (
        <p className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm leading-6 text-stone-700">
          Une copie PDF a été envoyée à Neoma Conseil. Vous pouvez aussi télécharger la vôtre.
        </p>
      ) : (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
          L&apos;envoi de la copie par email n&apos;a pas abouti. Téléchargez votre exemplaire, puis
          réessayez l&apos;envoi. Votre signature est conservée.
        </p>
      )}

      {error ? (
        <p className="text-sm text-rose-800" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex h-12 items-center justify-center rounded-full bg-stone-900 px-6 text-sm font-medium text-white"
        >
          Télécharger le PDF
        </button>
        {emailed ? null : (
          <button
            type="button"
            onClick={onRetry}
            disabled={pending}
            className="inline-flex h-12 items-center justify-center rounded-full border border-stone-300 bg-white px-6 text-sm font-medium text-stone-800 disabled:opacity-50"
          >
            {pending ? "Envoi en cours..." : "Réessayer l'envoi"}
          </button>
        )}
      </div>
    </div>
  );
}
