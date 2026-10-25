// Records every text that has a play button (src/lib/audio-texts.ts) as MP3 in public/audio/, using a
// running VOICEVOX (the desktop app or the engine; https://voicevox.hiroshiba.jp), and lists them in
// src/content/audio.json. Texts already recorded are skipped; recordings no longer used are removed.
// Usage: start VOICEVOX, then  npx tsx scripts/make-audio.ts            (record)
//                              npx tsx scripts/make-audio.ts --list     (only print the texts)
// VOICEVOX_URL  engine address, default http://127.0.0.1:50021
// VOICEVOX_VOICE  "character/style", default "No.7/アナウンス"; credited on /licencje as VOICEVOX:<character>.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { spokenTexts } from "../src/lib/audio-texts";
import { audioKey } from "../src/lib/speech";

const url = process.env.VOICEVOX_URL ?? "http://127.0.0.1:50021";
const [character, style] = (process.env.VOICEVOX_VOICE ?? "No.7/アナウンス").split("/");
const out = join(process.cwd(), "public", "audio");
const manifest = join(process.cwd(), "src", "content", "audio.json");

type Speaker = { name: string; styles: { name: string; id: number }[] };

/** 16-bit PCM samples and sample rate from a WAV file. */
function readWav(buf: Buffer): { samples: Int16Array; rate: number } {
  let rate = 0;
  for (let at = 12; at + 8 <= buf.length; ) {
    const id = buf.toString("ascii", at, at + 4);
    const size = buf.readUInt32LE(at + 4);
    if (id === "fmt ") {
      if (buf.readUInt16LE(at + 10) !== 1 || buf.readUInt16LE(at + 22) !== 16) throw new Error("Expected mono 16-bit WAV");
      rate = buf.readUInt32LE(at + 12);
    }
    if (id === "data") {
      const data = buf.subarray(at + 8, at + 8 + size);
      return { samples: new Int16Array(data.buffer.slice(data.byteOffset, data.byteOffset + data.length)), rate };
    }
    at += 8 + size + (size % 2);
  }
  throw new Error("WAV without data");
}

// Loaded with import(): its CommonJS build exports nothing.
const lame = import("@breezystack/lamejs");

async function toMp3({ samples, rate }: { samples: Int16Array; rate: number }): Promise<Buffer> {
  const enc = new (await lame).Mp3Encoder(1, rate, 48);
  const parts: Uint8Array[] = [];
  for (let i = 0; i < samples.length; i += 1152) parts.push(enc.encodeBuffer(samples.subarray(i, i + 1152)));
  parts.push(enc.flush());
  // The encoder hands back Int8Array chunks, despite its types.
  return Buffer.concat(parts.map((p) => Buffer.from(p.buffer, p.byteOffset, p.byteLength)));
}

async function record(text: string, speaker: number): Promise<Buffer> {
  const q = await fetch(`${url}/audio_query?${new URLSearchParams({ text, speaker: String(speaker) })}`, { method: "POST" });
  if (!q.ok) throw new Error(`audio_query ${q.status}: ${text}`);
  // Slightly slower than normal, mono, with a short pause on both ends.
  const query = { ...(await q.json()), speedScale: 0.9, outputSamplingRate: 24000, outputStereo: false, prePhonemeLength: 0.1, postPhonemeLength: 0.15 };
  const wav = await fetch(`${url}/synthesis?speaker=${speaker}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query),
  });
  if (!wav.ok) throw new Error(`synthesis ${wav.status}: ${text}`);
  return toMp3(readWav(Buffer.from(await wav.arrayBuffer())));
}

async function main() {
  const texts = spokenTexts();
  const keys = new Map<string, string>();
  for (const text of texts) {
    const key = audioKey(text);
    if (keys.has(key)) throw new Error(`Same file name for ${keys.get(key)} and ${text}`);
    keys.set(key, text);
  }
  if (process.argv.includes("--list")) {
    for (const [key, text] of keys) console.log(`${key}  ${text}`);
    console.log(`\n${texts.length} texts`);
    return;
  }

  const speakers: Speaker[] = await (await fetch(`${url}/speakers`).catch(() => {
    throw new Error(`VOICEVOX is not running at ${url}. Start the app (or the engine) and try again.`);
  })).json();
  const speaker = speakers.find((s) => s.name === character)?.styles.find((s) => s.name === style);
  if (!speaker) {
    console.log(speakers.map((s) => `${s.name}: ${s.styles.map((x) => x.name).join(", ")}`).join("\n"));
    throw new Error(`No voice ${character}/${style}; pick one above with VOICEVOX_VOICE="character/style"`);
  }

  mkdirSync(out, { recursive: true });
  // A different voice means recording everything again, so all files sound alike.
  const before = existsSync(manifest) ? JSON.parse(readFileSync(manifest, "utf8")).voice : "";
  if (before && before !== character) for (const f of readdirSync(out)) rmSync(join(out, f));
  let made = 0;
  for (const [key, text] of keys) {
    const file = join(out, `${key}.mp3`);
    if (existsSync(file)) continue;
    writeFileSync(file, await record(text, speaker.id));
    made++;
    console.log(`${key}  ${text}`);
  }
  let removed = 0;
  for (const f of readdirSync(out)) {
    if (f.endsWith(".mp3") && !keys.has(f.slice(0, -4))) {
      rmSync(join(out, f));
      removed++;
    }
  }
  writeFileSync(manifest, `${JSON.stringify({ voice: character, files: [...keys.keys()].sort() }, null, 2)}\n`);
  console.log(`\n${made} recorded, ${removed} removed, ${keys.size} in total (voice VOICEVOX:${character})`);
}

main().catch((e) => {
  console.error(String(e instanceof Error ? e.message : e));
  process.exit(1);
});
