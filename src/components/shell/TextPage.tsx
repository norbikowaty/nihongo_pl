/** Layout for plain text pages (legal, contact, licences). */
export function TextPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[760px] px-4 pt-12 pb-20 min-[1000px]:px-10">
      <h1 className="mb-6 text-[42px] leading-tight font-bold tracking-[-0.02em]">{title}</h1>
      <div className="flex flex-col gap-4 [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-bold">{children}</div>
    </div>
  );
}
