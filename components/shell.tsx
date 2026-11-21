export function Shell({
  children,
  brand,
}: {
  children: React.ReactNode;
  brand?: string;
}) {
  return (
    <div className="min-h-full bg-[#f3f0e8] text-stone-900">
      <header className="border-b border-stone-200/80">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-5 py-5">
          <p className="text-sm font-medium tracking-tight">{brand || "Signature"}</p>
          <p className="text-xs text-stone-500">Signature en ligne</p>
        </div>
      </header>
      <main className="mx-auto w-full max-w-2xl px-5 py-8 sm:py-12">{children}</main>
    </div>
  );
}
