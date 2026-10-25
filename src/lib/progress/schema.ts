import { z } from "zod";

const ReadingLevelSchema = z.union([z.literal(0), z.literal(1), z.literal(2)]);

const CardStateSchema = z
  .object({
    due: z.string(),
    stability: z.number(),
    difficulty: z.number(),
    elapsed_days: z.number(),
    scheduled_days: z.number(),
    learning_steps: z.number(),
    reps: z.number(),
    lapses: z.number(),
    state: z.number(),
    last_review: z.string().optional(),
  })
  .loose();

export const ProgressSchema = z.object({
  version: z.literal(1),
  lessons: z.record(
    z.string(),
    z.object({
      status: z.enum(["started", "done"]),
      step: z.number().int(),
      // The furthest step opened so far; older saves only have `step`.
      reached: z.number().int().optional(),
      updatedAt: z.string(),
    }),
  ),
  cards: z.record(z.string(), z.object({ card: CardStateSchema, updatedAt: z.string() })),
  notes: z.record(z.string(), z.object({ text: z.string(), updatedAt: z.string() })),
  settings: z.object({ reading: z.object({ pismo: ReadingLevelSchema, reszta: ReadingLevelSchema }) }),
});

export type ReadingLevel = 0 | 1 | 2;
export type ReadingContext = "pismo" | "reszta";
export type Progress = z.infer<typeof ProgressSchema>;
