import type { ContractContent } from "@/lib/types";

export function ContractPreview({ content }: { content: ContractContent }) {
  return (
    <article className="rounded-2xl border border-stone-200 bg-white px-5 py-8 shadow-sm sm:px-10 sm:py-12">
      <h2 className="text-center font-serif text-2xl tracking-tight text-[#0e2e4e] sm:text-3xl">
        {content.title}
      </h2>
      <div className="mx-auto mt-4 h-px w-full bg-stone-200" />
      <div className="mt-6 space-y-4 font-serif text-[15px] leading-7 text-stone-800">
        {content.intro.map((paragraph) => (
          <p key={paragraph} className="whitespace-pre-wrap">
            {paragraph}
          </p>
        ))}
        {content.articles.map((article) => (
          <section key={article.title} className="space-y-1">
            <h3 className="font-sans text-sm font-semibold tracking-tight text-stone-900">
              {article.title}
            </h3>
            <p>{article.body}</p>
          </section>
        ))}
        <p>{content.closing}</p>
        <p className="text-xs leading-5 text-stone-500">{content.legalNotice}</p>
      </div>
    </article>
  );
}
