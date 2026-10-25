export const btn =
  "inline-flex min-h-12 cursor-pointer items-center justify-center px-6 text-[17px] font-semibold transition-transform hover:-translate-y-px motion-reduce:transition-none";
export const btnPrimary = `${btn} bg-ac text-aci`;
export const btnSecondary = `${btn} bg-as text-ink`;
export const btnDark = `${btn} bg-ink text-bg`;

export const jaText = (segs: { t: string }[]) => segs.map((s) => s.t).join("");
