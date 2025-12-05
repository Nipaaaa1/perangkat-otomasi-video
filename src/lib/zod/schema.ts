import z from "zod/v3";

export const geminiResponseSchema = z.array(
  z.object({
    name: z.string().describe("Name of the clip"),
    timestamp: z.string().describe("Timestaamp when the clip start in HH:MM:SS format"),
    duration: z.number().describe("Duration of the clip")
  })
)

export type GeminiResponseType = z.infer<typeof geminiResponseSchema>
