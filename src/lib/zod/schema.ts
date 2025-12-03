import z from "zod/v3";

export const geminiResponseSchema = z.array(
  z.object({
    name: z.string(),
    timestamp: z.string(),
    duration: z.number()
  })
)

export type GeminiResponseType = z.infer<typeof geminiResponseSchema>
