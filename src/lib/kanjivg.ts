/** KanjiVG stores each character as <5-digit lowercase hex code point>.svg. */
export function kanjivgFile(char: string): string {
  return `${char.codePointAt(0)!.toString(16).padStart(5, "0")}.svg`;
}
