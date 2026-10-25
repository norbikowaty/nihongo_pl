export type HeaderState = { lastY: number; acc: number; hidden: boolean };

export const SHOW_ZONE = 80;
export const HIDE_AFTER = 140;
export const SHOW_AFTER = 70;

export const initialHeader: HeaderState = { lastY: 0, acc: 0, hidden: false };

/** Hides the header after a stretch of scrolling down and brings it back after a shorter stretch up. */
export function nextHeader(s: HeaderState, y: number): HeaderState {
  if (y < SHOW_ZONE) return { lastY: y, acc: 0, hidden: false };
  const d = y - s.lastY;
  const acc = d > 0 === s.acc > 0 ? s.acc + d : d;
  let hidden = s.hidden;
  if (acc > HIDE_AFTER) hidden = true;
  if (acc < -SHOW_AFTER) hidden = false;
  return { lastY: y, acc, hidden };
}
