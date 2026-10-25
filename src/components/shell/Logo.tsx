import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 whitespace-nowrap text-[19px] font-bold no-underline min-[1000px]:gap-2.5 min-[1000px]:text-[22px]">
      <span lang="ja" className="jp bg-ac px-[7px] py-0.5 text-[15px] tracking-[0.04em] text-aci">
        日本語
      </span>
      Nihongo PL
    </Link>
  );
}
