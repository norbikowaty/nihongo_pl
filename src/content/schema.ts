import { z } from "zod";

export const SegSchema = z.object({ t: z.string().min(1), r: z.string().optional() });

export const JaTextSchema = z.object({ segs: z.array(SegSchema).min(1), romaji: z.string() });

export const WordSchema = z.object({
  id: z.string().min(1),
  ja: JaTextSchema,
  pl: z.string().min(1),
  jmdict: z.string().optional(),
  /** Not on the N5 list: kept only to practise reading new kana, never added to reviews or the N5 dictionary. */
  beyondN5: z.literal(true).optional(),
});

export const ExampleSchema = z.object({ ja: JaTextSchema, pl: z.string().min(1) });

const BuildSchema = z
  .object({
    type: z.literal("build"),
    prompt: z.string(),
    tiles: z.array(z.object({ ja: JaTextSchema })).min(2),
    answer: z.array(z.number().int().nonnegative()).min(1),
  })
  .refine((e) => e.answer.every((i) => i < e.tiles.length), "answer index out of range")
  .refine((e) => new Set(e.answer).size === e.answer.length, "answer repeats a tile");

const ChoiceSchema = z
  .object({
    type: z.literal("choice"),
    prompt: z.string(),
    ja: JaTextSchema.optional(),
    options: z.array(z.string().min(1)).min(2),
    answer: z.number().int().nonnegative(),
    why: z.string(),
  })
  .refine((e) => e.answer < e.options.length, "answer index out of range");

const KanaItemSchema = z.object({ kana: z.string().min(1), romaji: z.string().min(1) });

const KanaQuizSchema = z.object({
  type: z.literal("kana"),
  items: z.array(KanaItemSchema).min(2),
  // Characters from earlier lessons; a few are mixed into the drill.
  review: z.array(KanaItemSchema).optional(),
  choices: z.number().int().min(2).max(6),
});

export const ExerciseSchema = z.union([BuildSchema, ChoiceSchema, KanaQuizSchema]);

export const StepSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("intro"), lead: z.string(), sentence: ExampleSchema, after: z.string() }),
  z.object({ kind: z.literal("newKana"), chars: z.array(z.string().min(1)).min(1) }),
  z.object({
    kind: z.literal("pattern"),
    blocks: z.array(z.object({ pattern: JaTextSchema, meaning: z.string() })).min(1),
    explanation: z.string(),
  }),
  z.object({ kind: z.literal("examples"), items: z.array(ExampleSchema).min(1) }),
  z.object({ kind: z.literal("exercise"), items: z.array(ExerciseSchema).min(1) }),
  z.object({ kind: z.literal("summary"), points: z.array(z.string()).min(1), words: z.array(WordSchema) }),
]);

export const CourseIdSchema = z.enum(["pismo", "gramatyka", "slownictwo", "kanji", "czytanie", "egzamin"]);

export const LessonSchema = z
  .object({
    id: z.string(),
    course: CourseIdSchema,
    section: z.string(),
    slug: z.string(),
    title: z.union([z.string(), JaTextSchema]),
    minutes: z.number().int().positive(),
    kind: z.enum(["lesson", "test"]),
    steps: z.array(StepSchema).min(1),
  })
  .refine((l) => l.id === `${l.course}/${l.slug}`, "id must be course/slug")
  .refine(
    (l) =>
      l.kind === "lesson"
        ? l.steps.length === 5 && l.steps[4].kind === "summary"
        : l.steps.length === 1 && l.steps[0].kind === "exercise",
    "lesson needs 5 steps ending with summary; test needs one exercise step",
  );

export const CourseSchema = z.object({
  id: CourseIdSchema,
  glyph: z.string(),
  title: z.string(),
  meta: z.string(),
  sections: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      items: z.array(z.object({ slug: z.string(), title: z.string(), label: z.string() })),
    }),
  ),
});

export type Seg = z.infer<typeof SegSchema>;
export type JaText = z.infer<typeof JaTextSchema>;
export type Word = z.infer<typeof WordSchema>;
export type Example = z.infer<typeof ExampleSchema>;
export type Exercise = z.infer<typeof ExerciseSchema>;
export type Step = z.infer<typeof StepSchema>;
export type CourseId = z.infer<typeof CourseIdSchema>;
export type Lesson = z.infer<typeof LessonSchema>;
export type Course = z.infer<typeof CourseSchema>;
